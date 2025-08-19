import React, {
  ReactNode,
  isValidElement,
  cloneElement,
  ReactElement,
} from 'react';
import { useCanAccess } from '../hooks/usePermissions';
import { UpgradePrompt } from './UpgradePrompt';

interface PermissionGateProps {
  feature: string;
  children:
    | ReactNode
    | ((hasPermission: boolean, message?: string) => ReactNode);
}

export const PermissionGate: React.FC<PermissionGateProps> = ({
  feature,
  children,
}) => {
  const { canAccess, isAvailable, upgradeMessage, loading } =
    useCanAccess(feature);

  if (loading) {
    return <div className="h-8 animate-pulse rounded bg-gray-200"></div>;
  }

  if (canAccess && isAvailable) {
    return <>{children}</>;
  }

  const message =
    upgradeMessage || 'This feature is not available in your current plan';

  if (typeof children === 'function') {
    return (
      <>
        {(children as (hasPermission: boolean, message?: string) => ReactNode)(
          isAvailable && canAccess,
          message,
        )}
      </>
    );
  } else {
    return (
      <UpgradePrompt message={message}>
        {isValidElement(children)
          ? cloneElement(children as ReactElement<any>, {
              onClick: (e: React.MouseEvent) => {
                e.preventDefault();
                e.stopPropagation();
              },
              style: {
                ...(children.props as any).style,
                opacity: 0.5,
                cursor: 'not-allowed',
              },
            })
          : children}
      </UpgradePrompt>
    );
  }
};
