import { Col, Row } from 'antd';

import * as S from './Billing.styles';
import BillingMenus from '../../components/billing/billing-menus/BillingMenus';
import BillingContent from '../../components/billing/billing-content/main/BillingContent';

function Billing() {
    return (
        <S.ChatboxContainer>
            <Row gutter={[4, 4]}>
                <Col xs={24} xl={5}>
                    <BillingMenus />
                </Col>
                <Col xs={24} xl={19}>
                   <BillingContent/>
                </Col>
            </Row>
        </S.ChatboxContainer>
    );
}

export default Billing; 