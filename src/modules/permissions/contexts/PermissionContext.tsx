import React, { createContext, useContext, ReactNode } from 'react';
import { useWorkspacePermissions } from '../hooks/usePermissions';
import { WorkspacePermissions } from '../interfaces/permission.interface';

interface PermissionContextType {
  permissions: WorkspacePermissions | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const PermissionContext = createContext<PermissionContextType | undefined>(
  undefined,
);

export const PermissionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const permissionData = useWorkspacePermissions();

  return (
    <PermissionContext.Provider value={permissionData}>
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermissionContext = () => {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error(
      'usePermissionContext must be used within PermissionProvider',
    );
  }
  return context;
};
