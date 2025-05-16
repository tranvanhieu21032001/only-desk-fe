import { Col, Row } from 'antd';

import WorkspaceMenus from '../../components/workspaces/workspace-menus/WorkspaceMenus';
import WorkspaceContent from '../../components/workspaces/workspace-content/main/WorkspaceContent';

import * as S from './Workspace.styles';

function Workspace() {
  return (
    <S.WorkspaceContainer>
      <Row gutter={[4, 4]}>
        <Col xs={24} xl={5}>
          <WorkspaceMenus />
        </Col>
        <Col xs={24} xl={19}>
          <WorkspaceContent />
        </Col>
      </Row>
    </S.WorkspaceContainer>
  );
}

export default Workspace;
