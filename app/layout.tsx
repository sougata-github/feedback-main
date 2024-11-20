import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Lato } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "EasyReview",
  description: "A feedback collector built using Next.js.",
};

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
});

const sempione = localFont({
  src: [
    {
      path: "./fonts/SempioneGrotesk-Black.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/SempioneGrotesk-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/SempioneGrotesk-ExtraBold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/SempioneGrotesk-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/SempioneGrotesk-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/SempioneGrotesk-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-local",
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
          className={`${GeistSans.className} ${lato.variable} ${sempione.variable} antialiased relative`}
        >
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
