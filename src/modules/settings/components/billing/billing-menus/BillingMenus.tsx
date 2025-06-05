import React from 'react';
import { useSearchParams } from 'react-router-dom';

import Typography from '@/shared/components/common/Typography';

import * as S from './BillingMenus.styles';
import { useTranslation } from 'react-i18next';


const BillingMenus: React.FC = () => {
     const { t } = useTranslation('billing');
    const billingMenus = [
        { key: 'plans-&-subcriptions', label: t('billing-menu.plan-subcriptions')},
        { key: 'card', label: t('billing-menu.card') },
        { key: 'invoices', label: t('billing-menu.invoices')},
    ];
    const [searchParams, setSearchParams] = useSearchParams();
    const type = searchParams.get('type') || 'message-shortcuts';

    const handleMenuClick = (key: string) => {
        setSearchParams({ type: key });
    };

    return (
        <S.BillingWorkspaceContainer>
            {billingMenus.map((item) => (
                <S.BillingMenuItem
                    key={item.key}
                    $isActive={type === item.key}
                    onClick={() => handleMenuClick(item.key)}
                >
                    <Typography>{item.label}</Typography>
                </S.BillingMenuItem>
            ))}
        </S.BillingWorkspaceContainer>
    );
};

export default BillingMenus; 