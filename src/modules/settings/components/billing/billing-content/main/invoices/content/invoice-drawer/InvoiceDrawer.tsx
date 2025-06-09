import React from 'react';
import { Drawer } from 'antd';
import InvoiceDetail from './InvoiceDetail';
import { GlobalDrawerWrapperStyles } from './InvoiceDrawer.styles';
import Typography from '@/shared/components/common/Typography';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import themeColors from '@/shared/styles/themes/default/colors';

interface Props {
    open: boolean;
    onClose: () => void;
    invoice: {
        dueDate: string;
        description: string;
        status: 'Paid' | 'Upcoming';
        total: string;
    } | null;
}

const InvoiceDrawer: React.FC<Props> = ({ open, onClose, invoice }) => {
    return (
        <>
            <GlobalDrawerWrapperStyles />
            <Drawer
                title={
                    <>
                        <Typography fontWeight={fontWeight?.semiBold} variant='body-text-larger' >Invoice Details</Typography>
                        <Typography fontWeight={fontWeight?.light} color={themeColors?.newtralLight}>Insert page description here.</Typography>

                    </>
                }
                placement="right"
                width={512}
                onClose={onClose}
                open={open}
            >
                {invoice && <InvoiceDetail invoice={invoice} />}
            </Drawer>
        </>
    );
};

export default InvoiceDrawer;
