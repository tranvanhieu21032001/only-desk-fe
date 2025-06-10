export type Shortcut = {
  id: string;
  createdAt: string;
  updatedAt: string;
  shortcut: string;
  message: string;
  tag: string;
  workspaceId: string;
};

export type ShortcutsList = {
  data: Shortcut[];
  total: number;
  page: number;
  hasNextPage: boolean;
};
