import React from 'react';
import { Form } from 'antd';

import Collapse from '@/shared/components/common/Collapse';
import Select from '@/shared/components/common/Select';
import Typography from '@/shared/components/common/Typography';

import * as S from '../InboxSidebar.styles';

interface ConversationSegmentsProps {
  t: (key: string) => string;
  openCollapse: boolean;
  segment: string[];
}

const ConversationSegments: React.FC<ConversationSegmentsProps> = ({
  t,
  openCollapse,
  segment,
}) => {
  const mergedTags = Array.from(new Set([...segment]));

  const selectOptions = mergedTags.filter(Boolean).map((tag) => ({
    value: String(tag),
    label: String(tag),
  }));

  return (
    <Collapse title={t('inboxSidebar.segmentForConversation')}>
      {openCollapse && (
        <S.SectionContent>
          <Form.Item name="segments">
            <Select
              mode="tags"
              allowClear
              placeholder={t('inboxSidebar.select-segments')}
              tokenSeparators={[',']}
              options={selectOptions}
            />
          </Form.Item>
        </S.SectionContent>
      )}
    </Collapse>
  );
};

export default ConversationSegments;
