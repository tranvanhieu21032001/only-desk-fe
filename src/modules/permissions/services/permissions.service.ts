import { getRequest } from '@/core/services/requests';

const prefixPermissions: string = '/permissions';
const endpointPermissions = {
  WORKSPACE_PERMISSIONS: `${prefixPermissions}/workspace`,
};

export interface FeaturePermission {
  feature: string;
  available: boolean;
  accessible: boolean;
  visible: boolean;
  upgradeMessage?: string;
}

export interface UserPermissions {
  role: string;
  actions: string[];
}

export interface WorkspacePermissions {
  currentPlan: string;
  availableSeats: number;
  availableContacts: number;
  features: FeaturePermission[];
  userPermissions: UserPermissions;
}

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
      this.permissions = response.data;
      return this.permissions;
    } finally {
      this.loading = false;
    }
  }

  // Check if feature is available in current plan
  async isFeatureAvailable(featureName: string): Promise<boolean> {
    const permissions = await this.getWorkspacePermissions();
    if (!permissions) {
      return false;
    }
    const feature = permissions.features.find((f) => f.feature === featureName);
    return feature?.available ?? false;
  }

  // Check if user can access feature (both plan + role)
  async canAccessFeature(featureName: string): Promise<boolean> {
    const permissions = await this.getWorkspacePermissions();
    if (!permissions) {
      return false;
    }
    const feature = permissions.features.find((f) => f.feature === featureName);
    return feature?.accessible ?? false;
  }

  // Check if user can perform specific action
  async canPerformAction(action: string): Promise<boolean> {
    const permissions = await this.getWorkspacePermissions();
    if (!permissions) {
      return false;
    }
    return permissions.userPermissions.actions.includes(action);
  }

  // Get upgrade message for feature
  async getUpgradeMessage(featureName: string): Promise<string | null> {
    const permissions = await this.getWorkspacePermissions();
    if (!permissions) {
      return null;
    }
    const feature = permissions.features.find((f) => f.feature === featureName);
    return feature?.upgradeMessage ?? null;
  }

  // Get all feature permissions
  async getAllFeaturePermissions(): Promise<FeaturePermission[]> {
    const permissions = await this.getWorkspacePermissions();
    if (!permissions) {
      return [];
    }
    return permissions.features;
  }

  // Clear cache (call when user changes workspace or plan)
  clearCache() {
    this.permissions = null;
  }
}

export const permissionService = new PermissionService();
