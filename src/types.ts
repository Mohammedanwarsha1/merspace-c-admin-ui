export type Credentials = {
  email: string;
  password: string;
};
export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
};

export type Tenant = {
  id: number;
  name: string;
  address: string;
};

export type CreateUserdata = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
  tenantId: string;
};
export type FieldData = {
  name: string[];
  value?: string;
};
