import "./globals.css";
import { Cinzel, Poppins } from "next/font/google";
import Providers from "./providers";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import MiniCart from "@/components/MiniCart";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${poppins.variable}`}>
      <body>
        <Providers>
          <Navbar/>
          <MiniCart />
          {children}
          <SiteFooter/>
        </Providers>
      </body>
    </html>
  );
}