import React from 'react';
import { Form } from 'antd';

import Collapse from '@/shared/components/common/Collapse';
import Select from '@/shared/components/common/Select';

import * as S from '../InboxSidebar.styles';

interface ConversationSegmentsProps {
  t: (key: string) => string;
  openCollapse: boolean;
  segment: string[];
  onChangeSegment: (value: string[]) => void;
  allSegmentOptions?: string[];
}

const ConversationSegments: React.FC<ConversationSegmentsProps> = ({
  t,
  openCollapse,
  segment,
  onChangeSegment,
  allSegmentOptions = [],
}) => {
  const mergedTags = Array.from(new Set([...allSegmentOptions, ...segment]));

  const selectOptions = mergedTags.filter(Boolean).map((tag) => ({
    value: tag,
    label: tag,
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
              options={selectOptions}
              onChange={(value) => onChangeSegment(value)}
            />
          </Form.Item>
        </S.SectionContent>
      )}
    </Collapse>
  );
};

export default ConversationSegments;
