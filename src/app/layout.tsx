import "antd/dist/reset.css";
import type { Metadata } from "next";
import "./globals.css";
import AntdLayout from "./components/AntdLayout";

export const metadata: Metadata = {
  title: "Movie Search App",
  description: "Search movies using TMDB API",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AntdLayout>{children}</AntdLayout>
      </body>
    </html>
  );
}
