export function TurnstileWidget() {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (!siteKey) {
    return (
      <div className="rounded-2xl border border-coal/20 bg-cool p-4 text-sm font-semibold text-carbon">
        Bot protection is pending server configuration. Public submissions must remain disabled until Turnstile is configured.
      </div>
    );
  }

  return <div className="cf-turnstile" data-sitekey={siteKey} />;
}
