export function wasteSubmitterConfirmation(submissionId: string) {
  return {
    subject: 'EterSolis waste opportunity submission received',
    text: `Thank you for submitting a waste opportunity to EterSolis.\n\nEterSolis will review the information provided and may contact you for clarification. This submission is non-binding and does not constitute acceptance, purchase approval, transport approval, technical advice or a disposal instruction. Please do not send physical samples or materials unless EterSolis provides written intake instructions.\n\nReference: ${submissionId}\n\nEterSolis\nWaste & Carbon Management\nwaste@etersolis.com | etersolis.com`
  };
}

export function generalSubmitterConfirmation(submissionId: string) {
  return {
    subject: 'EterSolis inquiry received',
    text: `Thank you for contacting EterSolis.\n\nYour inquiry has been received for review and routing. EterSolis may contact you for clarification. This submission is non-binding and does not create any commercial, legal, technical, transport, disposal or carbon-credit commitment.\n\nReference: ${submissionId}\n\nEterSolis\nWaste & Carbon Management\netersolis.com`
  };
}

export function internalNotification(input: { submissionId: string; subjectPrefix: string; leadType: string; summary: string }) {
  return {
    subject: `${input.subjectPrefix} ${input.submissionId}`,
    text: `New EterSolis ${input.leadType} submission received.\n\nReference: ${input.submissionId}\n\n${input.summary}\n\nReview in the approved EterSolis lead system. Do not request physical samples unless written intake instructions have been approved.`
  };
}

export function serviceRequestSubmitterConfirmation(input: { publicReference: string; statusUrl: string; commercialPathway: string; riskLevel: string }) {
  return {
    subject: `EterSolis service request received: ${input.publicReference}`,
    text: `Thank you for starting an EterSolis service request.\n\nReference: ${input.publicReference}\nStatus link: ${input.statusUrl}\nCommercial pathway: ${input.commercialPathway}\nRisk level: ${input.riskLevel}\n\nThis submission is non-binding. EterSolis must confirm acceptance, payment instructions, pickup, delivery, receiving, processing, certificate eligibility or purchase eligibility in writing before you send or deliver material. Most EterSolis pathways are customer-paid professional services. Selected materials may qualify for purchase, credit, rebate or partnership review only after controlled review.\n\nEterSolis\nControlled waste, recovery and carbon management services\nservice@etersolis.com | etersolis.com`
  };
}

export function internalServiceRequestNotification(input: { publicReference: string; subjectPrefix: string; summary: string; statusUrl: string }) {
  return {
    subject: `${input.subjectPrefix} ${input.publicReference}`,
    text: `New EterSolis service request received.\n\nReference: ${input.publicReference}\nStatus: ${input.statusUrl}\n\n${input.summary}\n\nReview in the approved EterSolis operating system. Do not approve pickup, delivery, payment collection, receiving, certificate issuance or purchase eligibility without controlled review.`
  };
}
