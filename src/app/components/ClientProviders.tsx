// src/app/components/ClientProviders.tsx
'use client';
import React from 'react';
import { ConfigProvider } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <StyleProvider hashPriority="high">
      <ConfigProvider>{children}</ConfigProvider>
    </StyleProvider>
  );
}
