import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import { Col, Form, FormInstance, Image, Skeleton } from 'antd';
import { isEmpty } from 'lodash';

import { useAppSelector } from '@/shared/hooks';
import themeColors from '@/shared/styles/themes/default/colors';

import Input from '@/shared/components/common/Input';
import Typography from '@/shared/components/common/Typography';

import * as S from './Data.styles';

import icData from '@/assets/icons/contact/ic-data.svg';
import icTrash from '@/assets/icons/common/ic-trash.svg';
import empty from '@/assets/images/contact/img-contact-empty.png';

interface DataProps {
  form: FormInstance;
}

function Data({ form }: DataProps) {
  const { t } = useTranslation('contacts');

  const [isEmptyForm, setIsEmptyForm] = useState<boolean>(true);

  const { isLoading, contactDetails, isDetails } = useAppSelector(
    (state) => state.contacts,
  );

  useEffect(() => {
    !isEmpty(contactDetails?.metadata) && setIsEmptyForm(false);
  }, [contactDetails?.metadata]);

  function handleAddData() {
    let data = form.getFieldValue('metadata');

    if (!Array.isArray(data)) data = [];
    form.setFieldValue('metadata', [...data, { key: '', value: '' }]);
    setIsEmptyForm(false);
  }

  const renderData = useMemo(() => {
    if (isEmptyForm) {
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
      <Form.List name="metadata">
        {(fields, { remove }) => (
          <S.DataWrapContainer>
            {fields.map(({ key, name, ...restField }) => (
              <S.DataWrap key={key}>
                <Col xs={8}>
                  <Form.Item
                    {...restField}
                    name={[name, 'key']}
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: t('contact-profile.please-enter-key'),
                    //   },
                    // ]}
                  >
                    <Input placeholder={t('contact-profile.enter-key')} />
                  </Form.Item>
                </Col>

                <Col xs={14}>
                  <Form.Item
                    {...restField}
                    name={[name, 'value']}
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: t('contact-profile.please-enter-value'),
                    //   },
                    // ]}
                  >
                    <Input placeholder={t('contact-profile.enter-value')} />
                  </Form.Item>
                </Col>

                <Col xs={2}>
                  <Image
                    src={icTrash}
                    onClick={() => {
                      form.getFieldValue('dataForm')?.length === 1 &&
                        setIsEmptyForm(false);
                      remove(name);
                    }}
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
  }, [isEmptyForm]);

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
            {!isDetails && (
              <S.HeaderActionWrap>
                <PlusOutlined />
                <Typography variant="h5" color={themeColors?.secondaryDarker}>
                  {t('contact-profile.add-data')}
                </Typography>
              </S.HeaderActionWrap>
            )}
          </S.Header>

          <S.Body>
            {Array(3)
              ?.fill(0)
              ?.map((_, index: number) => (
                <S.ContentWrap key={index}>
                  <Skeleton.Input
                    active
                    style={{
                      height: '39px',
                      width: '100%',
                      minWidth: '200px',
                      marginTop: '8px',
                      minHeight: '39px',
                    }}
                  />
                  <Skeleton.Input
                    active
                    style={{
                      height: '39px',
                      minWidth: '100%',
                      marginTop: '8px',
                      minHeight: '39px',
                    }}
                  />
                </S.ContentWrap>
              ))}
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
            {!isDetails && (
              <S.HeaderActionWrap onClick={handleAddData}>
                <PlusOutlined />
                <Typography variant="h5" color={themeColors?.secondaryDarker}>
                  {t('contact-profile.add-data')}
                </Typography>
              </S.HeaderActionWrap>
            )}
          </S.Header>

          <S.Body>
            {isDetails ? (
              <>
                {isEmptyForm ? (
                  <>
                    <Image
                      src={empty}
                      width={120}
                      height={120}
                      preview={false}
                    />
                    <Typography color={themeColors?.primary} margin="8px 0 0 0">
                      {t('contact-profile.no-data-added')}
                    </Typography>
                  </>
                ) : (
                  Object.keys(contactDetails?.metadata || {})
                    ?.map((item) => ({
                      key: item,
                      value: contactDetails?.metadata?.[item],
                    }))
                    ?.map((meta) => (
                      <S.ContentWrap>
                        <Input value={meta?.key} disabled />
                        <Input value={meta?.value} disabled />
                      </S.ContentWrap>
                    ))
                )}
              </>
            ) : (
              renderData
            )}
          </S.Body>
        </S.Container>
      )}
    </>
  );
}

export default Data;
