export const decodeGlobalId = (globalId: string): string => {
  try {
    const decoded = atob(globalId);
    const parts = decoded.split(':');
    return parts[1] || globalId;
  } catch {
    return globalId;
  }
};

export const getId = (id: string | null | undefined) => {
  if (!id) return null;

  if (/^[a-f\d]{24}$/i.test(id)) {
    return id;
  }

  // Attempt to decode Relay ID (Base64)
  try {
    const decoded = atob(id); // Base64 decode
    const parts = decoded.split(':');
    const possibleId = parts[1];

    if (/^[a-f\d]{24}$/i.test(possibleId)) {
      return possibleId;
    }
  } catch (e) {
    // Not a valid Base64 string or unexpected format
    return null;
  }

  // Not recognized
  return null;
};
