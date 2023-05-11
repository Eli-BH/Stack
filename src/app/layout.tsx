import "./globals.css";
import { Inter, Comfortaa } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["400", "700", "300", "500", "600"],
  variable: "--font-comfortaa",
});

export const metadata = {
  title: "Stack",
  description: "Tech Stack Suggester",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${comfortaa.variable} font-sans`}>{children}</body>
    </html>
  );
}
