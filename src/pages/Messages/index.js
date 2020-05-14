import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Drawer, Button, PageHeader } from "antd";
import MessagesList from "./MessagesList";
import MessagesForm from "../../forms/MessagesForm";
import { isEmpty } from "lodash";
import { CheckOutlined, PlusOutlined } from "@ant-design/icons";

import {
  getMessages,
  messagesCreationFailed,
} from "../../redux/actions/messages";
// import { getTags } from "../../redux/actions/tags";

function Messages() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [message, setMessage] = useState({});
  const [drawerTitle, setDrawerTitle] = useState("Add new message");
  const { currentUser } = useSelector((store) => store.users);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchEvents = () => {
      dispatch(getMessages());
    };
    fetchEvents();
  }, [dispatch, currentUser]);

  return (
    <Col>
      <Drawer
        title={<h2>{drawerTitle}</h2>}
        width={`60%`}
        destroyOnClose
        onClose={() => {
          setMessage({});
          setDrawerVisible(false);
          dispatch(messagesCreationFailed());
        }}
        visible={drawerVisible}
        keyboard={false}
        maskClosable={false}
      >
        <MessagesForm
          message={message}
          onCancel={() => {
            dispatch(messagesCreationFailed());
            setDrawerVisible(false);
          }}
          onDelete={(message) => {
            if (message) {
              //   dispatch(deleteLocation(location));
              setDrawerVisible(false);
            }
          }}
        />
      </Drawer>

      <Col>
        <Row type="flex" justify="end" style={{ marginBottom: 20 }}>
          <Col span={12}>
            <PageHeader title="Messages" />
          </Col>
          <Col span={12}>
            <Row type="flex" justify="end" style={{ marginBottom: 20 }}>
              {!isEmpty(currentUser) && (
                <Button
                  size="large"
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={(e) => {
                    setDrawerTitle("Add new message");
                    setMessage({});
                    setDrawerVisible(true);
                  }}
                >
                  Add New Message
                </Button>
              )}
            </Row>
          </Col>
        </Row>
      </Col>

      <Row>
        <MessagesList
          onEdit={(message) => {
            if (message) {
              setMessage(message);
              setDrawerTitle(`Edit - ${message.text.eng}`);
              setDrawerVisible(true);
            }
          }}
          currentUser={currentUser}
          //   onDelete={location => {
          //     if (location) {
          //       dispatch(deleteLocation(location));
          //     }
          //   }}
        />
      </Row>
    </Col>
  );
}

export default Messages;
