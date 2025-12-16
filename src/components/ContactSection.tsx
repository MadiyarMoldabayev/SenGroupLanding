"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

interface ContactSectionProps {
  locale: string;
}

const contactTranslations = {
  ru: {
    badge: "Связаться с нами",
    title: "Начните работать с",
    subtitle: "Мы готовы обсудить ваш проект и предложить оптимальные решения",
    submittedTitle: "Спасибо за обращение!",
    submittedText: "Мы свяжемся с вами в ближайшее время",
    submitAgain: "Отправить ещё",
    nameLabel: "Ваше имя *",
    emailLabel: "Email *",
    companyLabel: "Компания",
    messageLabel: "Сообщение *",
    namePlaceholder: "Сегизбай Айман",
    emailPlaceholder: "aiman@company.com",
    companyPlaceholder: "ТОО 'Company'",
    messagePlaceholder: "Расскажите о вашем проекте...",
    submitting: "Отправка...",
    submit: "Отправить сообщение",
    contactInfo: "Контактная информация",
    socialNetworks: "Социальные сети",
    languages: "Мы работаем на русском, казахском и английском языках",
    contactInfoItems: [
      { title: "Адрес", value: "Казахстан, г. Астана" },
      { title: "Email", value: "info@sengroup.one", href: "mailto:info@sengroup.one" },
      { title: "Телефон", value: "+7 (778) 625-19-24", href: "tel:+77786251924" },
      { title: "Режим работы", value: "Пн-Пт: 10:00 - 19:00" },
    ],
  },
  kk: {
    badge: "Бізбен байланысу",
    title: "Жұмысты бастаңыз",
    subtitle: "Біз сіздің жобаңызды талқылауға және оңтайлы шешімдер ұсынуға дайынбыз",
    submittedTitle: "Хабарласқаныңызға рахмет!",
    submittedText: "Біз жақын арада сізбен байланысамыз",
    submitAgain: "Тағы жіберу",
    nameLabel: "Атыңыз *",
    emailLabel: "Email *",
    companyLabel: "Компания",
    messageLabel: "Хабарлама *",
    namePlaceholder: "Сегізбай Айман",
    emailPlaceholder: "aiman@company.com",
    companyPlaceholder: "ЖШС 'Company'",
    messagePlaceholder: "Жобаңыз туралы айтыңыз...",
    submitting: "Жіберілуде...",
    submit: "Хабарлама жіберу",
    contactInfo: "Байланыс ақпараты",
    socialNetworks: "Әлеуметтік желілер",
    languages: "Біз орыс, қазақ және ағылшын тілдерінде жұмыс істейміз",
    contactInfoItems: [
      { title: "Мекен-жай", value: "Қазақстан, Астана қ." },
      { title: "Email", value: "info@sengroup.one", href: "mailto:info@sengroup.one" },
      { title: "Телефон", value: "+7 (778) 625-19-24", href: "tel:+77786251924" },
      { title: "Жұмыс режимі", value: "Дүйсенбі-Жұма: 10:00 - 19:00" },
    ],
  },
  en: {
    badge: "Contact Us",
    title: "Start working with",
    subtitle: "We are ready to discuss your project and offer optimal solutions",
    submittedTitle: "Thank you for contacting us!",
    submittedText: "We will contact you shortly",
    submitAgain: "Send again",
    nameLabel: "Your name *",
    emailLabel: "Email *",
    companyLabel: "Company",
    messageLabel: "Message *",
    namePlaceholder: "Aiman Segizbay",
    emailPlaceholder: "aiman@company.com",
    companyPlaceholder: "LLP 'Company'",
    messagePlaceholder: "Tell us about your project...",
    submitting: "Sending...",
    submit: "Send message",
    contactInfo: "Contact Information",
    socialNetworks: "Social Networks",
    languages: "We work in Russian, Kazakh and English",
    contactInfoItems: [
      { title: "Address", value: "Kazakhstan, Astana" },
      { title: "Email", value: "info@sengroup.one", href: "mailto:info@sengroup.one" },
      { title: "Phone", value: "+7 (778) 625-19-24", href: "tel:+77786251924" },
      { title: "Working hours", value: "Mon-Fri: 10:00 - 19:00" },
    ],
  },
};

export default function ContactSection({ locale }: ContactSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const t = contactTranslations[locale as keyof typeof contactTranslations] || contactTranslations.ru;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: "", email: "", company: "", message: "" });
  };

  const contactInfoIcons = [
    <svg key="1" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>,
    <svg key="2" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>,
    <svg key="3" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>,
    <svg key="4" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>,
  ];

  return (
    <section id="contact" className="py-24 md:py-32 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 xl:px-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-sm text-primary mb-6">
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6">
            {t.title}{" "}
            <span className="gradient-text">SENGROUP</span>
          </h2>
          <p className="text-muted text-lg md:text-xl max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-3xl p-8"
          >
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {t.submittedTitle}
                </h3>
                <p className="text-muted mb-6">
                  {t.submittedText}
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="btn-secondary text-sm"
                >
                  {t.submitAgain}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-light mb-2">
                      {t.nameLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-dark/50 border border-border rounded-xl text-white placeholder-muted focus:outline-none focus:border-primary transition-colors"
                      placeholder={t.namePlaceholder}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-light mb-2">
                      {t.emailLabel}
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-dark/50 border border-border rounded-xl text-white placeholder-muted focus:outline-none focus:border-primary transition-colors"
                      placeholder={t.emailPlaceholder}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-light mb-2">
                    {t.companyLabel}
                  </label>
                  <input
                    type="text"
                    value={formState.company}
                    onChange={(e) =>
                      setFormState({ ...formState, company: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-dark/50 border border-border rounded-xl text-white placeholder-muted focus:outline-none focus:border-primary transition-colors"
                    placeholder={t.companyPlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-light mb-2">
                    {t.messageLabel}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-dark/50 border border-border rounded-xl text-white placeholder-muted focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder={t.messagePlaceholder}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      {t.submitting}
                    </>
                  ) : (
                    <>
                      {t.submit}
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="glass rounded-3xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">
                {t.contactInfo}
              </h3>
              <div className="space-y-6">
                {t.contactInfoItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary shrink-0">
                      {contactInfoIcons[index]}
                    </div>
                    <div>
                      <p className="text-sm text-muted mb-1">{item.title}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-white hover:text-primary transition-colors font-medium"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-white font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="glass rounded-3xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">
                {t.socialNetworks}
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: "LinkedIn", href: "#", icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  )},
                  { name: "Instagram", href: "#", icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  )},
                  { name: "Facebook", href: "#", icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  )},
                  { name: "WhatsApp", href: "#", icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  )},
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="flex items-center justify-center w-12 h-12 glass rounded-full text-muted hover:text-white hover:bg-border/30 transition-all"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="flex items-center gap-3 p-4 glass rounded-xl">
              <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
              <p className="text-sm text-muted">
                {t.languages}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

