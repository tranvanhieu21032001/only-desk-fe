import { FeatureKey } from '../enums/features.enum';
import { PlanKey } from '../enums/plans.enum';
import { RoleKey } from '../enums/roles.enum';

export interface PlanConfig {
  key: PlanKey;
  seats: number;
  contacts: number;
  priceMonth: number;
}

export interface FeatureConfig {
  feature: FeatureKey;
  actions: {
    [action: string]: {
      plan: PlanKey[];
      role: RoleKey[];
    };
  };
}

export interface FeaturePermission {
  feature: FeatureKey;
  actions: {
    [action: string]: {
      available: boolean;
      accessible: boolean;
      needUpgrade?: boolean;
      message?: string;
    };
  };
}

export interface WorkspacePermissions {
  currentPlan: PlanKey;
  availableSeats: number;
  availableContacts: number;
  features: FeaturePermission[];
}
