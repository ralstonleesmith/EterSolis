type LogLevel = 'info' | 'warn' | 'error';

export type ApiLogEvent = {
  requestId: string;
  route: string;
  method: string;
  status?: number;
  durationMs?: number;
  ipHash?: string;
  userAgentHash?: string;
  submissionId?: string;
  serviceRequestId?: string;
  opportunityId?: string;
  userId?: string;
  errorCode?: string;
  message?: string;
};

export function logApiEvent(level: LogLevel, event: ApiLogEvent) {
  const payload = {
    timestamp: new Date().toISOString(),
    level,
    service: 'etersolis-web',
    ...event
  };

  const line = JSON.stringify(payload);
  if (level === 'error') console.error(line);
  else if (level === 'warn') console.warn(line);
  else console.log(line);
}
