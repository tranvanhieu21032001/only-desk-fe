import React from 'react';
import { Drawer } from 'antd';
import { GlobalDrawerWrapperStyles } from './InvoiceDrawer.styles';
import * as S from './InvoiceDrawer.styles';
import Typography from '@/shared/components/common/Typography';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import themeColors from '@/shared/styles/themes/default/colors';

interface InvoiceAdmin {
  key: string;
  invoiceId: string;
  workspace: string;
  websiteURL: string;
  amount: string;
  status: 'Paid' | 'Upcoming';
  paidAt: string;
  provider: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  invoice: InvoiceAdmin | null;
}

const InvoiceDrawer: React.FC<Props> = ({ open, onClose, invoice }) => {
  return (
    <>
      <GlobalDrawerWrapperStyles />
      <Drawer
        title={
          <>
            <Typography
              fontWeight={fontWeight?.semiBold}
              variant="body-text-larger"
            >
              Invoice Details
            </Typography>
            <Typography
              fontWeight={fontWeight?.light}
              color={themeColors?.newtralLight}
            >
              Invoice information and payment details.
            </Typography>
          </>
        }
        placement="right"
        width={512}
        onClose={onClose}
        open={open}
      >
        {invoice && (
          <S.Container>
            <S.Section>
              <S.SectionTitle>Invoice Detail</S.SectionTitle>
              <hr />

              <div>
                <S.Label>Invoice ID</S.Label>
                <S.Content>{invoice.invoiceId}</S.Content>
              </div>
              <hr />

              <div>
                <S.Label>Workspace</S.Label>
                <S.Content>{invoice.workspace}</S.Content>
              </div>
              <hr />

              <div>
                <S.Label>Website</S.Label>
                <S.Content>
                  {invoice.websiteURL !== '—' ? (
                    <a
                      href={`https://${invoice.websiteURL}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {invoice.websiteURL}
                    </a>
                  ) : (
                    '—'
                  )}
                </S.Content>
              </div>
              <hr />

              <div>
                <S.Label>Status</S.Label>
                <S.Content>{invoice.status}</S.Content>
              </div>
              <hr />

              <div>
                <S.Label>Paid At</S.Label>
                <S.Content>{invoice.paidAt}</S.Content>
              </div>
              <hr />

              <div>
                <S.Label>Provider</S.Label>
                <S.Content>{invoice.provider}</S.Content>
              </div>
              <hr />

              <div>
                <S.Label>Amount</S.Label>
                <S.Content>{invoice.amount}</S.Content>
              </div>
            </S.Section>
          </S.Container>
        )}
      </Drawer>
    </>
  );
};

export default InvoiceDrawer;
