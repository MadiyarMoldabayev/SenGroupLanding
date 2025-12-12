"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const ecosystemCompanies = [
  "SenDigital",
  "SenTechAudit",
  "SenFinance",
  "SenConsulting",
  "SenMedia",
  "FoundationHub",
];

const navigation = [
  { name: "Главная", href: "#hero" },
  { name: "Ценности", href: "#values" },
  { name: "Экосистема", href: "#ecosystem" },
  { name: "Стандарты", href: "#standards" },
  { name: "Контакты", href: "#contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 md:py-24 border-t border-border/30">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-darker to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 xl:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#hero" className="flex items-center mb-6 group">
              <Image
                src="/logo.png"
                alt="SEN Group"
                width={200}
                height={55}
                className="h-12 w-auto brightness-100 group-hover:brightness-110 transition-all duration-300"
              />
            </a>
            <p className="text-muted max-w-md mb-6 leading-relaxed">
              Экосистема доверия и управления будущего. Мы создаём технологии и
              сервисы, которые укрепляют доверие — внутри организаций, между
              командами, партнёрами и обществом.
            </p>
            <div className="flex items-center gap-3 text-sm">
              <span className="px-3 py-1.5 glass rounded-full text-accent">
                Технологии
              </span>
              <span className="px-3 py-1.5 glass rounded-full text-primary">
                Финтех
              </span>
              <span className="px-3 py-1.5 glass rounded-full text-secondary">
                Консалтинг
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-6">Навигация</h4>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-muted hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem */}
          <div>
            <h4 className="text-white font-semibold mb-6">Экосистема</h4>
            <ul className="space-y-3">
              {ecosystemCompanies.map((company) => (
                <li key={company}>
                  <a
                    href="#ecosystem"
                    className="text-muted hover:text-primary transition-colors text-sm"
                  >
                    {company}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Formula */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center py-8 border-y border-border/30 mb-8"
        >
          <p className="text-sm md:text-base text-muted">
            <span className="text-primary">Честность</span> +{" "}
            <span className="text-secondary">Технологии</span> +{" "}
            <span className="text-accent">Данные</span> +{" "}
            <span className="text-orange-400">Люди</span> +{" "}
            <span className="text-pink-400">Инновации</span> ={" "}
            <span className="text-white font-medium">
              Экосистема доверия и управления будущего
            </span>
          </p>
        </motion.div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted">
            © {currentYear} SEN Group. Все права защищены.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-muted hover:text-white transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#" className="text-sm text-muted hover:text-white transition-colors">
              Условия использования
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

