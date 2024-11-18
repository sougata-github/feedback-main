import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "EasyReview",
  description: "A feedback collector built using Next.js.",
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${GeistSans.variable} ${roboto.variable} antialiased relative`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
