import React, { useEffect } from 'react';
import { Col, Form, Image, Input } from 'antd';

import Collapse from '@/shared/components/common/Collapse';
import copy from '@/assets/icons/common/ic-copy.svg';
import close from '@/assets/icons/inbox/ic-close.svg';

import * as S from '../InboxSidebar.styles';

interface VisitorsDataProps {
  t: (key: string) => string;
  openCollapse: boolean;
}

const VisitorsData: React.FC<VisitorsDataProps> = ({ t, openCollapse }) => {
  return (
    <Collapse title={t('inboxSidebar.visitorsData')}>
      {openCollapse && (
        <S.SectionContent>
          <Form.List name="metadata">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <S.DataRow key={key}>
                    <Col style={{ width: '40%' }}>
                      <Form.Item
                        {...restField}
                        name={[name, 'key']}
                        rules={[
                          { required: true, message: t('inboxSidebar.keyRequired') },
                        ]}
                      >
                        <Input placeholder={t('inboxSidebar.key')} />
                      </Form.Item>
                    </Col>

                    <Col style={{ width: '45%' }}>
                      <Form.Item
                        {...restField}
                        name={[name, 'value']}
                        rules={[
                          { required: true, message: t('inboxSidebar.valueRequired') },
                        ]}
                      >
                        <Input placeholder={t('inboxSidebar.value')} />
                      </Form.Item>
                    </Col>

                    <Col style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Image
                        src={copy}
                        preview={false}
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          const current = form.getFieldValue('metadata') || [];
                          const copied = current[name];
                          add({ key: copied?.key, value: copied?.value });
                        }}
                      />
                      <Image
                        src={close}
                        preview={false}
                        onClick={() => remove(name)}
                        style={{ cursor: 'pointer' }}
                      />
                    </Col>
                  </S.DataRow>
                ))}

                <S.countryCenter onClick={() => add()}>
                  {t('inboxSidebar.add')}
                </S.countryCenter>
              </>
            )}
          </Form.List>
        </S.SectionContent>
      )}
    </Collapse>
  );
};

export default VisitorsData;
