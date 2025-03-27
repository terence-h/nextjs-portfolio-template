import type { Metadata } from "next";
import "./globals.css";
import SmoothScrolling from "./utils/smooth-scrolling";
import general from "./data/general.json";

export const metadata: Metadata = {
  title: `${general.name}'s Portfolio`,
  description: `${general.name}'s Portfolio`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link id="favicon" rel="icon" href="/images/favicon-light.ico" />
      </head>
      <body className="antialiased">
        <SmoothScrolling>{children}</SmoothScrolling>
      </body>
    </html>
  );
}