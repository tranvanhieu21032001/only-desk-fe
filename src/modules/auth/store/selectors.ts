import { RootState } from '@/core/store';

export const selectCurrentWorkspaceId = (state: RootState) =>
  state.auth.currentWorkspace?.id;

export const selectIsLoading = (state: RootState) => state.auth.isLoading;
