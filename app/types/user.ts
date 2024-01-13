export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
};

export type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
};

export type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

export type Geo = {
  lat: string;
  lng: string;
};

export type FieldOption = {
  label: "Name" | "Company" | "Email";
  value: "name" | "company.name" | "email";
};

export type DirectionOption = {
  label: "Ascending" | "Descending";
  value: "ascending" | "descending";
};