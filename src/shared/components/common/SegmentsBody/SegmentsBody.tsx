import { Form, Image, Skeleton } from 'antd';

import Select from '@/shared/components/common/Select';
import Typography from '@/shared/components/common/Typography';
import themeColors from '@/shared/styles/themes/default/colors';

import * as S from './Segments.styles';
import empty from '@/assets/images/contact/img-contact-empty.png';

interface SegmentsBodyProps {
  isDetails: boolean;
  emptySize?:number
  segments: string[];
  isLoading: boolean;
  t: (key: string) => string;
}

const SegmentsBody: React.FC<SegmentsBodyProps> = ({
  isDetails,
  segments,
  isLoading,
  emptySize = 120,
  t,
}) => {
  if (isLoading) {
    return (
      <S.Body>
        {Array(8)
          .fill(0)
          .map((_, idx) => (
            <S.ContentWrap key={idx}>
              <Skeleton.Avatar
                active
                style={{ height: 18, width: 40, borderRadius: 0 }}
              />
            </S.ContentWrap>
          ))}
      </S.Body>
    );
  }

  return (
    <S.Body>
      {isDetails ? (
        segments.length ? (
          segments.map((seg: string, idx: number) => (
            <S.ContentWrap key={idx}>
              <Typography>{seg}</Typography>
            </S.ContentWrap>
          ))
        ) : (
          <S.EmptyWrap>
            <Image src={empty} width={emptySize} height={emptySize} preview={false} />
            <Typography color={themeColors.primary} margin="8px 0 0 0">
             No data added
            </Typography>
          </S.EmptyWrap>
        )
      ) : (
        <Form.Item name="segments">
          <Select
            mode="tags"
            allowClear
            placeholder={t('contact-profile.select-segments')}
            tokenSeparators={[',']}
          />
        </Form.Item>
      )}
    </S.Body>
  );
};

export default SegmentsBody;
