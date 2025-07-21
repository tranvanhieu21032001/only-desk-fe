import React from 'react';
import Image from 'antd/es/image';
import * as S from '../InboxSidebar.styles';
import userCheck from '@/assets/icons/common/ic-user-check.svg';
import arrDown from '@/assets/icons/common/ic-arrow-down.svg';
import Collapse from '@/shared/components/common/Collapse';
import defaultAvatar from '@/assets/images/avatar-default.png';
import { Contact } from '@/modules/inbox/interfaces/inbox';
import Typography from '@/shared/components/common/Typography';


interface DropdownWithCollapseProps {
  openDropdown: boolean;
  setOpenDropdown: (open: boolean) => void;
  selected: Contact | null;
  options: Contact[];
  handleSelect: (option: Contact) => void;
}
const DropdownWithCollapse: React.FC<DropdownWithCollapseProps> = ({
  openDropdown,
  setOpenDropdown,
  selected,
  options,
  handleSelect,
}) => {
    
  return (
    <Collapse title="Main Information">
      <S.DropdownWrapper>
        <S.DropdownRow>
          <S.UserIcon>
            <Image src={userCheck} preview={false} />
          </S.UserIcon>
          <S.DropdownHeader onClick={() => setOpenDropdown(!openDropdown)}>
            <span>{selected?.name || 'Unnamed'}</span>
            <S.ArrowIcon isOpen={openDropdown}>
              <Image src={arrDown} preview={false} />
            </S.ArrowIcon>
          </S.DropdownHeader>
        </S.DropdownRow>

        {openDropdown && (
          <S.DropdownList>
            {options.map((option) => (
              <S.DropdownItem
                key={option.id}
                onClick={() => handleSelect(option)}
                selected={selected?.id === option.id}
              >
                <S.OptionContent>
                  {option.avatar ? (
                    <S.Avatar src={option.avatar} alt="avatar" />
                  ) : (
                      <S.Avatar src={defaultAvatar} alt="avatar" />
                  )}
                  <div>
                    <Typography>{option.name || 'Unnamed'}</Typography>
                  <Typography variant='body-text-small'>  {option.email && <small>{option.email}</small>}</Typography>
                  </div>
                </S.OptionContent>
              </S.DropdownItem>
            ))}
          </S.DropdownList>
        )}
      </S.DropdownWrapper>
    </Collapse>
  );
};

export default DropdownWithCollapse;
