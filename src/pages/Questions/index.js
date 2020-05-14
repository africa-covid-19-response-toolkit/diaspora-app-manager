import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Drawer, Button, PageHeader } from "antd";
import QuestionsList from "./QuestionsList";
import QuestionsForm from "../../forms/QuestionsForm";
import { isEmpty } from "lodash";
import { CheckOutlined, PlusOutlined } from "@ant-design/icons";

import {
  getQuestions,
  questionsCreationFailed,
} from "../../redux/actions/questions";
// import { getTags } from "../../redux/actions/tags";

function Questions() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [question, setQuestion] = useState({});
  const [drawerTitle, setDrawerTitle] = useState("Add new question");
  const { currentUser } = useSelector((store) => store.users);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchEvents = () => {
      dispatch(getQuestions());
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
          setQuestion({});
          setDrawerVisible(false);
          dispatch(questionsCreationFailed());
        }}
        visible={drawerVisible}
        keyboard={false}
      >
        <QuestionsForm
          question={question}
          onCancel={() => {
            dispatch(questionsCreationFailed());
            setDrawerVisible(false);
          }}
          onDelete={(question) => {
            if (question) {
              //   dispatch(deleteLocation(location));
              setDrawerVisible(false);
            }
          }}
        />
      </Drawer>

      <Col>
        <Row type="flex" justify="end" style={{ marginBottom: 20 }}>
          <Col span={12}>
            <PageHeader title="Questions" />
          </Col>
          <Col span={12}>
            <Row type="flex" justify="end" style={{ marginBottom: 20 }}>
              {!isEmpty(currentUser) && (
                <Button
                  size="large"
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={(e) => {
                    setDrawerTitle("Add new question");
                    setQuestion({});
                    setDrawerVisible(true);
                  }}
                >
                  Add New question
                </Button>
              )}
            </Row>
          </Col>
        </Row>
      </Col>

      <Row>
        <QuestionsList
          onEdit={(question) => {
            if (question) {
              setQuestion(question);
              setDrawerTitle(`Edit - ${question.text.eng}`);
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

export default Questions;
