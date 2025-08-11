import { useState, useEffect } from 'react';
import * as S from "./Invoices.styles";
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import themeColors from '@/shared/styles/themes/default/colors';
import Typography from '@/shared/components/common/Typography';
import NoInVoices from './content/noinvoices/NoInvoices';
import AllInvoices from './content/allinvoice/AllInvoices';
import { getInvoices } from '@/modules/settings/api/billing';
import { Skeleton } from 'antd';

const Invoices = () => {
  const [invoices, setInvoices] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true);
        const response = await getInvoices();
        console.log('Invoices API response:', response);
        setInvoices(response || []);
      } catch (error) {
        console.error('Failed to fetch invoices:', error);
        setInvoices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <S.SkeletonWrapper>
          {[...Array(3)].map((_, i) => (
            <Skeleton
              key={i}
              active
              paragraph={{ rows: 2 }}
              title={false}
              style={{ marginBottom: 16 }}
            />
          ))}
        </S.SkeletonWrapper>
      );
    }

    if (!invoices || invoices.length === 0) {
      return <NoInVoices />;
    } else {
      return <AllInvoices invoices={invoices} />;
    }
  };

  return (
    <S.InvoicesInformationContainer>
      <S.InvoicesInformation>
        <S.InvoicesInformationLabel>
          <Typography
            fontWeight={fontWeight.semiBold}
            color={themeColors.secondaryDarker}
          >
            Invoices
          </Typography>
        </S.InvoicesInformationLabel>

        {renderContent()}
      </S.InvoicesInformation>
    </S.InvoicesInformationContainer>
  );
};

export default Invoices;
