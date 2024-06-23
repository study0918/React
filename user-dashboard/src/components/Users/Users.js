import React from "react";
import styles from "./Users.css";
import { Table, Pagination, Popconfirm, Button } from "antd";
function Users() {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a href="">{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website",
    },
    {
      title: "Operation",
      key: "operation",
      render: (text, record) => (
        <span className={styles.operation}>
          <UserModal record={record} onOk={editHandler.bind(null.record.id)}>
            <a>Edit</a>
          </UserModal>
          <Popconfirm
            title="Confirm to delete?"
            onConfirm={deleteHandlder.bind(null, record.id)}
          >
            <a href="">Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];
  return (
    <div className={styles.normal}>
      {/* Component: Users */}
      <div>
        <div className={styles.create}></div>
        <UserModal record={{}} onOk={createHandler}>
          <Button type="primary">Create User</Button>
        </UserModal>
      </div>
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        pagination={false}
      ></Table>
      <Pagination className="ant-table-pagination"></Pagination>
    </div>
  );
}

export default Users;
