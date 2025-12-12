import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEN Group - Экосистема доверия и управления будущего",
  description:
    "Мы создаём технологии и сервисы, которые укрепляют доверие — внутри организаций, между командами, партнёрами и обществом. SenDigital, SenTechAudit, SenFinance и другие компании экосистемы SEN.",
  keywords:
    "SEN Group, технологии, финтех, цифровая трансформация, консалтинг, аудит, доверие, инновации",
  authors: [{ name: "SEN Group" }],
  openGraph: {
    title: "SEN Group - Экосистема доверия и управления будущего",
    description:
      "Честность + Технологии + Данные + Люди + Инновации = Экосистема доверия и управления будущего",
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

