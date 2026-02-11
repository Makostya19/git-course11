import 'antd/dist/reset.css';
import type { Metadata } from 'next';
import './globals.css';
import { ClientProviders } from './components/ClientProviders';

export const metadata: Metadata = {
  title: 'Movie Search App',
  description: 'Search for movies using MovieDB API',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <ClientProviders>
          <div>{children}</div> {/* <- добавлено, чтобы Next.js точно увидел страницу */}
        </ClientProviders>
      </body>
    </html>
  );
}
