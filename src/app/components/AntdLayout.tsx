'use client';

import React from 'react';
import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;

export default function AntdLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#001529', color: '#fff', padding: '0 24px' }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>🎬 Movie Search App</div>
      </Header>
      <Content style={{ padding: '24px' }}>
        <div style={{ background: '#fff', padding: '24px', borderRadius: '8px' }}>{children}</div>
      </Content>
      <Footer style={{ textAlign: 'center', background: '#f0f2f5' }}>
        © 2026 Movie Search App. All rights reserved.
      </Footer>
    </Layout>
  );
}
