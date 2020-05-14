import React from "react";
import { Tabs } from "antd";

import Login from "./Login";

const { TabPane } = Tabs;

function Administration({ location, history, params }) {
  const callback = (key) => {
    history.push(`/administration/${key}`);
  };

  const tab = params && params.tab ? params.tab : "job-posts";

  switch (tab) {
    case "login":
      return <Login />;
    default:
      return <Login />;
  }
  // <Tabs tabPosition="left" defaultActiveKey={tab} onChange={callback}>
  //   <TabPane tab="Job Posts" key="job-posts">
  //     <Jobs />
  //   </TabPane>
  //   <TabPane tab="Events" key="events">
  //     <Events />
  //   </TabPane>
  //   <TabPane tab="Login" key="login">
  //     <Login />
  //   </TabPane>
  // </Tabs>
}

export default Administration;
