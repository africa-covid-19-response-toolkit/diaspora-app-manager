import React from "react";
import { Card, Row, Col, Tag, Descriptions, List } from "antd";
import { useSelector } from "react-redux";
import moment from "moment";
import { isEmpty } from "lodash";
import { EditOutlined } from "@ant-design/icons";

import "../../App.css";

function QuestionsList({ onEdit, currentUser }) {
  const questions = useSelector((store) => store.questions.questions);

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

  const buildQuestion = (question, key) => {
    return (
      <>
        <Row>
          <strong>{languageLabel(key)}</strong>
        </Row>
        <Row>{question[key]}</Row>
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
        dataSource={questions}
        renderItem={(item) => (
          <Card
            style={{ width: "100%", marginBottom: "15px" }}
            hoverable
            title={item.id}
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
                  buildQuestion(item.text, key)
                )}
              </Col>
            </Row>
          </Card>
        )}
      />
    </div>
  );
}

export default QuestionsList;
