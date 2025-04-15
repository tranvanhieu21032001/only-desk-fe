import { ReactNode } from "react";

export interface OptionsInterface {
  key: string;
  value: string;
  label: string;
  flag?: ReactNode;
}
