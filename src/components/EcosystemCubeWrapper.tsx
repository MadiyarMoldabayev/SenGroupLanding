"use client";

import dynamic from "next/dynamic";

const EcosystemCube = dynamic(() => import("./EcosystemCube"), {
  ssr: false,
  loading: () => (
    <section className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8 xl:px-0">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full glass text-sm text-primary mb-6">
            Интерактивная 3D модель
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6">
            Экосистема <span className="gradient-text">SEN</span> в 3D
          </h2>
          <p className="text-muted text-lg md:text-xl max-w-3xl mx-auto">
            Нажмите на грань куба, чтобы узнать больше о компании
          </p>
        </div>
        <div className="w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-3xl overflow-hidden glass flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted">Загрузка 3D модели...</p>
          </div>
        </div>
      </div>
    </section>
  ),
});

interface EcosystemCubeWrapperProps {
  locale: string;
}

export default function EcosystemCubeWrapper({ locale }: EcosystemCubeWrapperProps) {
  return <EcosystemCube locale={locale} />;
}
