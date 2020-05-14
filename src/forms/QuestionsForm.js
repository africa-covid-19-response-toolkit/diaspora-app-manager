import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Row, Col, Select, Modal } from "antd";
import { updateQuestion, addQuestion } from "../redux/actions/questions";
import { omit, find } from "lodash";
import {
  // CheckOutlined,
  // CloseOutlined,
  PlusOutlined,
  MinusCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
const { Option } = Select;

function QuestionsForm({ onCancel, question, editing }) {
  const [data, setData] = useState({});
  const [saving, setSaving] = useState(false);
  const dispatch = useDispatch();
  const { saveSuccessful, questions } = useSelector((store) => store.questions);
  const [visible, setVisible] = useState(false);
  // const [selectedAction, setSelectedAction] = useState(false);
  const [form] = Form.useForm();
  const [actionForm] = Form.useForm();

  useEffect(() => {
    const checkDrawer = () => {
      if (saveSuccessful) onCancel();
    };
    checkDrawer();
  }, [onCancel, saveSuccessful]);

  useEffect(() => {
    const setQuestion = () => {
      if (question) {
        if (question.text)
          form.setFieldsValue({
            questionNumber: question.id,
            eng: question.text.eng,
            amh: question.text.amh,
            orm: question.text.orm,
            tig: question.text.tig,
            type: question.type,
            // active: question.active ? question.active : false,
          });
        setData(question);
      }
    };
    setQuestion();
  }, [form, question]);

  const processSave = (value) => {
    const { eng, amh, orm, tig, type, active, questionNumber } = value;
    let questionData = {
      text: {
        eng,
        amh,
        tig,
        orm,
      },
      type,
      // active: active ? active : false,
    };
    if (data.actions) questionData = { ...questionData, actions: data.actions };
    if (question.id) {
      dispatch(updateQuestion(question.id, questionData));
    } else dispatch(addQuestion(questionData, questionNumber));
  };

  // Id is is not visible on the form.
  // getFieldDecorator("id", { initialValue: data.id || data._id || "" });

  const setSelectedAction = (action, key) => {
    if (data && data.actions && data.actions[key]) {
      actionForm.setFieldsValue({
        actionKey: key,
        eng: data.actions[key].eng,
        amh: data.actions[key].amh,
        orm: data.actions[key].orm,
        tig: data.actions[key].tig,
        next: action.next,
        order: action.order,
        value: action.value && Object.keys(action.value)[0],
      });
    }
  };

  const removeAction = (key) => {
    // let temp = data;
    const temp = omit(data.actions, `${key}`);
    const updatedData = {
      ...data,
      actions: temp,
    };
    // delete temp.actions[key];
    // console.log(temp);
    setData(updatedData);
  };

  const addAction = (action) => {
    let temp = {};
    temp = {
      ...data,
      actions: {
        ...data.actions,
        [action.actionKey]: {
          label: {
            eng: action.eng,
            amh: action.amh,
            orm: action.orm,
            tig: action.tig,
          },
          order: action.order,
          next: action.next,
        },
      },
    };
    if (action.value) {
      temp = {
        ...temp,
        actions: {
          ...temp.actions,
          [action.actionKey]: {
            ...temp.actions[action.actionKey],
            value: {
              [action.value]: true,
            },
          },
        },
      };
    }
    setData(temp);
  };

  return (
    <Form
      colon={false}
      onFinish={processSave}
      form={form}
      noValidate
      layout={"vertical"}
    >
      <Row>
        <Col>
          <Form.Item
            label="Question Number"
            name="questionNumber"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Question number can not be empty",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (
                    value &&
                    find(
                      questions,
                      (o) => o.id === getFieldValue("questionNumber")
                    ) &&
                    !editing
                  ) {
                    return Promise.reject(
                      "This question number already exists"
                    );
                  } else {
                    return Promise.resolve();
                  }
                },
              }),
            ]}
          >
            <Input
              size="large"
              placeholder="Question number"
              disabled={question.id ? true : false}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col flex="auto">
          <Form.Item
            label="Text (English)"
            name="eng"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Question text can not be empty",
              },
            ]}
          >
            <Input size="large" placeholder="Text in English" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col flex="auto">
          <Form.Item
            label="Text (Amharic)"
            name="amh"
            rules={[
              {
                required: false,
                whitespace: true,
              },
            ]}
          >
            <Input size="large" placeholder="Text in Amharic" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col flex="auto">
          <Form.Item
            label="Text (Oromifa)"
            name="orm"
            rules={[
              {
                required: false,
                whitespace: true,
              },
            ]}
          >
            <Input size="large" placeholder="Text in Oromifa" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col flex="auto">
          <Form.Item
            label="Text (Tigrigna)"
            name="tig"
            rules={[
              {
                required: false,
                whitespace: true,
              },
            ]}
          >
            <Input size="large" placeholder="Text in Tigrigna" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col flex="auto">
          {data.actions && <h2>Actions</h2>}
          <Form.List name="actions">
            {(fields, { add, remove }) => {
              return (
                <div>
                  {data.actions &&
                    Object.keys(data.actions).map((key) => {
                      return (
                        <>
                          <Row>
                            <Col>
                              <h3>{key}</h3>
                            </Col>
                            <Col>
                              <Form.Item>
                                <EditOutlined
                                  className="dynamic-delete-button"
                                  style={{ margin: "0 8px" }}
                                  onClick={() => {
                                    setSelectedAction(data.actions[key], key);
                                    setVisible(true);
                                  }}
                                />
                              </Form.Item>
                            </Col>
                            <Col>
                              <Form.Item>
                                <MinusCircleOutlined
                                  className="dynamic-delete-button"
                                  style={{ margin: "0 8px" }}
                                  onClick={() => {
                                    removeAction(key);
                                  }}
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                        </>
                      );
                    })}
                  <Modal
                    visible={visible}
                    title="Add a new action"
                    okText="Add"
                    cancelText="Cancel"
                    maskClosable={false}
                    onCancel={() => {
                      actionForm.resetFields();
                      setVisible(false);
                    }}
                    onOk={() => {
                      actionForm
                        .validateFields()
                        .then((values) => {
                          addAction(values);
                          setVisible(false);
                          actionForm.resetFields();
                        })
                        .catch((info) => {
                          console.log("Validate Failed:", info);
                        });
                    }}
                  >
                    <Form
                      form={actionForm}
                      layout="vertical"
                      name="form_in_modal"
                      initialValues={{ modifier: "public" }}
                    >
                      <Form.Item
                        name="actionKey"
                        label="Action Key"
                        rules={[
                          {
                            required: true,
                            message: "Please input the key of action!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Action Text (English)"
                        name="eng"
                        rules={[
                          {
                            required: false,
                            whitespace: true,
                          },
                        ]}
                      >
                        <Input size="large" placeholder="Text in English" />
                      </Form.Item>
                      <Form.Item
                        label="Action Text (Amharic)"
                        name="amh"
                        rules={[
                          {
                            required: false,
                            whitespace: true,
                          },
                        ]}
                      >
                        <Input size="large" placeholder="Text in Amharic" />
                      </Form.Item>
                      <Form.Item
                        label="Action Text (Oromifa)"
                        name="orm"
                        rules={[
                          {
                            required: false,
                            whitespace: true,
                          },
                        ]}
                      >
                        <Input size="large" placeholder="Text in Oromifa" />
                      </Form.Item>
                      <Form.Item
                        label="Action Text (Tigrigna)"
                        name="tig"
                        rules={[
                          {
                            required: false,
                            whitespace: true,
                          },
                        ]}
                      >
                        <Input size="large" placeholder="Text in Tigrigna" />
                      </Form.Item>

                      <Form.Item
                        name="next"
                        label="Next Question"
                        rules={[
                          {
                            required: false,
                            message:
                              "Please input the next question for action!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        name="order"
                        label="Order"
                        rules={[
                          {
                            required: false,
                            message: "Please input the order of action!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        name="value"
                        label="Value"
                        rules={[
                          {
                            required: false,
                            message: "Please input the value of action!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Form>
                  </Modal>
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => {
                        setVisible(true);
                      }}
                      style={{ width: "60%" }}
                    >
                      <PlusOutlined /> Add Action
                    </Button>
                  </Form.Item>
                </div>
              );
            }}
          </Form.List>
        </Col>
      </Row>
      <Row>
        <Col flex="auto">
          <Form.Item
            name="type"
            label="Type of Question"
            hasFeedback
            rules={[
              { required: true, message: "Please select type of question" },
            ]}
          >
            <Select placeholder="Please select type of question">
              <Option value="question">Question</Option>
              <Option value="transfer">Transfer</Option>
              <Option value="close">Close</Option>
              <Option value="done">Done</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      {/* <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Active"
            name="active"
            valuePropName="checked"
            rules={[
              {
                required: false,
                whitespace: true,
              },
            ]}
          >
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
            />
          </Form.Item>
        </Col>
      </Row> */}
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100%",
          borderTop: "1px solid #e9e9e9",
          padding: "10px 16px",
          background: "#fff",
          textAlign: "right",
        }}
      >
        <Button
          onClick={() => {
            if (onCancel) onCancel();
          }}
          style={{ marginRight: 8 }}
        >
          Cancel
        </Button>
        <Button
          loading={saving}
          htmlType="submit"
          type="primary"
          style={{ marginRight: 8 }}
        >
          Save
        </Button>
      </div>
    </Form>
  );
}

export default QuestionsForm;

{
  /* <Modal
      visible={visible}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: 'public' }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please input the title of collection!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input type="textarea" />
        </Form.Item>
        <Form.Item name="modifier" className="collection-create-form_last-form-item">
          <Radio.Group>
            <Radio value="public">Public</Radio>
            <Radio value="private">Private</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal> */
}
