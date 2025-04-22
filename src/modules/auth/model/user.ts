export interface UserInforInterface {
  email?: string;
  role?: string[];
  avatar?: string | File;
  rbacUiUser?: {
    id?: string;
    _id: string;
    name: string;
  };
}
