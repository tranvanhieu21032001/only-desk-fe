import React from 'react';
import { useTranslation } from 'react-i18next';

import * as S from './InVoiceDetail.styles';

interface Props {
    invoice: {
        dueDate: string;
        description: string;
        status: 'Paid' | 'Upcoming';
        total: string;
        paymentMethod?: string;
        transactionId?: string;
        fee?: string;
        bankDescription?: string;
        dateTime?: string;
    };
}

const InvoiceDetail: React.FC<Props> = ({ invoice }) => {
    const { t } = useTranslation('billing');

    return (
        <S.Container>
            {/* Amount Section */}
            <S.Section>
                <S.SectionTitle>{t('invoice-detail.amount-title')}</S.SectionTitle>
                <hr />
                <S.StyledTypography>-{invoice.total}</S.StyledTypography>
                <S.Content>Visa • • • • 1234</S.Content>
            </S.Section>

            {/* Account & Details Section */}
            <S.Section>
                <S.SectionTitle>{t('invoice-detail.details-title')}</S.SectionTitle>
                <hr />
                <div>
                    <S.Label>{t('invoice-detail.payment-method-label')}</S.Label>
                    <S.Content>{invoice.paymentMethod || 'Visa • • • • 1234'}</S.Content>
                </div>

                <hr />

                <div>
                    <S.Label>{t('invoice-detail.transaction-id-label')}</S.Label>
                    <S.Content>{invoice.transactionId || '123456789010'}</S.Content>
                </div>

                <hr />

                <div>
                    <S.Label>{t('invoice-detail.date-time-label')}</S.Label>
                    <S.Content>{invoice.dateTime || "26/05/2025 at 10:00"}</S.Content>
                </div>

                <hr />

                <div>
                    <S.Label>{t('invoice-detail.fee-label')}</S.Label>
                    <S.Content>{invoice.fee || '$0.00'}</S.Content>
                </div>

                <hr />

                <div>
                    <S.Label>{t('invoice-detail.bank-desc-label')}</S.Label>
                    <S.Content>{invoice.bankDescription || 'APEXLLC_V84G2H16D ・ REF #84664'}</S.Content>
                </div>
            </S.Section>
        </S.Container>
    );
};

export default InvoiceDetail;
