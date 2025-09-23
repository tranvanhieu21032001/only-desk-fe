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

export interface Plugin {
  id: string;
  key: string;
  name: string;
  isInstalled: boolean;
  shortDesc: string;
  version: string;
  category: string;
  type: string;
  iconUrl: string;
  docUrl: string;
}
