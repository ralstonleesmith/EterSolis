export async function sendLeadNotifications(input: {
  submissionId: string;
  route: string;
  subjectPrefix: string;
  submitterEmail: string;
}) {
  // TODO: Integrate Resend or approved transactional email provider.
  // Required behavior: internal notification plus non-promissory submitter confirmation.
  return {
    accepted: true,
    submissionId: input.submissionId,
    route: input.route,
    subjectPrefix: input.subjectPrefix
  };
}
