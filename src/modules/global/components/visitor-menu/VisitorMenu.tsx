import { useState } from 'react';
import { Image, Dropdown } from 'antd';
import * as S from './VisitorMenu.styles';
import Typography from '@/shared/components/common/Typography';
import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';

import icFilter from '@/assets/icons/visitor/ic-filter.svg';
import icAvatar from '@/assets/icons/visitor/ic-avatar.svg';
import icThreeDot from '@/assets/icons/visitor/ic-threedot.svg';
import icMagicPen from "@/assets/icons/visitor/ic-magicpen.svg"
import icMessage from "@/assets/icons/visitor/ic-message.svg";

const VisitorMenu = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');

    const menu = (
        <S.StyledMenu
            items={[
                {
                    key: 'magic',
                    icon: <Image preview={false} src={icMagicPen} />,
                    label: 'MagicBrowser',
                },
                {
                    key: 'conversation',
                    icon: <Image preview={false} src={icMessage} />,
                    label: 'Conversation',
                },
            ]}
            onClick={(info) => {
                if (info.key === 'magic') {
                    console.log('MagicBrowser clicked');
                } else if (info.key === 'conversation') {
                    console.log('Conversation clicked');
                }
            }}
        />
    );

    return (
        <S.Container>
            <S.GroupActions>
                <S.Input
                    type="text"
                    placeholder="Search visitors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <S.Filter>
                    <Image preview={false} src={icFilter} width={16} height={16} />
                    Filter
                </S.Filter>
                <S.Select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="all">All</option>
                    <option value="new">New</option>
                </S.Select>
            </S.GroupActions>

            <S.MenuBody>
                {/* 
                <Image src={icEmpty} preview={false} />
                <Typography color={themeColors?.primary} variant="h5" fontWeight={fontWeight.semiBold}>
                    There are no visitors.
                </Typography>
                <Typography color={themeColors?.primary} fontWeight={fontWeight.light} textAlign='center'>
                    Nobody is currently browsing your website. Your visitors will appear here.
                </Typography> 
                */}

                <S.WrapperSection>
                    <S.Avatar>
                        <Image preview={false} src={icAvatar} />
                    </S.Avatar>

                    <S.BodySection>
                        <Typography color={themeColors?.primary} fontWeight={fontWeight?.light}>
                            Admin 2
                        </Typography>
                        <S.OneLineText>
                            My blog - Just another Wordpress. My blog - Just another Wordpress
                        </S.OneLineText>
                    </S.BodySection>

                    <Dropdown overlay={menu} trigger={['click']} placement="bottomRight" arrow>
                        <S.ThreeDotWrapper>
                            <Image preview={false} src={icThreeDot} />
                        </S.ThreeDotWrapper>
                    </Dropdown>
                </S.WrapperSection>
            </S.MenuBody>
        </S.Container>
    );
};

export default VisitorMenu;
