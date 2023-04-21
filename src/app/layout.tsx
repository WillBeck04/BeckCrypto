import { Navbar } from "@/components/navbar";
import "./globals.css";
import { Providers } from "./providers";
import { Footer } from "@/components/footer";
import { Container } from "@/components/container";
import { Inter } from "next/font/google";

export const metadata = {
  title: "Crypto-app",
  description: "Cryptocurrency market app",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} font-sans`}
    >
      <body>
        <Providers>
          <Navbar />
          <Container>{children}</Container>
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
