import React from 'react';
import useOperations from "../../hooks/use-operations";
import { Operation } from "../../entities/operation";
import { Dropdown, Menu } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import type { User } from "../../entities/user";

type ActionsProps = {
  user: User;
  currentUser: User;
  onAction: (action: Operation) => void;
};

export default function Actions({ user, currentUser, onAction }: ActionsProps) {
  const operations = useOperations(user, currentUser);

  if (!operations) {
    return null;
  }

  const menu = (
    <Menu>
      {operations.map((operation: Operation, key: number) => (
        <Menu.Item
          key={key}
          icon={<UserOutlined />}
          onClick={() => onAction(operation)}
        >
          {operation}
        </Menu.Item>
      ))}
    </Menu>
  );
  return (
    <Dropdown disabled={operations.length === 0} overlay={menu} trigger={["click"]}>
      <a href="#" className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        Action <DownOutlined />
      </a>
    </Dropdown>
  );
}
