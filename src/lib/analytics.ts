export function trackServerEvent(eventName: string, properties: Record<string, unknown> = {}) {
  // TODO: Connect server-side analytics after privacy review.
  return { eventName, properties, recorded: false };
}
