import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ghost OS - Portfolio",
  description: "A cyberpunk-themed portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>Ghost OS - Portfolio</title>
        <meta name="description" content="A cyberpunk-themed portfolio website" />
        <meta property="og:title" content="Ghost OS - Portfolio" />
        <meta property="og:description" content="A cyberpunk/hacker-themed portfolio OS web app. Draggable windows, terminal, games, and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://your-domain.com/" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ghost OS - Portfolio" />
        <meta name="twitter:description" content="A cyberpunk/hacker-themed portfolio OS web app. Draggable windows, terminal, games, and more." />
        <meta name="twitter:image" content="/og-image.png" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://your-domain.com/" />
      </Head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
