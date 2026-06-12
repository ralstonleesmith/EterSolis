export async function createCrmLead(payload: Record<string, unknown>) {
  const endpoint = process.env.CRM_WEBHOOK_URL;

  if (!endpoint) {
    return {
      queued: false,
      skipped: true,
      reason: 'CRM_WEBHOOK_URL not configured',
      leadType: payload.leadType ?? 'lead'
    };
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(process.env.CRM_WEBHOOK_SECRET ? { authorization: `Bearer ${process.env.CRM_WEBHOOK_SECRET}` } : {})
    },
    body: JSON.stringify({
      source: 'etersolis.com',
      receivedAt: new Date().toISOString(),
      ...payload
    })
  });

  if (!response.ok) {
    throw new Error(`CRM webhook failed with status ${response.status}`);
  }

  return {
    queued: true,
    leadType: payload.leadType ?? 'lead'
  };
}
