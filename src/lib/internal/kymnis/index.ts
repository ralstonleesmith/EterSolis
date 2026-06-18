export const KYMNIS_INTERNAL_ARCHITECTURE_PUBLIC = false;

export type KymnisInternalVisibility = 'internal-kymnis-functionality';

export type KymnisInternalEventType =
  | 'observe'
  | 'register'
  | 'verify'
  | 'classify'
  | 'route'
  | 'resolve'
  | 'recover'
  | 'measure'
  | 'improve'
  | 'archive';

export type KymnisInternalRecord = {
  recordId: string;
  eventType: KymnisInternalEventType;
  measuredAt: string;
  sourceSystem: string;
  confidence: 'submitted' | 'reviewed' | 'verified';
  notes?: string;
};

export function assertKymnisInternalUse(surface: 'internal' | 'public') {
  if (surface === 'public') {
    throw new Error('KYMNIS internal functionality cannot be exposed through public surfaces.');
  }
}

export function createKymnisInternalRecord(record: KymnisInternalRecord) {
  assertKymnisInternalUse('internal');
  return {
    ...record,
    visibility: 'internal-kymnis-functionality' satisfies KymnisInternalVisibility
  };
}

