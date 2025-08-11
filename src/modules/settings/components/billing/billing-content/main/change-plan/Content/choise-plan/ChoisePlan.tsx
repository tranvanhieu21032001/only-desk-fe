import { Image, Typography, Skeleton } from 'antd'; 
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
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
import { checkoutPlan, getAllPlans } from '@/modules/settings/api/billing';

const ChoisePlan = () => {
  const { t } = useTranslation('billing');
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingPlanKey, setLoadingPlanKey] = useState<string | null>(null); // state loading riêng cho nút Buy Now

  useEffect(() => {
    getAllPlans()
      .then((res) => {
        setPlans(res || []);
      })
      .catch((err) => {
        console.error('API getAllPlans error:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const labels = [
    { icon: icCheck, label: t('choice-plan.label-trial') },
    { icon: icFlat, label: t('choice-plan.label-flat') },
    { icon: icTime, label: t('choice-plan.label-cancel') },
  ];

  const handleBuyNow = (planKey: string) => {
    setLoadingPlanKey(planKey); // bật loading
    checkoutPlan(planKey)
      .then((res) => {
        const url = res?.url;
        if (url) {
          window.open(url, '_blank');
        } else {
          console.error('Không tìm thấy URL từ API checkout');
        }
      })
      .catch((err) => {
        console.error('Checkout lỗi:', err);
      })
      .finally(() => {
        setLoadingPlanKey(null); // tắt loading sau khi xong
      });
  };

  return (
    <S.PlanContainer>
      <S.GroupLabels>
        {loading
          ? labels.map((_, idx) => (
              <S.Label key={idx}>
                <Skeleton.Avatar active size="small" shape="circle" />
                <Skeleton.Input style={{ width: 100, marginLeft: 8 }} active />
              </S.Label>
            ))
          : labels.map((item, idx) => (
              <S.Label key={idx}>
                <Image preview={false} src={item.icon} />
                <Typography>{item.label}</Typography>
              </S.Label>
            ))}
      </S.GroupLabels>

      <S.PlanList>
        {loading
          ? Array.from({ length: 4 }).map((_, idx) => (
              <S.WrapPlanCard key={idx}>
                <S.PlanCard isDark={idx === 3}>
                  <Skeleton active paragraph={{ rows: 3 }} />
                  <Skeleton.Button style={{ width: 120, height: 32, marginTop: 12 }} active />
                  <Skeleton paragraph={{ rows: 4 }} active style={{ marginTop: 12 }} />
                </S.PlanCard>
              </S.WrapPlanCard>
            ))
          : plans.map((plan, index) => (
              <S.WrapPlanCard key={plan.key}>
                <S.PlanCard isDark={index === plans.length - 1}>
                  <S.PlanTitle>{plan.title}</S.PlanTitle>
                  <S.PlanDesc>{plan.desc}</S.PlanDesc>
                  <S.PlanPriceGroup>
                    <S.PlanPrice isDark={index === plans.length - 1}>
                      ${plan.priceMonth}
                    </S.PlanPrice>
                    <span>{t('choice-plan.month')}</span>
                  </S.PlanPriceGroup>

                  {index !== 0 ? (
                    <S.GroupButton>
                      {index === plans.length - 1 ? (
                        <Button
                          onClick={() => handleBuyNow(plan.key)}
                          type="default"
                          iconPosition="right"
                          icon={<Image preview={false} src={icTransferDark} />}
                          isLoading={loadingPlanKey === plan.key}
                        >
                          {t('choice-plan.buy-now')}
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleBuyNow(plan.key)}
                          type="primary"
                          iconPosition="right"
                          icon={<Image preview={false} src={icTransfer} />}
                          isLoading={loadingPlanKey === plan.key}
                        >
                          {t('choice-plan.buy-now')}
                        </Button>
                      )}
                    </S.GroupButton>
                  ) : (
                    <S.GroupButton>
                      <S.Placholder></S.Placholder>
                    </S.GroupButton>
                  )}

                  <hr />
                  <S.Details>
                    <S.DetailItem>
                      <Image
                        preview={false}
                        src={index !== plans.length - 1 ? icMinitor : icMinitorDark}
                      />
                      {plan.seats} {t('choice-plan.seats-included')}
                      <Image
                        preview={false}
                        src={index !== plans.length - 1 ? icInfor : icInforDark}
                      />
                    </S.DetailItem>
                    <S.DetailItem>
                      <Image
                        preview={false}
                        src={index !== plans.length - 1 ? icUser : icUserDark}
                      />
                      {plan.contacts} {t('choice-plan.profiles-included')}
                      <Image
                        preview={false}
                        src={index !== plans.length - 1 ? icInfor : icInforDark}
                      />
                    </S.DetailItem>
                  </S.Details>

                  <hr />
                  <S.SectionList isDark={index === plans.length - 1}>
                    {plan.features.map((feature: string, idx: number) => (
                      <li key={idx}>
                        <Image
                          preview={false}
                          src={index !== plans.length - 1 ? icCheck : icCheckDark}
                        />
                        {feature}
                      </li>
                    ))}
                  </S.SectionList>
                </S.PlanCard>
              </S.WrapPlanCard>
            ))}
      </S.PlanList>
    </S.PlanContainer>
  );
};

export default ChoisePlan;
