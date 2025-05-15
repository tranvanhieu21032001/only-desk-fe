import { Col, Row } from 'antd';

import AccountContent from '../../components/account/main/Account';
import AccountMenus from '../../components/account-menus/AccountMenus';

import * as S from './Account.styles';

function Account() {
  return (
    <S.AccountContainer>
      <Row gutter={[4, 4]}>
        <Col xs={24} xl={4}>
          <AccountMenus />
        </Col>
        <Col xs={24} xl={20}>
          <AccountContent />
        </Col>
      </Row>
    </S.AccountContainer>
  );
}

export default Account;
