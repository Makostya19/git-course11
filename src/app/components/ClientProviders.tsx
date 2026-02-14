'use client';

import React, { useEffect } from 'react';
import { ConfigProvider } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';
import { GenreProvider } from '../context/GenreContext';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const API_KEY = process.env.NEXT_PUBLIC_MOVIEDB_API_KEY;
  const BASE_URL = process.env.NEXT_PUBLIC_MOVIEDB_API_BASE_URL;

  useEffect(() => {
    const createGuestSession = async () => {
      if (localStorage.getItem('guest_session_id')) return;

      try {
        const res = await fetch(`${BASE_URL}/authentication/guest_session/new?api_key=${API_KEY}`);
        const data = await res.json();
        localStorage.setItem('guest_session_id', data.guest_session_id);
      } catch (error) {
        console.error('Failed to create guest session', error);
      }
    };

    createGuestSession();
  }, [API_KEY, BASE_URL]);

  return (
    <StyleProvider hashPriority="high">
      <ConfigProvider>
        <GenreProvider>{children}</GenreProvider>
      </ConfigProvider>
    </StyleProvider>
  );
}
