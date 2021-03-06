import React from "react";
import { Card, Row, Col, List } from "antd";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";

import { EditOutlined } from "@ant-design/icons";

import "../../App.css";

function MessagesList({ onEdit, currentUser }) {
  const messages = useSelector((store) => store.messages.messages);

  const languageLabel = (key) => {
    switch (key) {
      case "eng":
        return "English";
      case "amh":
        return "Amharic";
      case "orm":
        return "Oromifa";
      case "tig":
        return "Tigrigna";

      default:
        break;
    }
  };

  const buildMessage = (message, key) => {
    return (
      <>
        <Row>
          <strong>{languageLabel(key)}</strong>
        </Row>
        <Row>{message[key]}</Row>
      </>
    );
  };

  return (
    <div>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {},
          pageSize: 10,
        }}
        dataSource={messages}
        rowKey={(item) => item.id}
        renderItem={(item) => (
          <Card
            style={{ width: "100%", marginBottom: "15px" }}
            hoverable
            actions={
              !isEmpty(currentUser)
                ? [
                    <EditOutlined
                      type="edit"
                      key="edit"
                      onClick={(e) => {
                        e.preventDefault();
                        onEdit(item);
                      }}
                    />,
                  ]
                : []
            }
          >
            <Row>
              <Col>
                {Object.keys(item.text).map((key) =>
                  buildMessage(item.text, key)
                )}
              </Col>
            </Row>
          </Card>
        )}
      />
    </div>
  );
}

export default MessagesList;
