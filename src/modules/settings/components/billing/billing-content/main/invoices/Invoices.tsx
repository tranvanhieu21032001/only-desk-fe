import { useState, useEffect } from 'react';
import * as S from "./Invoices.styles";
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import themeColors from '@/shared/styles/themes/default/colors';
import Typography from '@/shared/components/common/Typography';
import NoInVoices from './content/noinvoices/NoInvoices';
import AllInvoices from './content/allinvoice/AllInvoices';
const Invoices = () => {
  const [invoices, setInvoices] = useState<any[] | null>(null);

  useEffect(() => {
    const fetchInvoices = async () => {

      setTimeout(() => {
        setInvoices([]);
      }, 500);
    };

    fetchInvoices();
  }, []);

  const renderContent = () => {
    if (invoices === null || invoices.length === 0) {
      return <AllInvoices/>;
    } else {
      return <NoInVoices />;
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
