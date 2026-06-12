export async function trackServerEvent(eventName: string, properties: Record<string, unknown> = {}) {
  const endpoint = process.env.ANALYTICS_WEBHOOK_URL;

  if (!endpoint) {
    return { eventName, properties, recorded: false, reason: 'ANALYTICS_WEBHOOK_URL not configured' };
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(process.env.ANALYTICS_WEBHOOK_SECRET ? { authorization: `Bearer ${process.env.ANALYTICS_WEBHOOK_SECRET}` } : {})
    },
    body: JSON.stringify({
      source: 'etersolis.com',
      eventName,
      properties,
      recordedAt: new Date().toISOString()
    })
  });

  return { eventName, properties, recorded: response.ok, status: response.status };
}
