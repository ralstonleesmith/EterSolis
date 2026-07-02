import { createHash } from 'node:crypto';

export const certificateTypes = ['repurpose', 'destruction'] as const;

export function createCertificateVerificationHash(input: string) {
  return createHash('sha256').update(input).digest('hex');
}

export function canIssueCertificate(input: {
  serviceRequestExists: boolean;
  receivingRecordExists: boolean;
  dispositionRecordExists: boolean;
  adminApproved: boolean;
}) {
  return input.serviceRequestExists && input.receivingRecordExists && input.dispositionRecordExists && input.adminApproved;
}
