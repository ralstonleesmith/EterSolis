import { NextResponse } from 'next/server';
import { getPool } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(_request: Request, { params }: { params: Promise<{ token: string }> }) {
  const resolvedParams = await params;
  const result = await getPool().query(
    `select certificate_number, certificate_type, verification_hash, status, issued_at, created_at
       from certificates
      where public_token = $1 or certificate_number = $1
      limit 1`,
    [resolvedParams.token]
  );
  const certificate = result.rows[0] ?? null;

  await getPool().query(
    `insert into certificate_verifications (certificate_id, public_token, result, metadata)
     values (null, $1, $2, '{}'::jsonb)`,
    [resolvedParams.token, certificate ? 'valid' : 'invalid']
  ).catch(() => undefined);

  if (!certificate) return NextResponse.json({ ok: false, valid: false, error: 'Certificate not found.' }, { status: 404 });
  return NextResponse.json({ ok: true, valid: certificate.status === 'issued', certificate });
}
