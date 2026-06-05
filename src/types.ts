export type Credentials = {
  email: string;
  password: string;
};
export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  tenant: Tenant | null;
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
export type CreateTenantData = {
  name: string;
  address: string;
};
export interface PriceConfiguration {
  [key: string]: {
    priceType: "base" | "aditional";
    availableOptions: string[];
  };
}

export interface Attribute {
  name: string;
  widgetType: "switch" | "radio";
  defaultValue: string;
  availableOptions: string[];
}

export type Category = {
  _id: string;
  name: string;
  priceConfiguration: PriceConfiguration;
  attributes: Attribute[];
};
export type Product = {
  _id: string;
  name: string;
  image: string;
  description: string;
  category: string;
  isPublish: boolean;
  createdAt: string;
};
