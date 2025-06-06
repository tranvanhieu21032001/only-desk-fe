import { Image, Typography } from 'antd';
import * as S from './ChoisePlan.styles';
import Button from '@/shared/components/common/Button';
import icCheck from '@/assets/icons/billing/ic-tick-circle2.svg';
import icCheckDark from '@/assets/icons/billing/ic-tick-circle-dark.svg';
import icFlat from '@/assets/icons/billing/ic-flat.svg';
import icTime from '@/assets/icons/billing/ic-time.svg';
import icTransfer from '@/assets/icons/billing/ic-transfer.svg';
import icTransferDark from '@/assets/icons/billing/ic-transfer-dark.svg';

import icMinitor from '@/assets/icons/billing/ic-monitor.svg';
import icUser from '@/assets/icons/billing/ic-user.svg';
import icInfor from '@/assets/icons/billing/ic-info.svg';

import icMinitorDark from '@/assets/icons/billing/ic-monitor-dark.svg';
import icUserDark from '@/assets/icons/billing/ic-user-dark.svg';
import icInforDark from '@/assets/icons/billing/ic-info-dark.svg';


const ChoisePlan = ({ setActiveStep }: { setActiveStep: (step: number) => void }) => {
    const labels = [
        { icon: icCheck, label: '14 days trial' },
        { icon: icFlat, label: 'Flat pricing' },
        { icon: icTime, label: 'Cancel anytime' },
    ];

    const handleBuyNow = () => {
        setActiveStep(1);
    };

    const plans = [
        {
            title: "Free",
            desc: "For solopreneurs and entrepreneurs. Your first shared inbox",
            price: "0",
            sections: [
                "Chat widget",
                "Shared inbox",
                "Contact form",
                "Mobile applications",
                "Unlimited conversations",
                "E-Commerce integrations"
            ]
        },
        {
            title: "Mini",
            desc: "For early-stage companies who want to improve their customer service.",
            price: "45",
            sections: [
                "Chat widget",
                "Shared inbox",
                "Contact form",
                "Mobile applications",
                "Unlimited conversations",
                "E-Commerce integrations"
            ]
        },
        {
            title: "Essentials",
            desc: "For small companies requiring a full featured customer support platform.",
            price: "95",
            sections: [
                "Chat widget",
                "Shared inbox",
                "Contact form",
                "Mobile applications",
                "Unlimited conversations",
                "E-Commerce integrations"
            ]
        },
        {
            title: "Plus",
            desc: "For medium-sized businesses looking for an AI-powered omnichannel customer support software, plus all our features.",
            price: "295",
            sections: [
                "Chat widget",
                "Shared inbox",
                "Contact form",
                "Mobile applications",
                "Unlimited conversations",
                "E-Commerce integrations"
            ]
        },
    ];
    return (
        <>
            <S.PlanContainer>
                <S.GroupLabels>
                    {labels.map((item, idx) => (
                        <S.Label key={idx}>
                            <Image preview={false} src={item.icon} />
                            <Typography>{item.label}</Typography>
                        </S.Label>
                    ))}
                </S.GroupLabels>

                <S.PlanList>
                    {plans.map((plan, index) => (
                        <S.WrapPlanCard>
                            <S.PlanCard key={index} isDark={index === plans.length - 1}>
                                <S.PlanTitle>{plan.title}</S.PlanTitle>
                                <S.PlanDesc>{plan.desc}</S.PlanDesc>
                                <S.PlanPriceGroup>
                                    <S.PlanPrice isDark={index === plans.length - 1}>${plan.price}</S.PlanPrice>
                                    <span>/month</span>
                                </S.PlanPriceGroup>
                                {index !== 0 ? (
                                    <S.GroupButton>
                                        {
                                            index === plans.length - 1 ? <Button
                                                onClick={handleBuyNow}
                                                type='default'
                                                iconPosition='right'
                                                icon={<Image preview={false} src={icTransferDark} />}
                                            >
                                                Buy now
                                            </Button> : <Button
                                                onClick={handleBuyNow}
                                                type='primary'
                                                iconPosition='right'
                                                icon={<Image preview={false} src={icTransfer} />}
                                            >
                                                Buy now
                                            </Button>
                                        }
                                    </S.GroupButton>
                                ) : (
                                    <S.GroupButton>
                                        <S.Placholder></S.Placholder>
                                    </S.GroupButton>
                                )}
                                <hr />
                                <S.Details>
                                    <S.DetailItem>
                                        {index !== plans.length - 1 ? <Image preview={false} src={icMinitor} /> : <Image preview={false} src={icMinitorDark} />}
                                        2 seat included  {index !== plans.length - 1 ? <Image preview={false} src={icInfor} /> : <Image preview={false} src={icInforDark} />}
                                    </S.DetailItem>
                                    <S.DetailItem>
                                        {index !== plans.length - 1 ? <Image preview={false} src={icUser} /> : <Image preview={false} src={icUserDark} />}
                                        100 user profiles included {index !== plans.length - 1 ? <Image preview={false} src={icInfor} /> : <Image preview={false} src={icInforDark} />}
                                    </S.DetailItem>
                                </S.Details>
                                <hr />
                                <S.SectionList isDark={index === plans.length - 1}>
                                    {plan.sections.map((section, idx) => (
                                        <li key={idx}>
                                            {index !== plans.length - 1 ? <Image preview={false} src={icCheck} /> : <Image preview={false} src={icCheckDark} />}
                                            {section}
                                        </li>
                                    ))}
                                </S.SectionList>
                            </S.PlanCard>
                        </S.WrapPlanCard>
                    ))}

                </S.PlanList>
            </S.PlanContainer>
        </>
    )
}

export default ChoisePlan
