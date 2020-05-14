import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Badge, Button, notification, Row } from "antd";
import { sortBy, filter } from "lodash";

// Import actions.
import { updateUser } from "../../../redux/actions/users";

import { stringSorter } from "../../../common/Helpers";

function UserList({ onEdit, onDelete, tab, history }) {
  // Strapi params https://strapi.io/documentation/3.0.0-alpha.x/guides/filters.html#available-operators
  const [params] = useState({
    _start: 0,
    _limit: 10,
    _sort: "firstName:ASC,lastName:ASC"
  });
  const [sortedList, setSortedList] = useState([]);
  const fetching = useSelector(store => store.users.fetching);
  const { usersList } = useSelector(store => store.users);
  const dispatch = useDispatch();

  const columns = (onEdit, onDelete) => [
    {
      title: "Name",
      key: "fullName",
      render: (text, record) => (
        <span>
          <Button
            type="link"
            size="small"
            onClick={e => {
              history.push(`/profile/${record.id}`);
            }}
          >
            {record.lastName}, {record.firstName}
          </Button>
        </span>
      ),
      sorter: (a, b) => stringSorter(a.lastName, b.lastName),
      defaultSortOrder: "ascend",
      sortDirections: ["ascend", "descend"]
    },
    {
      title: "Email",
      key: "email",
      render: (text, record) => record.email,
      sorter: (a, b) => stringSorter(a.email, b.email),
      // defaultSortOrder: "ascend",
      sortDirections: ["ascend", "descend"]
    },
    {
      title: "Job Position",
      dataIndex: "position",
      key: "position",
      render: (text, record) => {
        if (record.position && record.position) return record.position;
      },
      sorter: (a, b) => stringSorter(a.position, b.position),
      sortDirections: ["ascend", "descend"]
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text, record) => {
        if (record.role)
          return record.role === "instructor"
            ? "Instructor"
            : record.role === "siteAdministrator"
            ? "Site Administrator"
            : record.role === "superUser"
            ? "Super User"
            : "";
      }
    },
    {
      title: "Status",
      dataIndex: "active",
      key: "active",
      align: "center",
      render: active =>
        active ? (
          <Badge style={{ backgroundColor: "#5cb85c" }} count={`Active`} />
        ) : (
          <Badge count={`Disabled`} />
        )
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <span>
          <Button
            type="link"
            size="small"
            onClick={e => {
              if (onEdit) onEdit(record);
            }}
          >
            Edit
          </Button>
        </span>
      )
    }
  ];

  useEffect(() => {
    const filterUsers = () => {
      let list = filter(usersList, user => {
        if (
          tab === "Faculty" &&
          user.active === true &&
          user.userType === "faculty"
        )
          return user;
        else if (
          tab === "Doctoral Students" &&
          user.active === true &&
          user.userType === "doctoral"
        )
          return user;
        else if (
          tab === "Graduate Students" &&
          user.active === true &&
          user.userType === "graduate"
        )
          return user;
        else if (
          tab === "Undergraduate Students" &&
          user.active === true &&
          user.userType === "undergraduate"
        )
          return user;
        else if (
          tab === "Alumni" &&
          user.active === true &&
          user.userType === "alumnus"
        )
          return user;
        else if (tab === "Inactive Users" && user.active === false) return user;
      });
      setSortedList(list);
    };

    filterUsers();
  }, [dispatch, tab, usersList]);

  return (
    <Row>
      <Table
        rowKey="id"
        columns={columns(onEdit, onDelete)}
        dataSource={sortedList}
        loading={fetching}
        pagination={{ pageSize: 10 }}
      />
    </Row>
  );
}

export default UserList;
