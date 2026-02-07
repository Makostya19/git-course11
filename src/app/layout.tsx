import "antd/dist/reset.css";
import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
