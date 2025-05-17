import { useMemo } from 'react';
import { isEmpty } from 'lodash';
import { Col, Form, Image } from 'antd';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';

import themeColors from '@/shared/styles/themes/default/colors';

import Input from '@/shared/components/common/Input';
import Select from '@/shared/components/common/Select';
import Typography from '@/shared/components/common/Typography';

import * as S from './Data.styles';

import icData from '@/assets/icons/contact/ic-data.svg';
import icTrash from '@/assets/icons/common/ic-trash.svg';
import empty from '@/assets/images/contact/img-contact-empty.png';

interface ContactInformationProps {
  isLoading?: boolean;
  form?: any;
}

function Data({ isLoading, form }: ContactInformationProps) {
  const { t } = useTranslation('contacts');
  const dataWatch = Form.useWatch('dataForm', form) || [];
  const data = form.getFieldValue('dataForm') || [];

  function handleAddData() {
    form.setFieldValue('dataForm', [...data, { key: '', value: '' }]);
  }

  const renderData = useMemo(() => {
    if (isEmpty(dataWatch)) {
      return (
        <>
          <Image src={empty} width={120} height={120} preview={false} />
          <Typography color={themeColors?.primary} margin="8px 0 0 0">
            {t('contact-profile.no-data-added')}
          </Typography>
        </>
      );
    }

    return (
      <Form.List name="dataForm">
        {(fields, { remove }) => (
          <S.DataWrapContainer>
            {fields.map(({ key, name, ...restField }) => (
              <S.DataWrap key={key}>
                <Col xs={8}>
                  <Form.Item
                    {...restField}
                    name={[name, 'key']}
                    //TODO
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: t(
                    //       "invite-your-team.please-enter-business-email"
                    //     ),
                    //   },
                    // ]}
                  >
                    <Select placeholder={t('contact-profile.select-key')} />
                  </Form.Item>
                </Col>

                <Col xs={14}>
                  <Form.Item
                    {...restField}
                    name={[name, 'value']}
                    //TODO
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: t(
                    //       "invite-your-team.please-enter-business-email"
                    //     ),
                    //   },
                    // ]}
                  >
                    <Input placeholder={t('contact-profile.enter-value')} />
                  </Form.Item>
                </Col>

                <Col xs={2}>
                  <Image
                    src={icTrash}
                    onClick={() => remove(name)}
                    width={16}
                    height={18}
                    preview={false}
                  />
                </Col>
              </S.DataWrap>
            ))}
          </S.DataWrapContainer>
        )}
      </Form.List>
    );
  }, [form]);
  return (
    <>
      {isLoading ? (
        <S.Container>
          <S.Header>
            <S.HeaderWrap>
              <Image src={icData} width={24} height={24} preview={false} />
              <Typography variant="h5" color={themeColors?.secondaryDarker}>
                {t('contact-profile.data')}
              </Typography>
            </S.HeaderWrap>
            <S.HeaderActionWrap>
              <PlusOutlined />
              <Typography variant="h5" color={themeColors?.secondaryDarker}>
                {t('contact-profile.add-data')}
              </Typography>
            </S.HeaderActionWrap>
          </S.Header>

          <S.Body>
            <Image src={empty} width={120} height={120} preview={false} />
            <Typography color={themeColors?.primary} margin="8px 0 0 0">
              {t('contact-profile.no-data-added')}
            </Typography>
          </S.Body>
        </S.Container>
      ) : (
        <S.Container>
          <S.Header>
            <S.HeaderWrap>
              <Image src={icData} width={24} height={24} preview={false} />
              <Typography variant="h5" color={themeColors?.secondaryDarker}>
                {t('contact-profile.data')}
              </Typography>
            </S.HeaderWrap>
            <S.HeaderActionWrap onClick={handleAddData}>
              <PlusOutlined />
              <Typography variant="h5" color={themeColors?.secondaryDarker}>
                {t('contact-profile.add-data')}
              </Typography>
            </S.HeaderActionWrap>
          </S.Header>

          <S.Body>{renderData}</S.Body>
        </S.Container>
      )}
    </>
  );
}

export default Data;
