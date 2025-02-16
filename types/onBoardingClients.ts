export interface OnBoardingClientType {
  address: string | null;
  amountPaid?: number | null;
  businessCategory: string | null;
  certificatePassword?: string | null;
  companyName: string;
  efdmsStatus: string;
  emailUsedForComms: string | null;
  emailUsedForLogin: string | null;
  fullName: string;
  loginCredentials: string;
  onBoardingClientID?: string;
  onboardingStatus: string;
  proofOfPaymentText: string | null;
  paymentStatus: string;
  phoneNumber: string | null;
  platform?: string | null;
  serialNumber: string | null;
  service: string;
  stage: string;
  region?: string | null;
  documentLink: string | null;
  leadID: string | null;
  tin: string | null;
  vfdLetterStatus: string;
  vrn: string | null;
  isVip: string | null;
  OnBoardingClientNote: OnBoardingClientNoteType[];
}

export interface OnBoardingClientRequestType {
  date?: string | Date;
  address?: string | null;
  amountPaid?: number | null;
  businessCategory?: string | null;
  certificatePassword?: string | null;
  proofOfPaymentText?: string | null;
  companyName?: string | null;
  efdmsStatus?: string | null;
  emailUsedForComms?: string | null;
  emailUsedForLogin?: string | null;
  fullName?: string | null;
  documentLink?: string | null;
  serialNumber?: string | null;
  loginCredentials?: string | null;
  onBoardingClientID?: string;
  onboardingStatus?: string | null;
  paymentStatus?: string | null;
  phoneNumber?: string | null;
  platform?: string | null;
  service?: string | null;
  stage?: string | null;
  region?: string | null;
  tin?: string | null;
  vfdLetterStatus?: string | null;
  vrn?: string | null;
  specificPlatform?: string | null;
  commissionID?: string | null;
  leadID?: number | null;
  isVip?: boolean | null;
  updatedBy?: string | null;
  assignedEmail?: any;
  assigneeEmail?: string | null;
  assigneeEmailApp?: string | null;
  emailOnboardingType?: string | null;
}

export interface OnBoardingClientStageRequestType {
  address?: string | null;
  amountPaid?: number | null;
  businessCategory?: string | null;
  certificatePassword?: string | null;
  proofOfPaymentText?: string | null;
  companyName?: string | null;
  efdmsStatus?: string | null;
  emailUsedForComms?: string | null;
  emailUsedForLogin?: string | null;
  fullName?: string | null;
  serialNumber?: string | null;
  loginCredentials?: string | null;
  onBoardingClientID?: string;
  onboardingStatus?: string | null;
  paymentStatus?: string | null;
  phoneNumber?: string | null;
  platform?: string | null;
  service?: string | null;
  stage?: string | null;
  tin?: string | null;
  vfdLetterStatus?: string | null;
  vrn?: string | null;
  documentLink?: string | null;
  region?: string | null;
  isVip?: string | null;
}

export interface OnBoardingClientNoteType {
  note: string;
  createdBy: string | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
