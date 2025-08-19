import React, { ReactNode, isValidElement, cloneElement, ReactElement } from 'react';
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
        {isValidElement(children)
          ? cloneElement(children as ReactElement<any>, {
              onClick: (e: React.MouseEvent) => {
                e.preventDefault();
                e.stopPropagation();
              },
              style: {
                ...(children.props as any).style,
                // pointerEvents: 'none',
              },
            })
          : children}
      </UpgradePrompt>
    );
  }

  return <>{fallback || null}</>;
};
