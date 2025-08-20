import { getRequest } from '@/core/services/requests';
import { WorkspacePermissions } from '../interfaces/permission.interface';

const prefixPermissions: string = '/permissions';
const endpointPermissions = {
  WORKSPACE_PERMISSIONS: `${prefixPermissions}/workspace`,
};

class PermissionService {
  private permissions: WorkspacePermissions | null = null;
  private loading = false;

  async getWorkspacePermissions(): Promise<WorkspacePermissions | null> {
    if (this.permissions) {
      return this.permissions;
    }

    if (this.loading) {
      // Wait for ongoing request
      while (this.loading) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      return this.permissions!;
    }

    try {
      this.loading = true;
      const response = await getRequest(
        endpointPermissions.WORKSPACE_PERMISSIONS,
      );
      this.permissions = response;
      return this.permissions;
    } finally {
      this.loading = false;
    }
  }

  // Clear cache (call when user changes workspace or plan)
  clearCache() {
    this.permissions = null;
  }
}

export const permissionService = new PermissionService();
