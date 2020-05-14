import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col, Drawer, Tabs } from "antd";
import { isEmpty } from "lodash";

import UserList from "./UserList";
import UserForm from "../../../forms/UserForm";
import InviteUsersFrom from "../../../forms/InviteUsersFrom";

import {
  fetchUsers,
  userUpdateFailed,
  userCreationFailed
} from "../../../redux/actions/users";

const userTabs = [
  "Faculty",
  "Doctoral Students",
  "Graduate Students",
  "Undergradute Students",
  "Alumni",
  "Inactive Users"
];

function Users(props) {
  const [addDrawerVisible, setAddDrawerVisible] = useState(false);
  const [inviterDrawerVisible, setInviteDrawerVisible] = useState(false);
  const [user, setUser] = useState({});
  const [drawerTitle, setDrawerTitle] = useState("Add new user");

  const { currentUser, usersList } = useSelector(store => store.users);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsersList = () => {
      dispatch(fetchUsers());
    };
    fetchUsersList();
  }, [dispatch, currentUser]);

  return (
    <Col>
      <Drawer
        title={<h2>{drawerTitle}</h2>}
        width={`60%`}
        destroyOnClose
        onClose={() => {
          setUser({});
          setAddDrawerVisible(false);
          dispatch(userCreationFailed());
        }}
        visible={addDrawerVisible}
        keyboard={false}
      >
        <UserForm
          user={user}
          onCancel={() => {
            dispatch(userCreationFailed());
            setAddDrawerVisible(false);
          }}
        />
      </Drawer>
      <Drawer
        title={<h2>{drawerTitle}</h2>}
        width={`60%`}
        destroyOnClose
        onClose={() => {
          setUser({});
          setInviteDrawerVisible(false);
        }}
        visible={inviterDrawerVisible}
        keyboard={false}
      >
        <InviteUsersFrom
          user={user}
          onCancel={() => setInviteDrawerVisible(false)}
        />
      </Drawer>
      <Row type="flex" justify="end" gutter={10} style={{ marginBottom: 20 }}>
        <Col>
          <Button
            size="large"
            type="primary"
            icon="plus"
            onClick={e => {
              setDrawerTitle("Add new user");
              setUser({});
              setAddDrawerVisible(true);
            }}
          >
            Add New User
          </Button>
        </Col>
        {/* <Col>
          <Button
            size="large"
            type="primary"
            icon="plus"
            onClick={e => {
              setDrawerTitle("Invite users");
              setUser({});
              setInviteDrawerVisible(true);
            }}
          >
            Invite Users
          </Button>
        </Col> */}
      </Row>
      <Row>
        <Tabs defaultActiveKey="1">
          {userTabs &&
            userTabs.map(tab => {
              return (
                <Tabs.TabPane tab={tab} key={tab}>
                  <UserList
                    tab={tab}
                    onEdit={user => {
                      if (user) {
                        setUser(user);
                        setDrawerTitle(
                          `Edit - ${user.firstName} ${user.lastName}`
                        );
                        setAddDrawerVisible(true);
                      }
                    }}
                    history={props.history}
                  />
                </Tabs.TabPane>
              );
            })}
        </Tabs>
      </Row>
    </Col>
  );
}

export default Users;
