import empty from '@/assets/images/contact/img-contact-empty.png';
import { Image } from 'antd';
import Typography from '@/shared/components/common/Typography';
import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import styled from 'styled-components';
// import { useTranslation } from 'react-i18next';
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 90vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
const Nosubscription = () => {
//   const { t } = useTranslation('billing');

  return (
    <Wrapper>
      <Image src={empty} height={300} width={300} preview={false} />
      <Typography
        color={themeColors?.primary}
        variant="h5"
        fontWeight={fontWeight.semiBold}
      >
        There are no subscriptions available.
      </Typography>
      {/* <Typography color={themeColors?.primary} fontWeight={fontWeight.light}>
        {t('no-invoices.description')}
      </Typography> */}
    </Wrapper>
  );
};

export default Nosubscription;
