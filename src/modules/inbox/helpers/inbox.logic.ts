import { postRequest } from '@/core/services/requests';
import { constants } from '@/core/settings';

export const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo`;
  const years = Math.floor(days / 365);
  return `${years}y`;
};

export const getFormattedTime = (lastActivityAt?: string) => {
  if (!lastActivityAt) return '';
  try {
    return formatTimeAgo(lastActivityAt);
  } catch {
    return lastActivityAt;
  }
};

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await postRequest(`${constants.API_SERVER}/file-upload/file`, {
    data: formData,
    isFormData: true,
    enableFlashMessageSuccess: false,
    enableFlashMessageError: true,
  });
  return res;
};
