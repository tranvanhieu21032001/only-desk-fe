import React, { useEffect, useRef } from 'react';
import { Col, Form, Image, Input } from 'antd';

import Collapse from '@/shared/components/common/Collapse';
import copy from '@/assets/icons/common/ic-copy.svg';
import close from '@/assets/icons/inbox/ic-close.svg';

import * as S from '../InboxSidebar.styles';

interface VisitorsDataProps {
  t: (key: string) => string;
  openCollapse: boolean;
  onChange: (metadata: { key: string; value: string }[]) => void;
}

const VisitorsData: React.FC<VisitorsDataProps> = ({ t, openCollapse, onChange }) => {
  const form = Form.useFormInstance();
  const previousMetadata = useRef<{ key: string; value: string }[]>([]);

  useEffect(() => {
    const initial = form.getFieldValue('metadata') || [];
    previousMetadata.current = initial.filter(
      (item: any) => item.key?.trim() && item.value?.trim()
    );
  }, []);

  const handleUpdate = () => {
    const allCurrent = form.getFieldValue('metadata') || [];

    const currentValid = allCurrent.filter(
      (item: any) => item.key?.trim() && item.value?.trim()
    );

    const prevValid = previousMetadata.current;

    const hasChanged = JSON.stringify(currentValid) !== JSON.stringify(prevValid);

    if (hasChanged) {
      previousMetadata.current = currentValid;
      onChange(currentValid);
    }
  };

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
                        rules={[{ required: true, message: t('inboxSidebar.keyRequired') }]}
                      >
                        <Input placeholder="Key" onBlur={handleUpdate} />
                      </Form.Item>
                    </Col>

                    <Col style={{ width: '45%' }}>
                      <Form.Item
                        {...restField}
                        name={[name, 'value']}
                        rules={[{ required: true, message: t('inboxSidebar.valueRequired') }]}
                      >
                        <Input placeholder="Value" onBlur={handleUpdate} />
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

                          setTimeout(() => {
                            handleUpdate();
                          }, 0);
                        }}
                      />
                      <Image
                        src={close}
                        preview={false}
                        onClick={() => {
                          const current = form.getFieldValue('metadata') || [];
                          const removedItem = current[name];

                          const isValid =
                            removedItem?.key?.trim() && removedItem?.value?.trim();

                          remove(name);

                          if (isValid) {
                            setTimeout(() => {
                              handleUpdate();
                            }, 0);
                          }
                        }}
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
