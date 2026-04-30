import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LogiSight Dashboard",
  description: "Premium logistics management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#020617] text-white antialiased overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
