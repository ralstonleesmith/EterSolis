export function getClientIp(request: Request) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
}

export async function verifyBotProtection() {
  // TODO: Verify Cloudflare Turnstile or reCAPTCHA token before public launch.
  return { ok: true, mode: 'development-placeholder' as const };
}

export async function enforceRateLimit() {
  // TODO: Implement IP/session-based rate limiting before production.
  return { ok: true, mode: 'development-placeholder' as const };
}
