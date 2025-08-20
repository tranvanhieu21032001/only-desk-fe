import { useState, useEffect } from 'react';
import * as S from "./Invoices.styles";
import { Skeleton } from 'antd';
import NoInvoices from '../../components/invoices/noinvoices/NoInvoices';
import AllInvoices from '../../components/invoices/allinvoice/AllInvoices';
import webLocalStorage from '@/shared/utils/webLocalStorage';
import { constants } from '@/core/settings';
import { getAdminInvoices } from '../../api/admin';

const InvoicesAdmin = () => {
  const currentWorkspace = webLocalStorage.get(constants.CURRENT_WORKSPACE);
  console.log("currentWorkspace", currentWorkspace);

  const [invoices, setInvoices] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true);

        if (!currentWorkspace?.rawId) {
          console.warn("No workspace found");
          setInvoices([]);
          return;
        }
        const response = await getAdminInvoices(currentWorkspace.rawId, 1, 20);
        console.log('Invoices API response:', response);
        setInvoices(response?.data || []);
        
      } catch (error) {
        console.error('Failed to fetch invoices:', error);
        setInvoices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [currentWorkspace?._id]);

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
      return <NoInvoices />;
    } else {
      return <AllInvoices invoices={invoices} />;
    }
  };

  return (
    <S.InvoicesInformationContainer>
      <S.InvoicesInformation>
        {renderContent()}
      </S.InvoicesInformation>
    </S.InvoicesInformationContainer>
  );
};

export default InvoicesAdmin;
