import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppSelector } from '@/shared/hooks';
import { BiillingMenusEnums } from '@/modules/settings/helpers/enums/billing';

// import BillingPlans from '../billing-plans/BillingPlans';
// import BillingCard from '../billing-card/BillingCard';
// import BillingInvoices from '../billing-invoices/BillingInvoices';

import * as S from './BillingContent.styles';
import { billingMenuType } from '@/modules/settings/constants/billiing.constant';
import BillingPlanSubscriptions from '../billing-plan-subscriptions/BillingPlanSubscriptions';
import Invoices from './invoices/Invoices';
import BillingCard from '../billing-card/BillingCard';

const BillingContent = () => {
  const [search] = useSearchParams();
  const { currentObjHistory }: any = useAppSelector(
    (state) => state?.historyRoute,
  );

  const typeBilling =
    currentObjHistory?.find((item: any) => item?.key === billingMenuType)
      ?.value ||
    search?.get(billingMenuType) ||
    BiillingMenusEnums.BILLING_PLANS;

  const renderBillingContent = useMemo(() => {
    switch (typeBilling) {
      case BiillingMenusEnums.BILLING_PLANS:
        return <BillingPlanSubscriptions />;
      case BiillingMenusEnums.BILLING_CARD:
        return <BillingCard />;
      case BiillingMenusEnums.BILLING_INVOICEs:
        return <Invoices />;
      //     return <BillingPlans />;
      //   case BiillingMenusEnums.BILLING_CARD:
      //     return <BillingCard />;
      //   case BiillingMenusEnums.BILLING_INVOICEs:
      //     return <BillingInvoices />;
      default:
        return <BillingPlanSubscriptions />;
    }
  }, [typeBilling]);

  return <S.BillingContainer>{renderBillingContent}</S.BillingContainer>;
};

export default BillingContent;
