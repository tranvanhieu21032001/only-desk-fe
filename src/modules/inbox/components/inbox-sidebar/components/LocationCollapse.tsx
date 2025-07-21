import React from 'react';
import { useAppSelector } from '@/shared/hooks';
import Collapse from '@/shared/components/common/Collapse';
import * as S from '../InboxSidebar.styles';
import LastReportedLocationBody from '@/shared/components/common/ReportedLocation/LastReportedLocationBody';

interface LocationCollapseProps {
  openCollapse: boolean;
}

const LocationCollapse: React.FC<LocationCollapseProps> = ({ openCollapse }) => {
  const { contactDetails } = useAppSelector((state) => state.contacts);
  const { contactByIdCoversation } = useAppSelector((state) => state.contactByIdConversation);

  return (
    <Collapse title="Main Information">
      {openCollapse && (
        <S.SectionContent>
          <LastReportedLocationBody context={contactDetails?.context || contactByIdCoversation?.contact.context}/>
        </S.SectionContent>
      )}
    </Collapse>
  );
};

export default LocationCollapse;
