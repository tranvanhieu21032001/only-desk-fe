import React, {
  ReactNode,
  isValidElement,
  cloneElement,
  ReactElement,
} from 'react';
import { UpgradePrompt } from './UpgradePrompt';
import { FeatureKey } from '../enums/features.enum';
import { usePermissionContext } from '../contexts/PermissionContext';
import { FeaturePermission } from '../interfaces/permission.interface';

interface PermissionGateProps {
  feature: FeatureKey | undefined;
  action: string;
  ignoreCheck?: boolean;
  children:
    | ReactNode
    | ((hasPermission: boolean, message?: string) => ReactNode);
}

export const PermissionGate: React.FC<PermissionGateProps> = ({
  feature,
  action,
  ignoreCheck,
  children,
}) => {
  const { permissions } = usePermissionContext();

  var featurePermission: FeaturePermission | undefined =
    feature && permissions?.features.find((f) => f.feature === feature);
  var actionPermission = featurePermission?.actions[action];

  var { accessible, available, needUpgrade, message } = actionPermission || {
    accessible: false,
    available: false,
    needUpgrade: false,
    message: '',
  };

  if (ignoreCheck || (accessible && available)) {
    return <>{children}</>;
  }

  if (typeof children === 'function') {
    return (
      <>
        {(children as (hasPermission: boolean, message?: string) => ReactNode)(
          available && accessible,
          message,
        )}
      </>
    );
  } else {
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
  }
};
