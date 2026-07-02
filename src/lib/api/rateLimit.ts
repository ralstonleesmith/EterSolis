import { getPool } from '@/lib/db';

const memoryBuckets = new Map<string, { count: number; resetAt: number }>();

export type RateLimitPolicy = {
  routeKey: string;
  limit: number;
  windowMs: number;
};

export const rateLimitPolicies = {
  publicLead: { routeKey: 'public.lead', limit: 5, windowMs: 10 * 60_000 },
  publicWaste: { routeKey: 'public.waste', limit: 5, windowMs: 10 * 60_000 },
  publicService: { routeKey: 'public.service', limit: 5, windowMs: 10 * 60_000 },
  heliosEvents: { routeKey: 'public.helios', limit: 60, windowMs: 60_000 },
  admin: { routeKey: 'admin', limit: 120, windowMs: 60_000 }
} satisfies Record<string, RateLimitPolicy>;

function memoryRateLimit(key: string, policy: RateLimitPolicy) {
  const now = Date.now();
  const current = memoryBuckets.get(key);

  if (!current || current.resetAt <= now) {
    memoryBuckets.set(key, { count: 1, resetAt: now + policy.windowMs });
    return { ok: true, remaining: policy.limit - 1, resetAt: now + policy.windowMs, mode: 'memory' as const };
  }

  if (current.count >= policy.limit) {
    return { ok: false, remaining: 0, resetAt: current.resetAt, mode: 'memory' as const };
  }

  current.count += 1;
  return { ok: true, remaining: Math.max(0, policy.limit - current.count), resetAt: current.resetAt, mode: 'memory' as const };
}

export async function enforceOperationalRateLimit(identifier: string, policy: RateLimitPolicy) {
  const bucketStart = new Date(Math.floor(Date.now() / policy.windowMs) * policy.windowMs);
  const key = `${policy.routeKey}:${identifier || 'unknown'}:${bucketStart.toISOString()}`;

  if (!process.env.DATABASE_URL || process.env.NODE_ENV !== 'production') {
    return memoryRateLimit(key, policy);
  }

  const result = await getPool().query(
    `insert into rate_limit_counters (bucket_key, route_key, subject_hash, window_start, window_ms, count, updated_at)
     values ($1,$2,$3,$4,$5,1,now())
     on conflict (bucket_key)
     do update set count = rate_limit_counters.count + 1, updated_at = now()
     returning count`,
    [key, policy.routeKey, identifier || 'unknown', bucketStart.toISOString(), policy.windowMs]
  );
  const count = Number(result.rows[0]?.count ?? 1);
  return {
    ok: count <= policy.limit,
    remaining: Math.max(0, policy.limit - count),
    resetAt: bucketStart.getTime() + policy.windowMs,
    mode: 'postgres' as const
  };
}
