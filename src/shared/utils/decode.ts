export const decodeGlobalId = (globalId: string): string => {
    try {
      const decoded = atob(globalId);
      const parts = decoded.split(':');
      return parts[1] || globalId;
    } catch {
      return globalId;
    }
  };