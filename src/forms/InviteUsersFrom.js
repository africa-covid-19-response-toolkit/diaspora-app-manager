import React, { useState, useEffect, forwardRef } from "react";
import { useDispatch } from "react-redux";
import {
  Form,
  Select,
  Button,
  Row,
  Col,
  Switch,
  notification,
  Modal,
  Typography,
} from "antd";

// Import actions.
// import { fetchUsers } from '../../redux/actions/users';
// import { createUser, updateUser } from '../../redux/actions/users';

const AccountSwitch = forwardRef(({ checked, onChange }, ref) => {
  return (
    <Switch
      ref={ref}
      checked={!checked}
      checkedChildren="Active"
      unCheckedChildren="Disabled"
      onChange={(current) => {
        // Purposely negating value to match with api data.
        // Strapi sets user.blocked = true. In order to represent this
        // Using antd Switch, in order to show on value for the account the value has to be
        // reversed. Same is also true when setting prop checked of Switch.
        onChange(!current);
      }}
    />
  );
});

function InviteUsersForm({
  form: { getFieldDecorator, validateFields },
  user,
  onCancel,
}) {
  const [data, setData] = useState({});
  const [saving, setSaving] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setData(user);
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    validateFields((err, values) => {
      if (!err) {
        if (values) processSave(values);
      }
    });
  };

  // Update
  const saveUpdatedData = async (data) => {
    try {
      setSaving(true);
      //   await dispatch(updateUser(data));
      setSaving(false);
      dataSavedSuccessfully();
    } catch (error) {
      setSaving(false);
      notification.error({
        message: "Error",
        description: error.message,
      });
    }
  };

  // New
  const saveNewData = async (userCredential, data) => {
    try {
      //   await dispatch(createUser({ ...data, ...userCredential }));
      setSaving(false);
      dataSavedSuccessfully();
    } catch (error) {
      setSaving(false);
      notification.error({
        message: "Error",
        description: error.message,
      });
    }
  };

  const dataSavedSuccessfully = async () => {
    notification.success({
      message: "Success",
      description: "User data saved successfully.",
    });

    // Refresh data.
    // dispatch(fetchUsers());
    // Close Drawer
    if (onCancel) onCancel();
  };

  const processSave = async (data) => {
    try {
      if (data.id) {
        saveUpdatedData(data);
      } else {
        // const userCredential = generateUsernamePasswordAndEmail('yaz');
        Modal.info({
          title: "Please note the following",
          content: (
            <div>
              <p>
                Username:{" "}
                <Typography.Text code>
                  {/* {userCredential.username} */}
                </Typography.Text>
              </p>
              <p>
                Password:{" "}
                <Typography.Text code>
                  {/* {userCredential.password} */}
                </Typography.Text>
              </p>
            </div>
          ),
          onOk() {
            setSaving(true);
            // saveNewData(userCredential, data);
          },
        });
      }
    } catch (error) {}
  };

  // Id is is not visible on the form.
  getFieldDecorator("id", { initialValue: data.id || data._id || "" });
  getFieldDecorator("username", { initialValue: data.username });
  getFieldDecorator("email", { initialValue: data.email });
  getFieldDecorator("email", { initialValue: data.email });

  return (
    <Form colon={false} onSubmit={handleSubmit} noValidate>
      <Row>
        <Col>
          <Form.Item label="Invite Users">
            {getFieldDecorator("invitedUsers", {
              initialValue: data.invitedUsers,
              rules: [
                {
                  type: "array",
                },
              ],
            })(
              <Select
                mode="tags"
                style={{ width: "100%" }}
                placeholder="Invite users"
              ></Select>
            )}
          </Form.Item>
        </Col>
        {/* <Col span={12}>
          <Form.Item label="Last name">
            {getFieldDecorator("lastName", {
              initialValue: data.lastName,
              rules: [
                {
                  required: true,
                  message: "Last name is required",
                  whitespace: true
                }
              ]
            })(<Input size="large" placeholder="Last name" />)}
          </Form.Item>
        </Col> */}
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
          Invite users
        </Button>
      </div>
    </Form>
  );
}

export default InviteUsersForm;
