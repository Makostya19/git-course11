import 'antd/dist/reset.css';
import type { Metadata } from 'next';
import { ConfigProvider } from 'antd';
import './globals.css';

export const metadata: Metadata = {
  title: 'Movie Search App',
  description: 'Search for movies using MovieDB API',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <ConfigProvider>{children}</ConfigProvider>
      </body>
    </html>
  );
}
