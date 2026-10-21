import type { Metadata } from "next";
import { Cinzel, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["500", "700", "900"],
  variable: "--font-cinzel",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Lord of the Chickens | Taverna de Frango Crocante da Terra Média",
  description:
    "Lord of the Chickens - Taverna de Frango Crocante da Terra Média. Cardápio online com combos épicos, asinhas picantes e batatas rústicas!",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${cinzel.variable} ${jakarta.variable}`}>
      <body>{children}</body>
    </html>
  );
}
