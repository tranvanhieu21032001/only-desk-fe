import { Col, Row } from "antd";

import Plugins from "../Plugins";
import Categories from "../Categories";

import * as S from "./all-plugins.styles";

function AllPlugins() {
    return (
        <S.AllPluginsWrap>
            <Row gutter={[4, 4]}>
                <Col xs={24} xl={4}>
                    <Categories />
                </Col>
                <Col xs={24} xl={20} >
                    <Plugins />
                </Col>
            </Row>
        </S.AllPluginsWrap >
    )
}

export default AllPlugins