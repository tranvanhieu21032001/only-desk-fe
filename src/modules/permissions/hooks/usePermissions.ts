import { useState, useEffect } from 'react';
import {
  permissionService,
  WorkspacePermissions,
  FeaturePermission,
} from '../services/permissions.service';

export const useWorkspacePermissions = () => {
  const [permissions, setPermissions] = useState<WorkspacePermissions | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPermissions = async () => {
    try {
      setLoading(true);
      const data = await permissionService.getWorkspacePermissions();
      setPermissions(data);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load permissions',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPermissions();
  }, []);

  return { permissions, loading, error, refetch: () => loadPermissions() };
};

export const useFeaturePermission = (featureName: string) => {
  const [permission, setPermission] = useState<FeaturePermission | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPermission = async () => {
      try {
        setLoading(true);
        const permissions = await permissionService.getWorkspacePermissions();
        if (!permissions) {
          return;
        }
        const feature = permissions.features.find(
          (f) => f.feature === featureName,
        );
        setPermission(feature || null);
      } catch (err) {
        console.error('Failed to load feature permission:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPermission();
  }, [featureName]);

  return { permission, loading };
};

export const useCanAccess = (featureName: string) => {
  const { permission, loading } = useFeaturePermission(featureName);

  return {
    canAccess: permission?.accessible ?? false,
    isAvailable: permission?.available ?? false,
    upgradeMessage: permission?.upgradeMessage,
    loading,
  };
};
