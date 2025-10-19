import type { Metadata } from "next";
import "@/styles/global.css";

export const metadata: Metadata = {
  title: "Juicee",
  description: "Juicee dashboard application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-[#f7ede6] to-[#f8d0b9] min-h-screen">
        {children}
      </body>
    </html>
  );
}
