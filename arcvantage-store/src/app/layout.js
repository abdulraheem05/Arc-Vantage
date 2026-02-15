import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "./providers";

export const metadata = {
  title : "Arc Vantage",
  description : "Kitchen & Household appliances"
}

export default function RootLayout({children}){
  return(
    <html lang="en">
    <body>
      <Providers>
        
        <main>{children}</main>
      </Providers>
    </body>
  </html>
  )
}