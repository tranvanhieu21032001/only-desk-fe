import React from 'react';
import { Image } from 'antd';

import AvatarWithStatus from '../../../../shared/components/common/Avatar';

import * as S from './InboxDetail.styles';

import avatarAdmin from '@/assets/images/avatar-default.png';
import avatarUser from '@/assets/images/avatar-default.png';
import check from '@/assets/icons/common/ic-check.svg'
import barOpen from '@/assets/icons/common/ic-bar-open.svg'
import barClose from '@/assets/icons/common/ic-bar.svg'
import flag from '@/assets/icons/common/ic-flag.svg'
import defaultAvatar from '@/assets/images/avatar-default.png'
import undo from '@/assets/icons/common/ic-undo.svg'
import edit from '@/assets/icons/common/ic-edit.svg'
import note from '@/assets/icons/common/ic-note.svg'
import ring from '@/assets/icons/common/ic-ring.svg'
import shortCut from '@/assets/icons/common/ic-short-cut.svg'
import tag from '@/assets/icons/common/ic-tag.svg'
import file from '@/assets/icons/common/ic-file.svg'
import smile from '@/assets/icons/common/ic-smile.svg'
import send from '@/assets/icons/common/ic-send.svg'

interface InboxDetailProps {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

const InboxDetail: React.FC<InboxDetailProps> = ({ isSidebarOpen, toggleSidebar }) => {
    return (
        <S.Container>
            <S.Header>
                <S.HeaderLeft>
                    <AvatarWithStatus
                        avatarSrc={defaultAvatar}
                        flagSrc={flag}
                        isOnline={true}
                    />
                    <S.Info>
                        <S.Name>Admin 3</S.Name>
                    </S.Info>
                </S.HeaderLeft>
                <S.HeaderRight>
                    <S.MarkResolvedButton><Image src={check} preview={false} /> Mark Resolved</S.MarkResolvedButton>
                    <S.ToggleSidebarButton onClick={toggleSidebar}>
                        {isSidebarOpen ? <Image src={barClose} preview={false} /> : <Image src={barOpen} preview={false} />}
                    </S.ToggleSidebarButton>
                </S.HeaderRight>
            </S.Header>

            <S.MainContent>
                <S.MessageContainer isSidebarOpen={isSidebarOpen}>
                    <S.DateDivider>08/04/2022 11:06</S.DateDivider>

                    <S.MessageRow>
                        <S.MessageAvatarWrapper>
                            <S.MessageAvatar src={avatarAdmin} alt="Admin" />
                            <S.MessageColumnView>
                                <S.MessageSenderName>Admin 3</S.MessageSenderName>
                                <S.MessageBubbleLeft>Hello</S.MessageBubbleLeft>
                            </S.MessageColumnView>
                        </S.MessageAvatarWrapper>
                        <S.MessageTime>11:06</S.MessageTime>
                    </S.MessageRow>

                    <S.DateDivider>29/10/2023 18:06</S.DateDivider>

                    <S.MessageRowUser>
                        <S.MessageTime>11:06</S.MessageTime>
                        <S.MessageBubbleRight>Hello</S.MessageBubbleRight>
                        <S.MessageAvatar src={avatarUser} alt="User" />
                    </S.MessageRowUser>
                </S.MessageContainer>
            </S.MainContent>

            <S.Footer>
                <S.ActionIcons>
                    <S.Icon><Image src={undo} preview={false} />Reply</S.Icon>
                    <S.Icon><Image src={edit} preview={false} />Edit</S.Icon>
                    <S.Icon><Image src={note} preview={false} />Note</S.Icon>
                    <S.Icon><Image src={ring} preview={false} />Reminder</S.Icon>
                    <S.Icon><Image src={shortCut} preview={false} />Shortcuts</S.Icon>
                    <S.Icon><Image src={tag} preview={false} />Knowledge Base</S.Icon>
                </S.ActionIcons>

                <S.InputArea>
                    <S.Input placeholder="Messages..." />
                    <S.InputIcons>
                        <S.InputIcon><Image src={file} preview={false} /></S.InputIcon>
                        <S.InputIcon><Image src={smile} preview={false} /></S.InputIcon>
                        <S.InputIcon><Image src={send} preview={false} /></S.InputIcon>
                    </S.InputIcons>
                </S.InputArea>
            </S.Footer>
        </S.Container>
    );
};

export default InboxDetail;

