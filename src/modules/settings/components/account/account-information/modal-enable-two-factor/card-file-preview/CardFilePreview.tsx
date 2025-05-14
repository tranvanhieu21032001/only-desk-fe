import { useTranslation } from 'react-i18next';
import { Image, Skeleton } from 'antd';

import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';

import Typography from '@/shared/components/common/Typography';

import * as S from './CardFilePreview.styles';

import icRemove from '@/assets/icons/contact/ic-remove.svg';
import icTickCircle from '@/assets/icons/contact/ic-tick-circle.svg';

interface CardFilePreviewProps {
  file: string;
  onFiles: React.Dispatch<React.SetStateAction<string[]>>;
  params?: {
    isLoading: boolean;
    countUpload: number;
  };
}

function CardFilePreview({ file, onFiles, params }: CardFilePreviewProps) {
  const { t } = useTranslation('contacts');

  const handleRemoveFile = () => {
    onFiles((prev) => prev.filter((item) => item !== file));
  };

  return (
    <>
      {params?.isLoading ? (
        <S.CardFileUploadCsvContainer>
          <S.InfoFileLeft>
            <Skeleton.Image active style={{ width: 40, height: 40 }} />
            <S.InfoFile>
              <Skeleton.Input
                active
                style={{ width: '100%', maxWidth: 600, height: 20 }}
              />
              <Skeleton.Input
                active
                style={{ width: '100%', maxWidth: 300, height: 20 }}
              />
            </S.InfoFile>
          </S.InfoFileLeft>

          <S.Remove>
            <Skeleton.Image active style={{ width: 20, height: 20 }} />
          </S.Remove>
        </S.CardFileUploadCsvContainer>
      ) : (
        <S.CardFileUploadCsvContainer>
          <S.InfoFileLeft>
            <Image
              src={file}
              alt={`File preview for ${file}`}
              width={40}
              height={40}
              preview={false}
            />
            <S.InfoFile>
              <Typography fontWeight={fontWeight?.semiBold}>{file}</Typography>
              <Typography color={themeColors?.primary}>
                120 KB of 120 KB <span>.</span> <Image src={icTickCircle} />{' '}
                {t('modal-import-contact.completed')}
              </Typography>
            </S.InfoFile>
          </S.InfoFileLeft>

          <S.Remove>
            <Image
              src={icRemove}
              preview={false}
              alt={`File preview for ${file}`}
              width={20}
              height={20}
              onClick={handleRemoveFile}
            />
          </S.Remove>
        </S.CardFileUploadCsvContainer>
      )}
    </>
  );
}

export default CardFilePreview;
