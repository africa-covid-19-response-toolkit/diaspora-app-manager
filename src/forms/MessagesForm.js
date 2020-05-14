import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Select,
  Switch,
  DatePicker,
  message,
} from "antd";
import { updateMessage, addMessage } from "../redux/actions/messages";
import moment from "moment";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useForm } from "antd/lib/form/util";

function MessagesForm({ onCancel, message }) {
  const [data, setData] = useState({});
  const [saving, setSaving] = useState(false);
  const dispatch = useDispatch();
  const saveSuccessful = useSelector((store) => store.messages.saveSuccessful);
  const { currentUser } = useSelector((store) => store.users);
  const [form] = Form.useForm();

  useEffect(() => {
    const checkDrawer = () => {
      if (saveSuccessful) onCancel();
    };
    checkDrawer();
  }, [onCancel, saveSuccessful]);

  useEffect(() => {
    const setMessage = () => {
      if (message) {
        if (message.text)
          form.setFieldsValue({
            backgroundColor: message.backgroundColor,
            eng: message.text.eng,
            amh: message.text.amh,
            orm: message.text.orm,
            tig: message.text.tig,
            active: message.active,
          });
        setData(message);
      }
    };
    setMessage();
  }, [form, message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // validateFields((err, values) => {
    //   if (!err) {
    //     if (values) processSave(values);
    //   }
    // });
  };

  const processSave = (data) => {
    const { eng, amh, orm, tig } = data;
    data = {
      backgroundColor: data.backgroundColor,
      text: {
        eng,
        amh,
        tig,
        orm,
      },
    };
    if (message.id) {
      dispatch(updateMessage(message.id, data));
    } else dispatch(addMessage(data));
  };

  // Id is is not visible on the form.
  // getFieldDecorator("id", { initialValue: data.id || data._id || "" });

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
            label="Background Color"
            name="backgroundColor"
            rules={[
              {
                required: false,
                whitespace: true,
              },
            ]}
          >
            <Input size="large" placeholder="Background Color" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col flex="auto">
          <Form.Item
            label="Text (English)"
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

export default MessagesForm;
