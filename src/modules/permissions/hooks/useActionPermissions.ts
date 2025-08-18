import { useState, useEffect } from 'react';
import { permissionService } from '../services/permissions.service';

export const useCanPerformAction = (action: string) => {
  const [canPerform, setCanPerform] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkPermission = async () => {
      try {
        setLoading(true);
        const result = await permissionService.canPerformAction(action);
        setCanPerform(result);
      } catch (err) {
        console.error('Failed to check action permission:', err);
        setCanPerform(false);
      } finally {
        setLoading(false);
      }
    };

    checkPermission();
  }, [action]);

  return { canPerform, loading };
};
