import { Image } from "antd";
import { useState } from "react";

import Collapse from "../../common/Collapse";

import { initialTags, options } from "@/core/settings/options";

import * as S from "./inbox-sidebar.styles";

import verify from '@/assets/icons/common/ic-verify.svg'
import flag from '@/assets/icons/common/ic-flag.svg'
import defaultAvatar from '@/assets/images/avatar-default.png'
import flagVietNam from '@/assets/images/flag-vietnamese.png'
import location from '@/assets/icons/common/ic-location.svg'
import time from '@/assets/icons/common/ic-time.svg'
import internet from '@/assets/icons/common/ic-internet.svg'
import arrDown from '@/assets/icons/common/ic-arrow-down.svg'
import userCheck from '@/assets/icons/common/ic-user-check.svg'
import chorme from '@/assets/icons/common/ic-chorme.svg'
import cloud from '@/assets/icons/common/ic-cloud.svg'
import image from '@/assets/icons/common/ic-image.svg'
import mailInfo from '@/assets/icons/common/ic-mail-info.svg'
import message from '@/assets/icons/common/ic-message-info.svg'
import copy from '@/assets/icons/common/ic-copy.svg'
import edit from '@/assets/icons/common/ic-edit.svg'
import close from '@/assets/icons/common/ic-close-circle.svg'

const InboxSidebar = () => {
  const [openCollapse] = useState(true);
  const [selected, setSelected] = useState("None assigned");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [tags, setTags] = useState(initialTags);

  const handleSelect = (option: string) => {
    setSelected(option);
    setOpenDropdown(false);
  };

  const removeTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  const clearAll = () => {
    setTags([]);
  };

  return (
    <S.Container>
      <S.ProfileSection>
        <S.AvatarWrapper>
          <S.Avatar src={defaultAvatar} alt="Avatar" />
          <S.FlagIcon src={flag} />
          <S.Status online={true} />
          <S.CustomTooltip>
            <S.TooltipStatus>
              Sophia Williams is away
            </S.TooltipStatus>
            <S.TooltipLastActive>
              Last active: Sep 2025
            </S.TooltipLastActive>
          </S.CustomTooltip>
        </S.AvatarWrapper>
        <S.ProfileInfo>
          <S.NameRow>
            <S.Name>Sophia Williams</S.Name>
            <Image src={verify} preview={false} />
          </S.NameRow>
          <S.Email>sophia@alignui.com</S.Email>
        </S.ProfileInfo>
        <S.HoverArea>
          <S.ActionIcons>
            <Image src={copy} preview={false} />
            <Image src={edit} preview={false} />
          </S.ActionIcons>
        </S.HoverArea>
      </S.ProfileSection>

      <S.countryCenter>View profile</S.countryCenter>

      <Collapse title="Main Information">
        <S.DropdownWrapper>
          <S.DropdownRow>
            <S.UserIcon><Image src={userCheck} preview={false} /></S.UserIcon>
            <S.DropdownHeader onClick={() => setOpenDropdown(!openDropdown)}>
              <span>{selected}</span>
              <S.ArrowIcon isOpen={openDropdown}><Image src={arrDown} preview={false} /></S.ArrowIcon>
            </S.DropdownHeader>
          </S.DropdownRow>

          {openDropdown && (
            <S.DropdownList>
              {options.map((option) => (
                <S.DropdownItem
                  key={option}
                  onClick={() => handleSelect(option)}
                  selected={selected === option}
                >
                  {option}
                </S.DropdownItem>
              ))}
            </S.DropdownList>
          )}
        </S.DropdownWrapper>
      </Collapse>

      <Collapse title="Main Information">
        {openCollapse && (
          <S.SectionContent>
            <S.Field><Image src={location} preview={false} /> Da Nang</S.Field>
            <S.Field><Image src={time} preview={false} /> 2:34pm (UTC +7)</S.Field>
            <S.Field>
              <S.CountryRow>
                <span><Image src={internet} preview={false} /> Viet Nam</span>
                <S.CountryFlag src={flagVietNam} />
              </S.CountryRow>
            </S.Field>
          </S.SectionContent>
        )}
      </Collapse>

      <Collapse title="Visitors Devices">
        {openCollapse && (
          <S.SectionContent>
            <S.Field><Image src={chorme} preview={false} /> Chrome on Win10</S.Field>
            <S.Field><Image src={cloud} preview={false} /> 190:029:29:918:0ee Da Nang Viet...</S.Field>
          </S.SectionContent>
        )}
      </Collapse>

      <Collapse title="Conversation Participants">
        {openCollapse && (
          <S.SectionContent>
            <S.Participant>
              <S.DropdownRow>
                <Image src={mailInfo} preview={false} />
                <S.Field> admin@mposs.io</S.Field>
              </S.DropdownRow>
              <S.countryCenter>Add</S.countryCenter>
            </S.Participant>
          </S.SectionContent>
        )}
      </Collapse>

      <Collapse title="Quick Jump">
        {openCollapse && (
          <S.SectionContent>
            <S.Field><Image src={image} preview={false} /> Shared image files</S.Field>
            <S.Field><Image src={message} preview={false} /> Other conversation</S.Field>
          </S.SectionContent>
        )}
      </Collapse>

      <Collapse title="Segment For Conversation">
        {openCollapse && (
          <S.SectionContent>
            <S.TagsWrapper>
              {tags.map((tag, index) => (
                <S.Tag key={index}>
                  {tag}
                  <S.RemoveTagButton onClick={() => removeTag(index)}>×</S.RemoveTagButton>
                </S.Tag>
              ))}
              {tags.length > 0 && (
                <S.ClearAllButton onClick={clearAll}>×</S.ClearAllButton>
              )}
            </S.TagsWrapper>
          </S.SectionContent>
        )}
      </Collapse>

      <Collapse title="Visitors Data">
        {openCollapse && (
          <S.SectionContent>
            <S.DataRow>
              <S.DataWidth>
                <S.Field>UserID</S.Field>
              </S.DataWidth>
              <S.DataValue>566</S.DataValue>
            </S.DataRow>
            <S.DataRow>
              <S.DataWidth>
                <S.Field>Info</S.Field>
              </S.DataWidth>
              <S.DataValue>
                <S.DataLinkWrapper>
                  <S.LinkText>Link...</S.LinkText>
                  <S.LinkActionIcons>
                    <Image src={copy} preview={false} />
                    <Image src={close} preview={false} />
                  </S.LinkActionIcons>
                </S.DataLinkWrapper>
              </S.DataValue>
            </S.DataRow>
            <S.countryCenter>Add</S.countryCenter>
          </S.SectionContent>
        )}
      </Collapse>
    </S.Container >
  );
};

export default InboxSidebar;
