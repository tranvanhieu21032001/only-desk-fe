import { Col, Row } from 'antd';

import ChatboxMenus from '../../components/chatbox/chatbox-menus/ChatboxMenus';
import ChatboxContent from '../../components/chatbox/chatbox-content/ChatboxContent';

import * as S from './Chatbox.styles';

function Chatbox() {
  return (
    <S.ChatboxContainer>
      <Row gutter={[4, 4]}>
        <Col xs={24} xl={5}>
          <ChatboxMenus />
        </Col>
        <Col xs={24} xl={19}>
          <ChatboxContent />
        </Col>
      </Row>
    </S.ChatboxContainer>
  );
}

export default Chatbox; 