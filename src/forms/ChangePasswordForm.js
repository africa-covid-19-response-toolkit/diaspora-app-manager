import React, { useState, useEffect, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Row, Col, message } from "antd";
import { auth } from "../api/firebase";

function ChangePasswordForm({
  form: { getFieldDecorator, validateFields, getFieldValue },
  onCancel,
}) {
  const [confirmDirty, setConfirmDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    validateFields((err, values) => {
      if (!err) {
        if (values) processSave(values);
      }
    });
  };

  const processSave = async (data) => {
    var user = auth().currentUser;

    var credential = auth.EmailAuthProvider.credential(
      user.email,
      data.oldPassword
    );
    setSaving(true);
    if (data.confirmPassword !== data.newPassword) {
      message("The passwords you entered do not match");
      return;
    }

    // Prompt the user to re-provide their sign-in credentials
    if (user.email && data.oldPassword)
      user
        .reauthenticateWithCredential(credential)
        .then(function (authData) {
          // User re-authenticated.
          user
            .updatePassword(data.newPassword)
            .then(function () {
              // Update successful.
              setSaving(false);
              message.success("Password updated successfully");
              onCancel();
            })
            .catch(function (error) {
              // An error happened.
              message.error(error.message);
              setSaving(false);
            });
        })
        .catch(function (error) {
          // An error happened.
          let errorMessage = "";
          if (error.code === "auth/wrong-password")
            errorMessage =
              "The old password you entered is incorrect please try again";
          else errorMessage = error.message;
          message.error(errorMessage);
          setSaving(false);
        });
  };

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== getFieldValue("newPassword")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule, value, callback) => {
    if (value && confirmDirty) {
      validateFields(["confirmPassword"], { force: true });
    }
    callback();
  };

  const handleConfirmBlur = (e) => {
    const { value } = e.target;
    setConfirmDirty(confirmDirty || !!value);
  };

  return (
    <Form colon={false} onSubmit={handleSubmit} noValidate>
      <div>
        <Col>
          <Row>
            <Form.Item label="Old Password" hasFeedback>
              {getFieldDecorator("oldPassword", {
                rules: [
                  {
                    required: true,
                    message: "Please input your old password!",
                  },
                ],
              })(<Input.Password />)}
            </Form.Item>
          </Row>
          <Row>
            <Form.Item label="New Password" hasFeedback>
              {getFieldDecorator("newPassword", {
                rules: [
                  {
                    required: true,
                    message: "Please enter new password!",
                  },
                  {
                    validator: validateToNextPassword,
                  },
                ],
              })(<Input.Password onBlur={handleConfirmBlur} />)}
            </Form.Item>
          </Row>
          <Row>
            <Form.Item label="Confirm Password" hasFeedback>
              {getFieldDecorator("confirmPassword", {
                rules: [
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  {
                    validator: compareToFirstPassword,
                  },
                ],
              })(<Input.Password onBlur={handleConfirmBlur} />)}
            </Form.Item>
          </Row>
        </Col>
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

export default ChangePasswordForm;
