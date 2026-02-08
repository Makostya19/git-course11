"use client";

import { Layout } from "antd";

const { Header, Content } = Layout;

export default function AntdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          color: "#fff",
          fontSize: 20,
          fontWeight: 600,
        }}
      >
        Movie Search
      </Header>

      <Content>{children}</Content>
    </Layout>
  );
}
