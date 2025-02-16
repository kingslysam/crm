export interface OnBoardingClientDTO {
  vfdLetterStatus: string | null;
  efdmsStatus: string | null;
  paymentStatus: string | null;
  onboardingStatus: string | null;
  loginCredentials: string | null;
  address: string;
  businessCategory: string | null;
  certificatePassword: string | null;
  companyName: string;
  emailUsedForComms?: string;
  emailUsedForLogin: string | null;
  fullName: string;
  phoneNumber: string;
  platform: string;
  service: string | null;
  tin: string | null;
  vrn: string | null;
  serialNumber: string | null;
  onBoardingClientID: string;
  stage: string;
  amountPaid: number | null;
  proofOfPaymentText: string;
  createdAt: string;
  updatedAt: string;
  isVip: boolean | null;
  leadID: number;
  documentLink: string | null;
  specificPlatform: string;
}

export interface CommissionInterface {
  commissionID: string;
  onBoardingClientID: string;
  commissionName: string;
  commissionAmount: number | null;
  commissionDate: string;
  commissionType: string;
  commissionStatus: string;
  commissionPaymentMethod?: string | null;
  commissionPaymentFigure?: number | null;
  commissionNote: string | null;
  createdAt: string;
  updatedAt: string;
  OnBoardingClient: OnBoardingClientDTO[];
}


export interface CommissionNameInterface {
  inputValue?: string;
  commissionName: string;
  commissionID?: string;

}

