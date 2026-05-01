export interface IClient {
  name: string;
  phone?: string;
  email: string;
  address?: IAddress;
  business?: IBusiness;
  active: boolean;
}

export interface IAddress {
  street: string;
  number: string;
  district: string;
  city: string;
  zip_code?: string;
}

export interface IBusiness {
  company_name: string; // razão social ou nome fantasia
  cnpj?: string; // opcional — nem todo PJ vai ter de início
}
