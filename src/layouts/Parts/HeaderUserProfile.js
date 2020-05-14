import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Dropdown, Menu, Icon, Modal } from "antd";
import { signOut } from "../../redux/actions/users";
import ChangePassword from "../../forms/ChangePasswordForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

function HeaderUserProfile() {
  const [visible, setVisible] = useState(false);
  const { currentUserData, currentUser } = useSelector(store => store.users);
  const dispatch = useDispatch();

  const showPasswordModal = () => {
    return (
      <Modal
        title="Change Password"
        visible={visible}
        footer={null}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <ChangePassword
          onCancel={() => {
            setVisible(false);
          }}
        />
      </Modal>
    );
  };

  return (
    <>
      {showPasswordModal()}
      <Dropdown
        overlay={
          <Menu mode="vertical">
            {/* <Menu.Item>
              <Icon type="setting" />
              <span>Settings</span>
            </Menu.Item> */}
            <Menu.Item
              onClick={() => {
                setVisible(true);
              }}
            >
              <FontAwesomeIcon icon={faKey} style={{ marginRight: "5px" }} />
              <span>Change Password</span>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
              onClick={() => {
                console.log("sign out");
                dispatch(signOut());
              }}
            >
              <FontAwesomeIcon
                icon={faSignOutAlt}
                style={{ marginRight: "5px" }}
              />
              <span>Sign out</span>
            </Menu.Item>
          </Menu>
        }
      >
        <span style={{ cursor: "pointer" }}>
          {currentUser && (
            <Avatar size={48} style={{ background: "#1790ff" }}>
              {`${currentUserData &&
                currentUserData.firstName &&
                currentUserData.firstName
                  .charAt(0)
                  .toUpperCase()}${currentUserData &&
                currentUserData.lastName &&
                currentUserData.lastName.charAt(0).toUpperCase()}`}
            </Avatar>
          )}
        </span>
      </Dropdown>{" "}
    </>
  );
}

export default HeaderUserProfile;
