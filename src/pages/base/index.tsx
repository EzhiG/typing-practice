import React, { ReactNode } from "react";
import { Layout } from "antd";
import "./styles.css";
import Sider from "../../components/sider";

type PageProps = {
  children: ReactNode;
};

export default function Page({ children }: PageProps) {
  return (
    <Layout className="full-page">
      <Sider />
      <Layout className="site-layout">
        <Layout.Header
          className="site-layout-background"
          style={{ padding: 0 }}
        />
        <Layout.Content className="spaced">{children}</Layout.Content>
        <Layout.Footer style={{ textAlign: "center" }}>
          Awesome Dashboard
        </Layout.Footer>
      </Layout>
    </Layout>
  );
}
