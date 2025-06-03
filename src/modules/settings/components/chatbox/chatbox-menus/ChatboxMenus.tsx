import React from 'react';
import { useSearchParams } from 'react-router-dom';

import Typography from '@/shared/components/common/Typography';

import * as S from './ChatboxMenus.styles';

const chatboxMenus = [
    { key: 'customize', label: 'Customize your inbox' },
    { key: 'sub-inboxes', label: 'Sub-inboxes' },
    { key: 'operator-routing', label: 'Operator routing' },
    { key: 'auto-triage', label: 'Automatic triage' },
    { key: 'message-shortcuts', label: 'Message shortcuts' },
];

const ChatboxMenus: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const type = searchParams.get('type') || 'message-shortcuts';

    const handleMenuClick = (key: string) => {
        setSearchParams({ type: key });
    };

    return (
        <S.ChatboxWorkspaceContainer>
            {chatboxMenus.map((item) => (
                <S.ChatboxMenuItem
                    key={item.key}
                    $isActive={type === item.key}
                    onClick={() => handleMenuClick(item.key)}
                >
                    <Typography>{item.label}</Typography>
                </S.ChatboxMenuItem>
            ))}
        </S.ChatboxWorkspaceContainer>
    );
};

export default ChatboxMenus; 