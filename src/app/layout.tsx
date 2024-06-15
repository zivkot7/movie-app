import { Inter } from "next/font/google";
import "movie-app/styles/globals.css";
import Navabar from "movie-app/components/Navabar";
import StoreProvider from "./StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <Navabar />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
