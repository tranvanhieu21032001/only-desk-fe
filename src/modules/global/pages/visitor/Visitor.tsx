import { Col, Row } from 'antd';
import * as S from './Visitor.styles';
import VisitorMenu from '../../components/visitor-menu/VisitorMenu';
import VisitorContent from '../../components/visitor-content/VisitorContent';

const Visitor = () => {
  return (
  <S.VisitorContainer>
        <Row gutter={[4, 4]}>
          <Col xs={24} xl={7}>
            <VisitorMenu/>
          </Col>
          <Col xs={24} xl={17}>
           <VisitorContent/>
          </Col>
        </Row>
      </S.VisitorContainer>
  )
}

export default Visitor
