import { Navbar } from "@/components/Layout/Navbar";
import { BottomNav } from "@/components/Layout/BottomNav";
import { CartModal } from "@/components/CartModal";
import { InstallPWA } from "@/components/Layout/InstallPWA";
import "./globals.css";

export const metadata = {
  title: "Fruktu.kg - Доставка свежих овощей и фруктов",
  description: "Самые свежие продукты в Бишкеке с доставкой до двери",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#10B981" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="bg-slate-50 antialiased overflow-x-hidden">
        {/* TEPADAGI NAVBAR */}
        <Navbar />

        {/* ASOSIY KONTENT */}
        <main className="min-h-screen pb-32 pt-4">
          {children}
        </main>

        {/* PWA VA SAVATCHA */}
        <InstallPWA />
        <CartModal />

        {/* PASTDAGI NAVIGATION */}
        <BottomNav />
      </body>
    </html>
  );
}
