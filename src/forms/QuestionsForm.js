import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Row, Col, Select, Modal } from "antd";
import { updateQuestion, addQuestion } from "../redux/actions/questions";
import { omit, find, isEmpty, filter } from "lodash";
import {
  // CheckOutlined,
  // CloseOutlined,
  PlusOutlined,
  MinusCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import ReactJson from "react-json-view";
import { dateSorter } from "../common/Helpers";
const { Option } = Select;

const tempJson = { test: "now" };

function QuestionsForm({ onCancel, question, editing }) {
  const [data, setData] = useState({});
  const [saving, setSaving] = useState(false);
  const dispatch = useDispatch();
  const { saveSuccessful, questions } = useSelector((store) => store.questions);
  const [actionVisible, setActionVisible] = useState(false);
  const [multipleChoiceVisible, setMultipleChoiceVisible] = useState(false);
  // const [selectedAction, setSelectedAction] = useState(false);
  const [form] = Form.useForm();
  const [actionForm] = Form.useForm();
  const [multipleChoiceForm] = Form.useForm();

  useEffect(() => {
    const checkDrawer = () => {
      if (saveSuccessful) onCancel();
    };
    checkDrawer();
  }, [onCancel, saveSuccessful]);

  useEffect(() => {
    const setQuestion = () => {
      if (!isEmpty(question)) {
        if (question.text)
          form.setFieldsValue({
            questionNumber: question.id,
            eng: question.text.eng,
            amh: question.text.amh,
            orm: question.text.orm,
            tig: question.text.tig,
            next: question.next,
            multipleChoice: question.multiple_choice,
            type: question.type,
            valueKey: question.value_key,
          });
        setData(question);
      }
    };
    setQuestion();
  }, [form, question]);

  const processSave = (value) => {
    const { eng, amh, orm, tig, type, next, questionNumber, valueKey } = value;

    let questionData = {
      text: {
        eng,
        amh,
        tig,
        orm,
      },
      type,
      value_key: valueKey,
      next: data.next,
    };
    if (data.actions) questionData = { ...questionData, actions: data.actions };
    if (data.multiple_choice)
      questionData = { ...questionData, multiple_choice: data.multiple_choice };
    if (question.id) {
      dispatch(updateQuestion(question.id, questionData));
    } else dispatch(addQuestion(questionData, questionNumber));
  };

  // Id is is not visible on the form.
  // getFieldDecorator("id", { initialValue: data.id || data._id || "" });

  const nextQuestionOnChange = (e) => {
    const temp = {
      ...data,
      next: JSON.stringify(e.updated_src),
    };
    setData(temp);
  };

  const setSelectedAction = (action, key) => {
    if (data && data.actions && data.actions[key]) {
      actionForm.setFieldsValue({
        actionKey: key,
        eng: data.actions[key].text.eng,
        amh: data.actions[key].text.amh,
        orm: data.actions[key].text.orm,
        tig: data.actions[key].text.tig,
        order: action.order,
        value: data.actions[key].value[data.value_key],
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
          text: {
            eng: action.eng,
            amh: action.amh,
            orm: action.orm,
            tig: action.tig,
          },
          order: action.order,
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
              [form.getFieldValue("valueKey")]: action.value,
            },
          },
        },
      };
    }
    setData(temp);
  };

  const setSelectedChoice = (choice, index) => {
    if (data && data.multiple_choice && data.multiple_choice.length > 0) {
      // console.log(JSON.parse(choice.disabled));
      // console.log(JSON.parse(JSON.stringify(choice.disabled)));
      console.log(choice, index);
      console.log(data.multiple_choice);
      multipleChoiceForm.setFieldsValue({
        eng: data.multiple_choice[index].text.eng,
        amh: data.multiple_choice[index].text.amh,
        orm: data.multiple_choice[index].text.orm,
        tig: data.multiple_choice[index].text.tig,
        disabled: data.multiple_choice[index].disabled,
        value: data.multiple_choice[index].value[data.value_key],
      });
    }
  };

  const removeChoice = (index) => {
    let itemToRemove = data.multiple_choice[index];
    const temp = filter(
      data.multiple_choice,
      (o) => o.text.eng !== itemToRemove.text.eng
    );
    const updatedData = {
      ...data,
      multiple_choice: temp,
    };
    // delete temp.actions[key];
    // console.log(temp);
    setData(updatedData);
  };

  const addChoice = (choice) => {
    let updatedChoices = [];
    choice = {
      text: {
        eng: choice.eng,
        amh: choice.amh,
        orm: choice.orm,
        tig: choice.tig,
      },
      value: choice.value,
    };
    if (choice.value) {
      choice = {
        ...choice,
        value: {
          [data.value_key]: choice.value,
        },
      };
    }
    if (isEmpty(choice.disabled)) {
      const removeDisabled = omit(choice, `disabled`);
      choice = removeDisabled;
    }
    updatedChoices = data.multiple_choice
      ? [...data.multiple_choice, choice]
      : [choice];
    let temp = {
      ...data,
      multiple_choice: updatedChoices,
    };
    setData(temp);
  };

  const disabledOnChange = (e, index) => {
    let updatedChoices = data.multiple_choice;
    updatedChoices[index] = {
      ...updatedChoices[index],
      disabled: e.updated_src,
    };
    const temp = {
      ...data,
      multiple_choice: updatedChoices,
    };
    console.log(temp);
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
          <Form.Item
            label="Next Question Rules"
            name="next"
            rules={[
              {
                required: false,
                whitespace: true,
              },
            ]}
          >
            <ReactJson
              src={data.next ? JSON.parse(data.next) : {}}
              enableClipboard={false}
              onAdd={nextQuestionOnChange}
              onEdit={nextQuestionOnChange}
              onDelete={nextQuestionOnChange}
              name={false}
              theme="monokai"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col flex="auto">
          <Form.Item
            label="Value Key"
            name="valueKey"
            rules={[
              {
                required: false,
                whitespace: true,
              },
            ]}
          >
            <Input size="large" placeholder="Value key for the actions" />
          </Form.Item>
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
              <Option value="message">Message</Option>
              <Option value="close">Close</Option>
              <Option value="done">Done</Option>
            </Select>
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
                                    setActionVisible(true);
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
                    forceRender={true}
                    visible={actionVisible}
                    title="Add a new action"
                    okText="Add"
                    cancelText="Cancel"
                    maskClosable={false}
                    onCancel={() => {
                      actionForm.resetFields();
                      setActionVisible(false);
                    }}
                    onOk={() => {
                      actionForm
                        .validateFields()
                        .then((values) => {
                          addAction(values);
                          setActionVisible(false);
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
                      // initialValues={{ modifier: "public" }}
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
                        setActionVisible(true);
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
          {data.multiple_choice && <h2>Multiple Choices</h2>}
          <Form.List name="actions">
            {(fields, { add, remove }) => {
              return (
                <div>
                  {data.multiple_choice &&
                    data.multiple_choice.length > 0 &&
                    data.multiple_choice.map((choice, index) => {
                      return (
                        <>
                          <Row>
                            <Col>
                              <h3>{`Choice ${index}`}</h3>
                            </Col>
                            <Col>
                              <Form.Item>
                                <EditOutlined
                                  className="dynamic-delete-button"
                                  style={{ margin: "0 8px" }}
                                  onClick={() => {
                                    setSelectedChoice(choice, index);
                                    setMultipleChoiceVisible(true);
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
                                    removeChoice(index);
                                  }}
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                        </>
                      );
                    })}
                  <Modal
                    forceRender={true}
                    visible={multipleChoiceVisible}
                    title="Add a new multiple choice"
                    okText="Add"
                    cancelText="Cancel"
                    maskClosable={false}
                    onCancel={() => {
                      multipleChoiceForm.resetFields();
                      setMultipleChoiceVisible(false);
                    }}
                    onOk={() => {
                      multipleChoiceForm
                        .validateFields()
                        .then((values) => {
                          addChoice(values);
                          setMultipleChoiceVisible(false);
                          multipleChoiceForm.resetFields();
                        })
                        .catch((info) => {
                          console.log("Validate Failed:", info);
                        });
                    }}
                  >
                    <Form
                      form={multipleChoiceForm}
                      layout="vertical"
                      name="form_in_modal"
                      // initialValues={{ modifier: "public" }}
                    >
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
                      <Form.Item
                        label="Disabled"
                        name="disabled"
                        rules={[
                          {
                            required: false,
                            whitespace: true,
                          },
                        ]}
                      >
                        <ReactJson
                          src={
                            multipleChoiceForm.getFieldValue("disabled")
                              ? multipleChoiceForm.getFieldValue("disabled")
                              : {}
                          }
                          enableClipboard={false}
                          onAdd={(e, index) => disabledOnChange(e, index)}
                          onEdit={(e, index) => disabledOnChange(e, index)}
                          onDelete={(e, index) => disabledOnChange(e, index)}
                          name={false}
                          theme="monokai"
                        />
                      </Form.Item>
                    </Form>
                  </Modal>
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => {
                        setMultipleChoiceVisible(true);
                      }}
                      style={{ width: "60%" }}
                    >
                      <PlusOutlined /> Add Multiple Choice
                    </Button>
                  </Form.Item>
                </div>
              );
            }}
          </Form.List>
        </Col>
      </Row>
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
