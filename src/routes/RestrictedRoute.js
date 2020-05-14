import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spin, Row } from "antd";

function RestrictedRoute({ component: Component, ...rest }) {
  const user = useSelector(store => store.users);

  return (
    <Route
      {...rest}
      render={props =>
        user.authenticated ? (
          <Component {...props} />
        ) : user.fetching ? (
          <Row
            style={{ height: "100vh" }}
            type="flex"
            justify="center"
            align="middle"
          >
            <Spin size="large" tip="Authenticating..." />
          </Row>
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

export default RestrictedRoute;
