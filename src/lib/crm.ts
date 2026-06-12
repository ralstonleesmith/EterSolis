export async function createCrmLead(payload: Record<string, unknown>) {
  // TODO: Integrate HubSpot or Zoho when credentials and pipelines are approved.
  // If CRM setup is delayed, database plus email notification is the immediate fallback.
  return {
    queued: true,
    leadType: payload.leadType ?? 'lead'
  };
}
