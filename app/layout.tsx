import "./globals.css";
import { CartProvider } from "@/src/contexts/CartContext";
import { UserProvider } from "@/src/contexts/UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "@/components/ui/sonner";
import { Manrope } from "next/font/google";
import { WhatsappFab } from "@/src/components/global/WhatsappFab";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body
        className={`${manrope.className} antialiased selection:bg-blue-600 selection:text-white`}
      >
        {/* Global liquid glass background – shared across all pages */}
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
>
            <div className="liquid-canvas">
              <div className="orb orb-1" />
              <div className="orb orb-2" />
            </div>        
          <UserProvider>
            <CartProvider>
              {children}
              <Toaster />
              <WhatsappFab />
            </CartProvider>
          </UserProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
