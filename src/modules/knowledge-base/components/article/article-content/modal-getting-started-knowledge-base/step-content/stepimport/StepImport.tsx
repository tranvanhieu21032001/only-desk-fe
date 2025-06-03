import React, { useState } from 'react';
import Typography from '@/shared/components/common/Typography';
import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import * as S from './StepImport.styles';
import { useTranslation } from 'react-i18next';
import { Image, Progress, Upload, message, Button } from 'antd';
import type { UploadProps } from 'antd';

import icAdd from '@/assets/icons/knowledge-base/ic-add.svg';
import icUpload from '@/assets/icons/knowledge-base/ic-upload.svg';
import icFileCSV from '@/assets/icons/knowledge-base/ic-file-csv.svg';
import icUploading from '@/assets/icons/knowledge-base/ic-loading.svg';
import icSuccess from '@/assets/icons/knowledge-base/ic-success.svg';
import icFailded from '@/assets/icons/knowledge-base/ic-failded.svg';

const StepImport = () => {
    const { t } = useTranslation('knowledgeBase');
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [fileName, setFileName] = useState<string | null>(null);
    const [uploadedKB, setUploadedKB] = useState(0);
    const [totalKB, setTotalKB] = useState(0);

    const resetUpload = () => {
        setUploadStatus('idle');
        setUploadProgress(0);
        setFileName(null);
        setUploadedKB(0);
        setTotalKB(0);
    };

    const handleCustomUpload: UploadProps['customRequest'] = ({ file, onSuccess, onError, onProgress }) => {
        const fileSizeKB = Math.round(file.size / 1024);

        setFileName(file.name);
        setTotalKB(fileSizeKB);
        setUploadedKB(0);

        if (fileSizeKB > 10240) {
            message.error('File quá lớn. Vui lòng chọn file < 10MB.');
            setUploadStatus('error');
            onError?.(new Error('File quá lớn'));
            return;
        }

        setUploadStatus('uploading');
        let currentUploadedKB = 0;
        const chunkSize = 50;

        const interval = setInterval(() => {
            currentUploadedKB += chunkSize;
            if (currentUploadedKB > fileSizeKB) currentUploadedKB = fileSizeKB;

            const percent = Math.round((currentUploadedKB / fileSizeKB) * 100);
            setUploadProgress(percent);
            setUploadedKB(currentUploadedKB);
            onProgress?.({ percent });

            if (currentUploadedKB >= fileSizeKB) {
                clearInterval(interval);
                setUploadStatus('success');
                onSuccess?.('ok');
            }
        }, 100);
    };

    return (
        <>
            <Typography fontWeight={fontWeight.semiBold}>
                {t('article-menu.getting-started-knowledge.import-title')}
            </Typography>

            <S.ModalDescription>
                <Typography color={themeColors.newtralLight}>
                    {t('article-menu.getting-started-knowledge.import-description')}
                </Typography>
            </S.ModalDescription>

            <S.CreateContainer>
                <Image src={icAdd} width={24} height={24} preview={false} />
                <Typography color={themeColors.primary} fontWeight={fontWeight.semiBold}>
                    {t('article-menu.getting-started-knowledge.create-my-first-article')}
                </Typography>
                <S.CreateButton>
                    {t('article-menu.getting-started-knowledge.create')}
                </S.CreateButton>
            </S.CreateContainer>

            <S.OrDivider>
                {t('article-menu.getting-started-knowledge.or')}
            </S.OrDivider>

            {fileName && (
                <S.UploadStatusContainer>
                    <S.FileInfoRow>
                        <Image src={icFileCSV} width={40} height={40} preview={false} />
                        <S.FileDetails>
                            <Typography color={themeColors.primary} fontWeight={fontWeight.semiBold}>
                                {fileName}
                            </Typography>

                            {uploadStatus === 'uploading' && (
                                <S.UploadingInfo>
                                    <span>{uploadedKB} KB of {totalKB} KB</span>
                                    <S.UploadingText>
                                        <Image src={icUploading} preview={false} />
                                        <Typography>Uploading...</Typography>
                                    </S.UploadingText>
                                </S.UploadingInfo>
                            )}

                            {uploadStatus === 'success' && (
                                <S.StatusInfo>
                                    <span>{uploadedKB} KB of {totalKB} KB</span>
                                    <Typography> <Image src={icSuccess} preview={false} /> Completed</Typography>
                                </S.StatusInfo>
                            )}

                            {uploadStatus === 'error' && (
                                <S.StatusInfo>
                                    <span>{uploadedKB} KB of {totalKB} KB</span>
                                    <Typography><Image src={icFailded} preview={false} /> Failed</Typography>
                                </S.StatusInfo>
                            )}
                        </S.FileDetails>
                    </S.FileInfoRow>

                   {uploadStatus === 'error' || uploadStatus === 'uploading'?  <S.ProgressContainer>
                        {uploadStatus === 'uploading' && (
                            <Progress percent={uploadProgress} size="small" />
                        )}

                        {uploadStatus === 'error' && (
                            <Typography color="red" padding='0px 56px' fontWeight={fontWeight.semiBold} onClick={resetUpload}>
                                Try Again 
                            </Typography>
                        )}
                    </S.ProgressContainer>:""}
                </S.UploadStatusContainer>
            )}

            <S.CreateContainer>
                <Image src={icUpload} width={24} height={24} preview={false} />
                <Typography color={themeColors.primary} fontWeight={fontWeight.semiBold}>
                    {t('article-menu.getting-started-knowledge.import-from-a')}
                </Typography>

                <Upload customRequest={handleCustomUpload} showUploadList={false}>
                    <S.CreateButton disabled={uploadStatus === 'uploading'}>
                        {t('article-menu.getting-started-knowledge.browse-file')}
                    </S.CreateButton>
                </Upload>
            </S.CreateContainer>
        </>
    );
};

export default StepImport;
