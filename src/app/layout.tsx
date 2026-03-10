import { Navbar } from "@/components/Layout/Navbar";
import { BottomNav } from "@/components/Layout/BottomNav";
import { CartModal } from "@/components/CartModal"; // Yo'lga e'tibor bering
import { InstallPWA } from "@/components/Layout/InstallPWA";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="bg-slate-50 antialiased overflow-x-hidden italic-none">
        {/* TEPADAGI NAVBAR */}
        <Navbar />

        {/* ASOSIY KONTENT */}
        <main className="min-h-screen pb-32 pt-4">
          {children}
        </main>

        {/* SAVATCHA MODALI (Har doim tayyor turadi, tugma bosilganda ochiladi) */}
        <InstallPWA />
        <CartModal />

        {/* PASTDAGI NAVIGATION */}
        <BottomNav />
      </body>
    </html>
  );
}
