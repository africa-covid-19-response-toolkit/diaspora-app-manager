import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Row, Col } from "antd";
import { isEmpty } from "lodash";

import { sidebarCollapseStateChanged } from "../../redux/actions/layout";
import HeaderUserProfile from "./HeaderUserProfile";

const { Header } = Layout;

const HeaderBlock = () => {
  const { currentUser } = useSelector((store) => store.users);

  return (
    <Header style={{ background: "#007771", padding: "0 20px 0 0" }}>
      <Row type="flex" align="middle" gutter={16}>
        <Col span={18}>
          <div>
            <h1
              style={{
                textAlign: "center",
                color: "#000000",
                fontSize: "30px",
              }}
            >
              Diaspora App Manager
            </h1>
          </div>
        </Col>
        <Col span={4} style={{ paddingBottom: "15px" }}>
          <Row type="flex" justify="end">
            {!isEmpty(currentUser) ? <HeaderUserProfile /> : null}
          </Row>
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderBlock;
