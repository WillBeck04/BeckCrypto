import { Navbar } from "@/components/navbar";
import "./globals.css";
import { Providers } from "./providers";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Crypto-app",
  description: "Cryptocurrency market app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {/* @ts-expect-error Async Server Component */}
          <Navbar />
          {children}
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
