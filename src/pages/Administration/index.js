import React from "react";
import { Tabs } from "antd";

import Users from "./Users";

const { TabPane } = Tabs;

function Administration({ location, history, match }) {
  const callback = key => {
    history.push(`/administration/${key}`);
  };

  const tab = match.params && match.params.tab ? match.params.tab : "users";

  return (
    <Tabs tabPosition="left" defaultActiveKey={tab} onChange={callback}>
      <TabPane tab="Users" key="users">
        <Users history={history} />
      </TabPane>
      {/* <TabPane tab="User Groups" key="usergroups">
        <UserGroup />
      </TabPane>
      <TabPane tab="Roles" key="roles">
        <Roles />
      </TabPane>
      <TabPane tab="Devices" key="devices">
        <Devices />
      </TabPane>
      <TabPane tab="Locations" key="locations">
        <Locations />
      </TabPane> */}
    </Tabs>
  );
}

export default Administration;
