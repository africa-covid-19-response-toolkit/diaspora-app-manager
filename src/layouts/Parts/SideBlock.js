import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Layout, Menu, Row } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  MessageOutlined,
  QuestionOutlined,
  TeamOutlined,
} from "@ant-design/icons";

import routeList from "../../routes";

function SideBlock({ location, history }) {
  const [currentLocation, setCurrentLocation] = useState("/");
  const collapsed = useSelector((state) => state.layout.sidebarCollapsed);
  const { authenticated, currentUserData } = useSelector(
    (store) => store.users
  );

  useEffect(() => {
    const { pathname } = location;
    if (currentLocation !== pathname) {
      setCurrentLocation(pathname);
    }
  }, [currentLocation, location]);

  const renderMenuItems = () =>
    routeList
      .filter((route) =>
        authenticated && currentUserData && currentUserData.role === "admin"
          ? route.hasMenu && route.enabled && route.name !== "Login"
          : authenticated
          ? route.hasMenu &&
            route.enabled &&
            route.name !== "Administration" &&
            route.hasMenu &&
            route.enabled &&
            route.name !== "Login"
          : route.hasMenu && route.enabled && route.name !== "Administration"
      )
      .map((menuItem) => {
        let menuIcon = <HomeOutlined />;
        switch (menuItem.icon) {
          case "home":
            menuIcon = <HomeOutlined />;
            break;
          case "administration":
            menuIcon = <TeamOutlined />;
            break;
          case "question":
            menuIcon = <QuestionOutlined />;
            break;
          case "message":
            menuIcon = <MessageOutlined />;
            break;
          default:
            menuIcon = <QuestionOutlined />;
        }

        return (
          <Menu.Item
            key={menuItem.to}
            onClick={() => {
              if (history) history.push(menuItem.to);
            }}
            icon={menuIcon}
          >
            {menuItem.name}
          </Menu.Item>
        );
      });

  const selectedKeys = currentLocation
    .split("/")
    .filter((p) => p !== "")
    .map((p) => `/${p}`);
  return (
    <Layout.Sider collapsible collapsed={collapsed} trigger={null}>
      <Row
        style={{ background: "#003c72", height: "64px", marginBottom: "40px" }}
        type="flex"
        align="middle"
        justify="center"
      >
        {!collapsed ? (
          <Link to="/">{/* <Image src={Logo} alt="Logo" /> */}</Link>
        ) : (
          <Link to="/home">
            <span
              style={{ color: "#fff", fontWeight: "bold", fontSize: "2em" }}
            >
              MU
            </span>
          </Link>
        )}
      </Row>
      <Menu theme="dark" selectedKeys={selectedKeys} mode="inline">
        {renderMenuItems()}
      </Menu>
    </Layout.Sider>
  );
}

export default withRouter(SideBlock);
