export interface LeadRequestType {
  date: Date;
  fullName: string;
  companyName?: string | null;
  tin?: string | null;
  phoneNumber?: string | null;
  emailAddress?: string | null;
  addedBy: string | null;
  reasons?: string;
  actionTaken?: string;
  progress?: string;
  status?: string;
  platform?: string;
  monthOnBoard?: string;
  vip?: string;
  updatedBy: string | null;
  location?: string;
  specificPlatform?: any;
  clientRequest?: string;
  zone: string;
}


export interface LeadUpdateRequestType {
  leadID: number;
  date?: Date;
  fullName?: string;
  companyName?: string;
  tin?: string;
  phoneNumber?: string | null;
  emailAddress?: string | null;
  emailAddressForLogin?: string | null;
  reasons?: string;
  actionTaken?: string;
  progress?: string;
  status?: string;
  platform?: string;
  monthOnBoard?: string;
  vip?: string;
  updatedBy: string | null;
  location?: string;
  specificPlatform?: string;
  clientRequest?: string;
  zone?: string;
  onBoardingStage?: string;
  documentLink?: string | null;
  vrn?: string | null;
  serialNumber?: string | null;
  amountPaid?: number | null;
  certificatePassword?: string | null;
  clientSimplifyService?: string | null;
  directorName?: string;
  businessCategory?: string | null;
  region?: string | null;
  address?: string | null;
  invoiceNumber?: string | null;
  receiptVerificationCode?: string | null;
}

export interface LeadOnBoardingUpdateStageType {
  leadID: number;
  updatedBy: string | null;
  progress: string;
  onBoardingStage: string;
  assignedEmail?: any;
  assigneeEmail?: string | null;
  assigneeEmailApp?: string | null;
  emailOnboardingType?: string | null;
}

export interface LeadResponseType {
  reduce?: any;
  date: string;
  fullName: string;
  companyName: string;
  phoneNumber: string;
  emailAddress: string;
  emailAddressForLogin: string | null;
  addedBy: string;
  reasons: string;
  actionTaken: string;
  progress: string;
  status: string;
  platform: string;
  monthOnBoard: string;
  vip: string;
  leadID: number;
  updatedBy: string;
  location: string;
  specificPlatform: string;
  clientRequest: string;
  zone: string;
  tin: string;
  documentLink: string | null;
  vrn: string | null;
  serialNumber: string | null;
  amountPaid: number | null;
  certificatePassword: string | null;
  clientSimplifyService?: string;
  directorName: string | null;
  businessCategory: string | null;
  region: string | undefined;
  address: string | null;
  onBoardingStage: string | null;
  invoiceNumber: string | null;
  receiptVerificationCode: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}


export type LeadTableType  = {
  reduce?: any;
  date: string;
  fullName: string;
  companyName: string;
  phoneNumber: string;
  emailAddress: string;
  emailAddressForLogin: string | null;
  addedBy: string;
  reasons: string;
  actionTaken: string;
  progress: string;
  status: string;
  platform: string;
  monthOnBoard: string;
  vip: string;
  leadID: number;
  updatedBy: string;
  location: string;
  specificPlatform: string;
  clientRequest: string;
  zone: string;
  tin: string;
  documentLink: string | null;
  vrn: string | null;
  serialNumber: string | null;
  amountPaid: number | null;
  certificatePassword: string | null;
  clientSimplifyService?: string;
  directorName: string | null;
  businessCategory: string | null;
  region: string | undefined;
  address: string | null;
  onBoardingStage: string | null;
  invoiceNumber: string | null;
  receiptVerificationCode: string | null;
  createdAt: any;
  updatedAt: any;
}

export interface OnBoardingClientFromLeadInterface {
  tin: string;
  documentLink: string;
  vrn?: string | null;
  serialNumber?: string | null;
  amountPaid?: number | null;
  certificatePassword?: string | null;
  clientSimplifyService: string;
  clientName: string;
  clientCompanyName: string;
  clientEmail?: string | null;
  clientAddress?: string | null;
  clientRegion: string;
  clientPhoneNumber?: string | null;
  clientEmailForLogin?: string | null;
  clientEmailForComms?: string | null;
  clientBusinessCategory?: string | null;
  clientDirectorName?: string | null;
  clientIsVip: string;
};


export interface LeadAnalytics {
  totalLeadsInPeriod: number;
  totalOnBoardedLeadsInPeriod: number;
  onBoardedLeadsFromOutsidePeriod: number;
  totalLeadsInProcess: number;
}

export interface LeadAnalyticsResponse {
  statusCode: number;
  message: string;
  data: LeadAnalyticsPayload;
}

export interface LeadAnalyticsPayload {
  overall: Overall;
  byZone: {
    [zone: string]: Ern;
  };
}


export interface Ern {
  totalLeadsInPeriod: number;
  totalOnBoardedLeadsInPeriod: number;
  onBoardedLeadsFromOutsidePeriod: number;
  totalLeadsInProcess: number;
  timeSeries: TimeSeries;
}

export interface TimeSeries {
  type: string;
  labels: Date[];
  data: TimeSeriesData;
}

export interface TimeSeriesData {
  "On Boarded": number[];
  "On Process": number[];
  Hesitant: number[];
  "Future Client": number[];
}

export interface Overall {
  timeSeries: TimeSeries;
}

