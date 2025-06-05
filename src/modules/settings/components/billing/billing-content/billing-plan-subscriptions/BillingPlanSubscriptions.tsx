import fontWeight from '@/shared/styles/themes/default/fontWeight';
import * as S from './BillingPlanSubscriptions.styles';
import themeColors from '@/shared/styles/themes/default/colors';
import Typography from '@/shared/components/common/Typography';
import { useTranslation } from 'react-i18next';
import { Image, Tag } from 'antd';
import icWarning from '@/assets/icons/billing/ic-warning.svg';
import Button from '@/shared/components/common/Button';

const BillingPlanSubscriptions = () => {
    const { t } = useTranslation('billing');

    return (
        <S.BillingInformationContainer>
            <S.BillingInformation>
                <S.BillingInformationLabel>
                    <Typography
                        fontWeight={fontWeight?.semiBold}
                        color={themeColors?.secondaryDarker}
                    >
                        {t('billing-menu.plan-subcriptions')}
                    </Typography>
                </S.BillingInformationLabel>

                {/* Warning Box */}
                <S.PlansWarning>
                    <S.WraperSection>
                        <Image src={icWarning} preview={false} />
                        <Typography>
                            {t('billing-menu.warning-content')}
                        </Typography>
                    </S.WraperSection>
                    <S.BoxUnderLine>{t('billing-menu.go-to-billing-settings')}</S.BoxUnderLine>
                </S.PlansWarning>

                {/* Plan Detail */}
                <S.PlansBody>
                    <S.BillingInformationSubLabel>
                        <Typography
                            fontWeight={fontWeight?.semiBold}
                            color={themeColors?.secondaryDarker}
                        >
                            {t('billing-menu.manage-all-workspace-plans')}
                        </Typography>
                    </S.BillingInformationSubLabel>

                    <S.PlanProfile>
                        <S.WraperPlanProfile>
                            <S.Avatar>
                                <img
                                    src="https://placehold.co/400"
                                    alt="avatar"
                                    style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                                />
                            </S.Avatar>

                            <S.UserDetail>
                                <S.WraperSection> <Typography fontWeight={fontWeight?.semiBold}>Van Hieu</Typography>
                                    <Tag color="red">Free</Tag>
                                    <Tag color="green">• Active</Tag></S.WraperSection>
                                <Typography fontWeight={fontWeight.light} color={themeColors.newtralDark}>{t('billing-menu.exp-date')} 15/05/2025</Typography>
                                <Typography fontWeight={fontWeight.light} color={themeColors.newtralDark}>{t('billing-menu.billing-owner')}: None</Typography>
                            </S.UserDetail>
                        </S.WraperPlanProfile>

                        <Button type="primary" style={{ width: 'unset' }}>{t('billing-menu.change-plan')}</Button>
                    </S.PlanProfile>

                      <S.PlanProfile>
                        <S.WraperPlanProfile>
                            <S.Avatar>
                                <img
                                    src="https://placehold.co/400"
                                    alt="avatar"
                                    style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                                />
                            </S.Avatar>

                            <S.UserDetail>
                                <S.WraperSection> <Typography fontWeight={fontWeight?.semiBold}>Van Hieu</Typography>
                                    <Tag color="red">Free</Tag>
                                    <Tag color="green">• Active</Tag></S.WraperSection>
                                <Typography fontWeight={fontWeight.light} color={themeColors.newtralDark}>{t('billing-menu.exp-date')} 15/05/2025</Typography>
                                <Typography fontWeight={fontWeight.light} color={themeColors.newtralDark}>{t('billing-menu.billing-owner')}: None</Typography>
                            </S.UserDetail>
                        </S.WraperPlanProfile>

                        <Button type="primary" style={{ width: 'unset' }}>{t('billing-menu.change-plan')}</Button>
                    </S.PlanProfile>

                </S.PlansBody>
            </S.BillingInformation>
        </S.BillingInformationContainer>
    );
};

export default BillingPlanSubscriptions;
