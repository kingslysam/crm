export interface ClientResponse {
  data?: any;
  date: Date;
  emailUsedForComms: null;
  emailUsedForLogin: string;
  fullName: string;
  companyName: string;
  address: string;
  businessCategory: string;
  phoneNumber: string;
  tin: string;
  vrn: null;
  certificatePassword: string;
  serialNumber?: string | null;
  documentLink?: string | null;
  amountPaid?: number | null;
  region?: string | null;
  service: string;
  platform: string;
  clientID: string;
  isVip: string;
  createdAt: Date;
  isActivated: boolean;
  isBlocked: boolean;
  message: string;
}
