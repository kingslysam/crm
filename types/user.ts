export interface RegisterUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  appKey: string;
  role: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface SalesPersonInterface {
  fullName: string;
  phoneNumber: string;
  address: string;
  nida: string;
  addedBy: string | null;
  dateOfBirth: string | Date;
  target: number;
  email: string;
  zone: string;
  isManager: boolean;
  isActivated: boolean;
}



export interface SalesPersonResponseInterface {
  salesPersonID: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  nida: string;
  dateOfBirth: string;
  target: number;
  email: string;
  isActivated: boolean;
  isManager: boolean;
  zone: string;
  createdAt: string;
  updatedAt: string;
}
