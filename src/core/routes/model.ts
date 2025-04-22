import { ComponentType } from 'react';

type Breadcrumb = {
  label: string;
  href: string;
};

export interface RouterInterface {
  key: string | number;
  path: string;
  component: ComponentType;
  breadcrumb?: Breadcrumb[];
  name: string;
}

export interface RouterElementInterface extends RouterInterface {
  children?: RouterInterface[];
}
