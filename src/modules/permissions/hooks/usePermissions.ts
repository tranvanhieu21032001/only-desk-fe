import { useState, useEffect } from 'react';
import { permissionService } from '../services/permissions.service';
import { WorkspacePermissions } from '../interfaces/permission.interface';

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
