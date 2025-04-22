import { ReactNode } from "react";

export interface OptionsInterface {
  key: string;
  value: string;
  label: string;
  flag?: ReactNode;
}

export interface objectHistoryInterface {
  key: string;
  value: string;
}
