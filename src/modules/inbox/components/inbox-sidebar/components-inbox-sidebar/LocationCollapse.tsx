import React from 'react';
import { Image } from 'antd';

import Collapse from '@/shared/components/common/Collapse';

import location from '@/assets/icons/common/ic-location.svg';
import time from '@/assets/icons/common/ic-time.svg';
import internet from '@/assets/icons/common/ic-internet.svg';
import flagVietNam from '@/assets/images/flag-vietnamese.png';

import * as S from '../InboxSidebar.styles';

interface LocationCollapseProps {
  openCollapse: boolean;
}

const LocationCollapse: React.FC<LocationCollapseProps> = ({ openCollapse }) => {
  return (
    <Collapse title="Main Information">
      {openCollapse && (
        <S.SectionContent>
          <S.Field>
            <Image src={location} preview={false} /> Da Nang
          </S.Field>
          <S.Field>
            <Image src={time} preview={false} /> 2:34pm (UTC +7)
          </S.Field>
          <S.Field>
            <S.CountryRow>
              <span>
                <Image src={internet} preview={false} /> Viet Nam
              </span>
              <S.CountryFlag src={flagVietNam} />
            </S.CountryRow>
          </S.Field>
        </S.SectionContent>
      )}
    </Collapse>
  );
};

export default LocationCollapse;
