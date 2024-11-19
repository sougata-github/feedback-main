import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Lato } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "EasyReview",
  description: "A feedback collector built using Next.js.",
};

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
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
          className={`${GeistSans.variable} ${lato.variable} antialiased relative`}
        >
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
