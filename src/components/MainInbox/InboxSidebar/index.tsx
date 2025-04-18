import { Image } from "antd";
import { useState } from "react";

import Collapse from "@/components/common/Collapse";

import { initialTags, options } from "@/settings/options";

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
import addCircle from '@/assets/icons/common/ic-add-circle.svg'

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
                    <S.Status online />
                </S.AvatarWrapper>
                <S.ProfileInfo>
                    <S.NameRow>
                        <S.Name>Sophia Williams</S.Name>
                        <Image src={verify} preview={false} />
                    </S.NameRow>
                    <S.Email>sophia@alignui.com</S.Email>
                </S.ProfileInfo>
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
                            <S.Field>UserID</S.Field>
                            <S.DataValue>566</S.DataValue>
                        </S.DataRow>
                        <S.DataRow>
                            <S.Field>Info</S.Field>
                            <S.DataValue>Link...</S.DataValue>
                        </S.DataRow>
                        <S.DataRow>
                            <S.DataLabel>Datakey</S.DataLabel>
                            <S.DataValue>Datavalue</S.DataValue>
                            <Image src={addCircle} preview={false} />
                        </S.DataRow>
                    </S.SectionContent>
                )}
            </Collapse>
        </S.Container >
    );
};

export default InboxSidebar;
