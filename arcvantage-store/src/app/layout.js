import { Cinzel } from "next/font/google";
import "./globals.css"; // Ensure this is imported!
import Providers from "./providers";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-cinzel", // This is the key link
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={cinzel.variable}>
      <body className="font-cinzel antialiased bg-white">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}