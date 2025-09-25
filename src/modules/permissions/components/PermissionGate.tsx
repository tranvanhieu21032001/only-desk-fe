import React, {
  ReactNode,
  isValidElement,
  cloneElement,
  ReactElement,
} from 'react';

export type PermissionGateRender = (
  hasPermission: boolean,
  message?: string,
  needUpgrade?: boolean,
) => ReactNode;

import { UpgradePrompt } from './UpgradePrompt';
import { FeatureKey } from '../enums/features.enum';
import { usePermissionContext } from '../contexts/PermissionContext';
import { FeaturePermission } from '../interfaces/permission.interface';

export interface PermissionGateProps {
  feature: FeatureKey | undefined;
  action: string;
  ignoreCheck?: boolean;
  children: ReactNode | PermissionGateRender;
}

export const PermissionGate: React.FC<PermissionGateProps> = ({
  feature,
  action,
  ignoreCheck,
  children,
}) => {
  const { permissions } = usePermissionContext();
  // console.log("permissions", permissions);

  var featurePermission: FeaturePermission | undefined =
    feature && permissions?.features.find((f) => f.feature === feature);
  var actionPermission = featurePermission?.actions[action];

  var { accessible, available, needUpgrade, message } = actionPermission || {
    accessible: false,
    available: false,
    needUpgrade: false,
    message: '',
  };

  const hasPermission = ignoreCheck || (accessible && available);

  if (typeof children === 'function') {
    return (
      <>
        {(children as PermissionGateRender)(
          hasPermission,
          message,
          needUpgrade,
        )}
      </>
    );
  }

  if (hasPermission) {
    return <>{children}</>;
  }

  return (
    <UpgradePrompt message={message || ''} needUpgrade={needUpgrade}>
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
};
