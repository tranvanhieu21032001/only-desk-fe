import { Col, Form, Image, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import Select from '@/shared/components/common/Select';
import { csvMockup } from '@/shared/helper/data/contacts';

import * as S from './ConfigureTable.styles';

import icArrowRight from '@/assets/icons/contact/ic-right.svg';
import icGreenCircle from '@/assets/icons/contact/ic-circle-green.svg';
import Typography from '@/shared/components/common/Typography';
import fontWeight from '@/shared/styles/themes/default/fontWeight';

function ConfigureTable() {
  const { t } = useTranslation('contacts');

  const [form] = Form.useForm();

  return (
    <S.WrapContainer>
      <Form form={form}>
        <S.ThreadContainer>
          <Row>
            <Col xs={12}>
              <Typography fontWeight={fontWeight?.semiBold}>
                {t('modal-import-contact.table.columns-in-csv')}
              </Typography>
            </Col>
            <Col xs={12}>
              <Typography fontWeight={fontWeight?.semiBold}>
                {t('modal-import-contact.table.fields-in-only-chat')}
              </Typography>
            </Col>
          </Row>
        </S.ThreadContainer>
        <S.BodyContainer>
          {csvMockup?.map((csv) => (
            <Row key={csv?.id}>
              <Col xs={10}>
                <S.ColumnContainer>
                  <Typography>{csv?.name}</Typography>
                </S.ColumnContainer>
              </Col>
              <Col xs={2}>
                <S.ColumnContainer>
                  <Image
                    src={icArrowRight}
                    width={24}
                    height={24}
                    preview={false}
                  />
                </S.ColumnContainer>
              </Col>
              <Col xs={10}>
                <S.ColumnContainer>
                  <Form.Item name={csv?.id}>
                    <Select options={[]} placeholder={csv?.name} />
                  </Form.Item>
                </S.ColumnContainer>
              </Col>
              <Col xs={2}>
                <S.ColumnContainer>
                  <Image
                    src={icGreenCircle}
                    width={8}
                    height={8}
                    preview={false}
                  />
                </S.ColumnContainer>
              </Col>
            </Row>
          ))}
        </S.BodyContainer>
      </Form>
    </S.WrapContainer>
  );
}

export default ConfigureTable;
