import React, { ReactNode } from 'react';
import { useCanAccess } from '../hooks/usePermissions';
import { UpgradePrompt } from './UpgradePrompt';

interface PermissionGateProps {
  feature: string;
  children: ReactNode;
  fallback?: ReactNode;
  showUpgradePrompt?: boolean;
}

export const PermissionGate: React.FC<PermissionGateProps> = ({
  feature,
  children,
  fallback,
  showUpgradePrompt = true,
}) => {
  const { canAccess, isAvailable, upgradeMessage, loading } =
    useCanAccess(feature);

  if (loading) {
    return <div className="h-8 animate-pulse rounded bg-gray-200"></div>;
  }

  if (canAccess) {
    return <>{children}</>;
  }

  if (!isAvailable && showUpgradePrompt) {
    return (
      <UpgradePrompt
        message={
          upgradeMessage || 'This feature is not available in your current plan'
        }
      >
        {children}
      </UpgradePrompt>
    );
  }

  return <>{fallback || null}</>;
};
