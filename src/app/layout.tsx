import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SENGROUP - Экосистема доверия будущего",
  description:
    "Мы создаём технологии и сервисы, которые укрепляют доверие — внутри организаций, между командами, партнёрами и обществом. SENDIGITAL, SENAUDIT, SENFINANCE и другие компании экосистемы SEN.",
  keywords:
    "SENGROUP, технологии, финтех, цифровая трансформация, консалтинг, аудит, доверие, инновации",
  authors: [{ name: "SENGROUP" }],
  openGraph: {
    title: "SENGROUP - Экосистема доверия будущего",
    description:
      "Честность + Технологии + Данные + Люди + Инновации + Инвестиции = Экосистема доверия будущего",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="antialiased">{children}</body>
    </html>
  );
}

