import { Col, Image, Row } from 'antd';

import * as S from './PaymentMethod.styles';

import Typography from '@/shared/components/common/Typography';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import themeColors from '@/shared/styles/themes/default/colors';

import icCard from '@/assets/icons/billing/ic-card.svg';
import icPaypal from '@/assets/icons/billing/ic-paypal.svg';
import icTick from '@/assets/icons/billing/ic-tick-3.svg';
import icLock from '@/assets/icons/billing/ic-lock.svg';


const PaymentMethod = () => {
    return (
        <S.Container>
            <Row gutter={[24, 24]}>
                <Col xs={24} xl={18}>
                    <S.GroupMethod>
                        <S.PaymentMethod>
                            <Image src={icCard} preview={false} width={24} />
                            <Typography fontWeight={fontWeight.semiBold}>Pay using Credit Card</Typography>
                        </S.PaymentMethod>

                        <S.PaymentMethod>
                            <Image src={icPaypal} preview={false} width={24} />
                            <Typography fontWeight={fontWeight.semiBold}>Pay using PayPal</Typography>
                        </S.PaymentMethod>
                    </S.GroupMethod>
                </Col>

                <Col xs={24} xl={6}>
                    <S.OrderSummary>
                        <Typography fontWeight={fontWeight?.semiBold}>Order Summary</Typography>
                        <S.Title>Mini</S.Title>
                        <Typography variant='caption-small' padding='0 0 24px 0' fontWeight={fontWeight?.light}>admin@gmail.com</Typography>
                        <hr />
                        <S.SummaryRow>
                            <span>Today’s charge</span>
                            <S.Price>$45.00</S.Price>
                        </S.SummaryRow>
                        <hr />
                        <Typography color={themeColors?.primary} variant='caption-small' margin='24px 0'>
                            We’ll charge you now, to the prorated of the current billing period. Your subscription is billed monthly and will automatically renew for $45 on 04/06/2025. You can cancel anytime.
                        </Typography>
                        <S.GroupField>
                            <Image preview={false} src={icLock}/>
                            <Typography>This is a secured and encrypted payment</Typography>
                        </S.GroupField>
                         <S.GroupField>
                            <Image preview={false} src={icTick}/>
                            <Typography>This is a secured and encrypted payment</Typography>
                        </S.GroupField>
                         <S.GroupField>
                            <Image preview={false} src={icTick}/>
                            <Typography>This is a secured and encrypted payment</Typography>
                        </S.GroupField>
                    </S.OrderSummary>
                </Col>
            </Row>
        </S.Container>
    );
};

export default PaymentMethod;
