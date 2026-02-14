import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title : "Arc Vantage",
  description : "Kitchen & Household appliances"
}

export default function RootLayout({children}){
  <html lang="en">
    <body>
      <Providers>{children}</Providers>
    </body>
  </html>
}