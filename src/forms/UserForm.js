import React, { useState, useEffect, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Switch,
  notification,
  Select,
} from "antd";
import { createUser, updateUser } from "../redux/actions/users";

// Import actions.
// import { fetchUsers } from '../../redux/actions/users';
// import { createUser, updateUser } from '../../redux/actions/users';
// import { generateUsernamePasswordAndEmail } from '../../utils';

const AccountSwitch = forwardRef(({ checked, onChange }, ref) => {
  return (
    <Switch
      ref={ref}
      checked={checked}
      checkedChildren="Active"
      unCheckedChildren="Disabled"
      onChange={(current) => {
        // Purposely negating value to match with api data.
        // Strapi sets user.blocked = true. In order to represent this
        // Using antd Switch, in order to show on value for the account the value has to be
        // reversed. Same is also true when setting prop checked of Switch.
        onChange(current);
      }}
    />
  );
});

const jobPositions = [
  "Professor",
  "Associate Professor",
  "Assistant Professor",
  "Adjunct Professor",
  "Other",
];

const roles = [
  { label: "Instructor", value: "instructor" },
  { label: "Site Administrator", value: "siteAdministrator" },
  { label: "Super User", value: "superUser" },
  { label: "Student", value: "student" },
];

const userTypes = [
  { label: "Faculty", value: "faculty" },
  { label: "Undergraduate Student", value: "undergraduate" },
  { label: "Graduate Student", value: "graduate" },
  { label: "Doctoral Student", value: "doctoral" },
  { label: "Alumnus", value: "alumnus" },
];

const semesterType = ["Fall", "Spring", "Summer"];

function UserForm({
  form: { getFieldDecorator, validateFields },
  user,
  onCancel,
}) {
  const [data, setData] = useState({});
  const [saving, setSaving] = useState(false);
  const [showStartDate, setShowStartDate] = useState(false);
  const dispatch = useDispatch();
  const saveSuccessful = useSelector((store) => store.users.saveSuccessful);
  const { currentUser, fetching } = useSelector((store) => store.users);

  useEffect(() => {
    setData(user);
  }, [user]);

  useEffect(() => {
    const checkDrawer = () => {
      if (saveSuccessful) onCancel();
    };
    checkDrawer();
  }, [onCancel, saveSuccessful]);

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

  const dataSavedSuccessfully = async () => {
    notification.success({
      message: "Success",
      description: "User data saved successfully.",
    });
    if (onCancel) onCancel();
  };

  const processSave = async (data) => {
    data = data.id
      ? {
          ...data,
          updatedAt: new Date(),
          updatedBy: currentUser.uid,
          tags: data.tags ? data.tags : [],
          active: data.active ? data.active : false,
        }
      : {
          ...data,
          createdAt: new Date(),
          createdBy: currentUser.uid,
          tags: data.tags ? data.tags : [],
          active: data.active ? data.active : false,
        };
    if (user.id) {
      dispatch(updateUser(user.id, data));
    } else dispatch(createUser(data));
  };

  getFieldDecorator("email", { initialValue: data.email });

  return (
    <Form colon={false} onSubmit={handleSubmit} noValidate>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="First name">
            {getFieldDecorator("firstName", {
              initialValue: data.firstName,
              rules: [
                {
                  required: true,
                  message: "First name is required",
                  whitespace: true,
                },
              ],
            })(
              <Input
                size="large"
                placeholder="First name"
                autoComplete="test"
              />
            )}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Last name">
            {getFieldDecorator("lastName", {
              initialValue: data.lastName,
              rules: [
                {
                  required: true,
                  message: "Last name is required",
                  whitespace: true,
                },
              ],
            })(
              <Input size="large" placeholder="Last name" autoComplete="test" />
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Email">
            {getFieldDecorator("email", {
              initialValue: data.email,
              rules: [
                {
                  required: true,
                  message: "Email is required",
                  whitespace: true,
                },
              ],
            })(<Input placeholder="Marymount email" autoComplete="test" />)}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Position">
            {getFieldDecorator("position", {
              initialValue: data.position,
              rules: [
                {
                  required: true,
                  message: "Position is required",
                  whitespace: true,
                },
              ],
            })(
              <Select placeholder="Position" showSearch>
                {jobPositions.map((jobPosition, index) => {
                  return (
                    <Select.Option key={index} value={jobPosition}>
                      {jobPosition}
                    </Select.Option>
                  );
                })}
              </Select>
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Role">
            {getFieldDecorator("role", {
              rules: [
                {
                  required: false,
                  //   message: 'Location is required',
                },
              ],
              initialValue: data.role || "",
            })(
              <Select placeholder="Position" showSearch>
                {roles.map((role, index) => {
                  return (
                    <Select.Option key={index} value={role.value}>
                      {role.label}
                    </Select.Option>
                  );
                })}
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="User Type">
            {getFieldDecorator("userType", {
              rules: [
                {
                  required: false,
                  //   message: 'Location is required',
                },
              ],
              initialValue: data.userType || "",
            })(
              <Select
                placeholder="User type"
                showSearch
                onChange={(e) => {
                  setShowStartDate(
                    e === "faculty" || e === "alumnus" ? false : true
                  );
                }}
              >
                {userTypes.map((userType, index) => {
                  return (
                    <Select.Option key={index} value={userType.value}>
                      {userType.label}
                    </Select.Option>
                  );
                })}
              </Select>
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="City">
            {getFieldDecorator("city", {
              initialValue: data.city || "",
              rules: [
                {
                  required: false,
                  message: "Please no whitespace",
                  whitespace: true,
                },
              ],
            })(<Input size="large" placeholder="City" autoComplete="test" />)}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="State">
            {getFieldDecorator("state", {
              initialValue: data.state || "",
              rules: [
                {
                  required: false,
                  message: "Please no whitespace",
                  whitespace: true,
                },
              ],
            })(<Input size="large" placeholder="State" autoComplete="test" />)}
          </Form.Item>
        </Col>
      </Row>
      {showStartDate && (
        <Row gutter={16}>
          <h3>Start Date</h3>
          <Col span={12}>
            <Form.Item label="Semester">
              {getFieldDecorator("semester", {
                initialValue: data.semester ? data.semester : "",
                rules: [
                  {
                    required: false,
                    message: "Semester type is required",
                    whitespace: true,
                  },
                ],
              })(
                <Select placeholder="Semester" showSearch>
                  {semesterType.map((semester, index) => {
                    return (
                      <Select.Option key={index} value={semester}>
                        {semester}
                      </Select.Option>
                    );
                  })}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Year" extra="For example: 2019">
              {getFieldDecorator("year", {
                initialValue: data.year || "",
                rules: [
                  {
                    required: false,
                    message: "Year is required",
                    whitespace: true,
                  },
                ],
              })(<Input placeholder="Year" autoComplete="test" />)}
            </Form.Item>
          </Col>
        </Row>
      )}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Account Status">
            {getFieldDecorator("active", {
              initialValue: data.active === undefined ? true : data.active,
              valuePropName: "checked",
              rules: [
                {
                  required: true,
                  message: "Account status is required",
                },
              ],
            })(<AccountSwitch />)}
          </Form.Item>
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
          loading={fetching}
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

export default UserForm;
