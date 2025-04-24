import { ReactNode } from "react";

export interface chatWithCustomersInterface {
  key: string;
  value: string;
  label: string;
  icon: ReactNode;
}

export interface SignUpParamsInterface {
  email: string;
  password: string;
  phoneNumber: string;
  confirmPassword:string;
}
