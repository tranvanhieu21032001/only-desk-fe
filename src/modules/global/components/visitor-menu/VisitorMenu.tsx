import React, { useState } from 'react';
import { Image } from 'antd';
import * as S from './VisitorMenu.styles';
import Typography from '@/shared/components/common/Typography';
import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';

import icFilter from '@/assets/icons/visitor/ic-filter.svg';
import icEmpty from '@/assets/icons/visitor/ic-empty.svg';
const VisitorMenu = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');

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

                <Image src={icEmpty} preview={false} />
                <Typography color={themeColors?.primary} variant="h5" fontWeight={fontWeight.semiBold}>
                    There are no visitors.
                </Typography>
                <Typography color={themeColors?.primary} fontWeight={fontWeight.light} textAlign='center'>
                    Nobody is currently browsing your website. Your visitors will appear here.
                </Typography>
            </S.MenuBody>
        </S.Container>
    );
};

export default VisitorMenu;
