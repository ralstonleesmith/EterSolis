import { NextResponse } from 'next/server';
import { createRequestId } from '@/lib/api/request';

export type ApiErrorCode =
  | 'BAD_REQUEST'
  | 'VALIDATION_FAILED'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'RATE_LIMITED'
  | 'NOT_FOUND'
  | 'UNSUPPORTED_MEDIA_TYPE'
  | 'INTERNAL_ERROR';

export type ApiEnvelope<Data> = {
  ok: boolean;
  requestId: string;
  data: Data | null;
  error: { code: ApiErrorCode; message: string } | null;
};

export function apiOk<Data>(data: Data, requestId = createRequestId(), init?: ResponseInit) {
  return NextResponse.json<ApiEnvelope<Data>>({
    ok: true,
    requestId,
    data,
    error: null
  }, {
    ...init,
    headers: {
      'x-request-id': requestId,
      ...(init?.headers ?? {})
    }
  });
}

export function apiError(code: ApiErrorCode, message: string, status: number, requestId = createRequestId()) {
  return NextResponse.json<ApiEnvelope<never>>({
    ok: false,
    requestId,
    data: null,
    error: { code, message }
  }, {
    status,
    headers: {
      'x-request-id': requestId
    }
  });
}
