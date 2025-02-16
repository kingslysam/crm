export interface ClientInterface {
  data?: any;
  onBoardingClientID?: string;
  clientID?: string;
  dateOnBoarded?: Date;
  emailUsedForComms?: string | null;
  emailUsedForLogin?: string | null;
  fullName?: string;
  companyName?: string;
  address?: string | null;
  businessCategory?: string | null;
  phoneNumber?: string | null;
  region?: string | null;
  serialNumber?: string | null;
  documentLink?: string | null;
  amountPaid?: number | null;
  tin?: string | null;
  vrn?: string | null;
  certificatePassword?: string | null;
  paymentStatus?: string| null;
  service?: string;
  platform?: string;
  isActivated: boolean;
  isBlocked: boolean;
  isVip: string;
  leadID?: number;
}

export interface ClientResponseInterface {
  onBoardingClientID?: string;
  clientID: string;
  dateOnBoarded: Date;
  emailUsedForComms: string | null;
  emailUsedForLogin: string | null;
  fullName: string;
  companyName: string;
  address: string | null;
  paymentStatus: string;
  businessCategory: string | null;
  phoneNumber: string | null;
  region: string | null;
  tin: string | null;
  vrn: string | null;
  certificatePassword: string | null;
  serialNumber: string | null;
  documentLink: string | null;
  amountPaid: number | null;
  service: string;
  platform: string;
  isActivated: boolean;
  isBlocked: boolean;
  isVip: string;
  ClientNote: ClientNote[];
}

export interface OnBoardingClientInterface {
  stage: string;
  onboardingProgressID?: string;
  emailUsedForComms?: string;
  emailUsedForLogin?: string;
  fullName: string;
  companyName: string;
  address?: string;
  businessCategory?: string;
  phoneNumber: string;
  tin?: string;
  vrn?: string;
  certificatePassword?: string;
  serialNumber?: string | null;
  documentLink?: string | null;
  amountPaid?: number | null;
  region?: string | null;
  service?: string;
  platform?: string;
  vfdLetterStatus?: string;
  efdmsStatus?: string;
  paymentStatus?: string;
  onboardingStatus?: string;
  loginCredentials?: string;
}

export interface UpdateClientRequestInterface {
  dateOnBoarded?: string | Date;
  emailUsedForComms?: string | null;
  emailUsedForLogin?: string | null;
  fullName?: string | null;
  companyName?: string | null;
  address?: string | null;
  businessCategory?: string | null;
  phoneNumber?: string | null;
  tin?: string | null;
  vrn?: string | null;
  certificatePassword?: string | null;
  serialNumber?: string | null;
  documentLink?: string | null;
  amountPaid?: number | null;
  region?: string | null;
  service?: string | null;
  platform?: string | null;
  clientID?: string | null;
  isVip?: string | null;
  createdAt?: string | Date;
  isActivated: boolean | null;
  isBlocked?: boolean | null;
  leadID?: number | null;
}

export interface ClientNote {
  clientNoteID: number;
  clientID: string;
  note: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClientNoteRequestInterface {
  note: string;
  createdBy: string | null;
}
