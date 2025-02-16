export interface QueryInterface {
  queryID?: number;
  clientID?: string;
  companyID?: string;
  queryText: string;
  queryType: string;
  queryDate: Date;
  resolved: boolean;
  assignedBy?: null | string;
  resolvedBy: null | string;
  createdBy: string | null;
  updatedBy: string | null;
  resolvedDate: Date | null;
  status: string;
  priority: string;
  assignedTo: string;
  assignedEmail: string;
  assigneeEmail: string | null;
  assigneeEmailApp: string | null;
  resolution: string;
}

export interface QueryResponseInterface {
  queryID: number;
  clientID: string;
  queryText: string;
  queryType: string;
  queryDate: Date;
  resolved: boolean;
  assignedBy?: null | string;
  resolvedBy: null | string;
  createdBy: string;
  updatedBy: string;
  resolvedDate: Date | null;
  status: string;
  priority: string;
  assignedTo: string;
  resolution: string;
  Client: Client;
  QueryComment: Comment[];
}

export interface Client {
  date: Date;
  emailUsedForComms: string;
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
}

export interface Comment {
  id: number;
  queryID: number;
  commentText: string;
  commentDate: Date;
  commentedBy: string;
}

export interface CommentResquest {
  commentText?: string | undefined;
  commentDate?: Date;
  commentedBy?: string | null;
}

export interface AssignedData {
  status: string;
  assignedTo: string;
  assignedDate: Date;
  assignedBy: string;
  updatedBy: string;
}

export interface ResolvedData {
  resolved: boolean;
  resolvedBy: string;
  resolvedDate: Date;
  status: string;
  resolution: string;
  updatedBy: string;
}

export interface UpdateStatus {
  status: string;
}
