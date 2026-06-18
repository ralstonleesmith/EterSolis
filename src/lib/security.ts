import { createHmac } from 'node:crypto';

const memoryBuckets = new Map<string, { count: number; resetAt: number }>();

export function getClientIp(request: Request) {
  return (
    request.headers.get('cf-connecting-ip') ??
    request.headers.get('x-real-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown'
  );
}

export async function verifyBotProtection(token?: string, ip?: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      return { ok: false, mode: 'missing-turnstile-secret' as const };
    }
    return { ok: true, mode: 'development-no-turnstile' as const };
  }

  if (!token) return { ok: false, mode: 'missing-token' as const };

  const body = new URLSearchParams();
  body.append('secret', secret);
  body.append('response', token);
  if (ip && ip !== 'unknown') body.append('remoteip', ip);

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body
  });

  if (!response.ok) return { ok: false, mode: 'turnstile-http-error' as const };
  const result = (await response.json()) as { success?: boolean };
  return { ok: Boolean(result.success), mode: 'turnstile' as const };
}

export async function enforceRateLimit(ip: string, limit = Number(process.env.RATE_LIMIT_MAX ?? 20), windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS ?? 60_000)) {
  const now = Date.now();
  const key = ip || 'unknown';
  const current = memoryBuckets.get(key);

  if (!current || current.resetAt <= now) {
    memoryBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, resetAt: now + windowMs };
  }

  if (current.count >= limit) {
    return { ok: false, remaining: 0, resetAt: current.resetAt };
  }

  current.count += 1;
  return { ok: true, remaining: Math.max(0, limit - current.count), resetAt: current.resetAt };
}

export function hashClientIp(ip: string) {
  if (!ip || ip === 'unknown') return 'unknown';
  const secret = process.env.IP_HASH_SECRET;
  if (!secret) return 'unconfigured';
  return createHmac('sha256', secret).update(ip).digest('hex');
}
