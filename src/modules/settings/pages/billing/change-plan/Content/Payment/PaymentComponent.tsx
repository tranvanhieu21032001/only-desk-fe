import { useState } from 'react';
import { Col, Image, Row } from 'antd';

import * as S from './PaymentComponent.styles';

import Typography from '@/shared/components/common/Typography';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import themeColors from '@/shared/styles/themes/default/colors';

import icCard from '@/assets/icons/billing/ic-card.svg';
import icCardLight from '@/assets/icons/billing/ic-card-light.svg';
import icPaypal from '@/assets/icons/billing/ic-paypal.svg';
import icTick from '@/assets/icons/billing/ic-tick-3.svg';
import icLock from '@/assets/icons/billing/ic-lock.svg';
import CreditCardMethod from './payment-method/CreditCardMethod';

const PaymentComponent = () => {
    const [activeMethod, setActiveMethod] = useState<'card' | 'paypal' | null>(null);

    return (
        <S.Container>
            <Row gutter={[24, 24]}>
                <Col xs={24} xl={18}>
                    <S.Wrapper>
                        <S.GroupMethod>

                            <S.PaymentMethod
                                isActive={activeMethod === 'card'}
                                onClick={() => setActiveMethod('card')}
                            >
                                {activeMethod !== 'card' ? <Image src={icCard} preview={false} width={30} height={30} />: <Image src={icCardLight} preview={false} width={30} height={30} />}
                                <Typography
                                    fontWeight={fontWeight.semiBold}
                                    color={activeMethod === 'card' ? themeColors?.newtralLightest : undefined}
                                >
                                    Pay using Credit Card
                                </Typography>
                            </S.PaymentMethod>

                            <S.PaymentMethod
                                isActive={activeMethod === 'paypal'}
                                onClick={() => setActiveMethod('paypal')}
                            >
                                <Image src={icPaypal} preview={false} width={30} height={30} />
                                <Typography
                                    fontWeight={fontWeight.semiBold}
                                    color={activeMethod === 'paypal' ? themeColors?.newtralLightest : undefined}
                                >
                                    Pay using PayPal
                                </Typography>
                            </S.PaymentMethod>
                        </S.GroupMethod>

                        {/* Render selected payment method */}
                        <S.PaymentContent>
                            {activeMethod === 'card' && <CreditCardMethod />}
                            {activeMethod === 'paypal' && (
                                <Typography>PayPal payment method coming soon...</Typography>
                            )}
                        </S.PaymentContent>
                    </S.Wrapper>
                </Col>

                <Col xs={24} xl={6}>
                    <S.OrderSummary>
                        <Typography fontWeight={fontWeight?.semiBold}>Order Summary</Typography>
                        <S.Title>Mini</S.Title>
                        <Typography
                            variant="caption-small"
                            padding="0 0 24px 0"
                            fontWeight={fontWeight?.light}
                        >
                            admin@gmail.com
                        </Typography>
                        <hr />
                        <S.SummaryRow>
                            <span>Today’s charge</span>
                            <S.Price>$45.00</S.Price>
                        </S.SummaryRow>
                        <hr />
                        <Typography
                            color={themeColors?.primary}
                            variant="caption-small"
                            margin="24px 0"
                        >
                            We’ll charge you now, to the prorated of the current billing period. Your subscription is billed monthly and will automatically renew for $45 on 04/06/2025. You can cancel anytime.
                        </Typography>

                        <S.GroupField>
                            <Image preview={false} src={icLock} />
                            <Typography>This is a secured and encrypted payment</Typography>
                        </S.GroupField>
                        <S.GroupField>
                            <Image preview={false} src={icTick} />
                            <Typography>All transactions are encrypted and safe</Typography>
                        </S.GroupField>
                        <S.GroupField>
                            <Image preview={false} src={icTick} />
                            <Typography>We don’t store any payment information</Typography>
                        </S.GroupField>
                    </S.OrderSummary>
                </Col>
            </Row>
        </S.Container>
    );
};

export default PaymentComponent;
