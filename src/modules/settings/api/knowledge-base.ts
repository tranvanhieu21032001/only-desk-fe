import { updateRequest } from '@/core/services/requests';

const prefixBase = '';

export const endpointKnowledgeBaseSetting = {
  SETTINGKNOWLEDGE: `${prefixBase}/helpdesk/settings`,
};

export const updateKnowledgeBaseSetting = async (data: any) => {
  try {
    const response = await updateRequest(
      endpointKnowledgeBaseSetting.SETTINGKNOWLEDGE,
      {
        data,
        messageSuccess: 'Settings updated successfully!',
        messageError: 'Failed to update settings!',
      },
    );

    return response?.data;
  } catch (error) {
    console.error('Lỗi khi cập nhật:', error);
    throw error;
  }
};
