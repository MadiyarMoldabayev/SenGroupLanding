"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const cubeTranslations = {
  ru: {
    badge: "Интерактивная 3D модель",
    title: "Экосистема",
    titleHighlight: "SEN",
    titleSuffix: "в 3D",
    subtitle: "Нажмите на грань куба, чтобы узнать больше о компании",
    loading: "Загрузка 3D модели...",
    company: "КОМПАНИЯ",
    products: "Продукты:",
    hover: "Наведите для подсветки",
    click: "Нажмите для деталей",
    drag: "Перетащите для вращения",
  },
  kk: {
    badge: "Интерактивті 3D модель",
    title: "Экожүйе",
    titleHighlight: "SEN",
    titleSuffix: "3D-де",
    subtitle: "Компания туралы көбірек білу үшін кубтың бетін басыңыз",
    loading: "3D модель жүктелуде...",
    company: "КОМПАНИЯ",
    products: "Өнімдер:",
    hover: "Жарық түсіру үшін меңзеңіз",
    click: "Мәліметтер үшін басыңыз",
    drag: "Айналдыру үшін сүйреңіз",
  },
  en: {
    badge: "Interactive 3D Model",
    title: "Ecosystem",
    titleHighlight: "SEN",
    titleSuffix: "in 3D",
    subtitle: "Click on a cube face to learn more about the company",
    loading: "Loading 3D model...",
    company: "COMPANY",
    products: "Products:",
    hover: "Hover to highlight",
    click: "Click for details",
    drag: "Drag to rotate",
  },
};

interface CompanyData {
  name: string;
  desc: string;
  products: { name: string; desc: string }[];
}

interface CompaniesDataMap {
  [key: string]: CompanyData;
}

const COMPANIES_DATA: CompaniesDataMap = {
  front: {
    name: "SEN DIGITAL",
    desc: "Цифровые решения для социального сектора",
    products: [
      { name: "ERP для НПО", desc: "Система управления ресурсами для некоммерческих организаций" },
      { name: "ERP для доноров", desc: "Платформа управления донорскими программами" },
      { name: "Портал благополучателя", desc: "Интерфейс для взаимодействия с благополучателями" },
      { name: "ИИ-агент для ERP", desc: "Интеллектуальный помощник для автоматизации процессов" },
    ],
  },
  left: {
    name: "SEN CONSULTING",
    desc: "Консалтинговые услуги и аналитика",
    products: [
      { name: "Social Impact Score", desc: "Метрика оценки социального воздействия для НПО" },
      { name: "GovTech-аналитика", desc: "Аналитика социального сектора для государственных структур" },
    ],
  },
  right: {
    name: "SEN FINANCE",
    desc: "Финансовые решения для социального сектора",
    products: [
      { name: "Социальный кредит", desc: "Кредитные продукты для социальных проектов" },
      { name: "Blockchain-модуль", desc: "Блокчейн-решения для прозрачности финансовых операций" },
      { name: "Социальный банк", desc: "Банковские услуги для НПО и социальных предпринимателей" },
    ],
  },
  top: {
    name: "SEN GROUP",
    desc: "Группа компаний экосистемы",
    products: [
      { name: "Корпоративный портал", desc: "Единый портал экосистемы SEN GROUP" },
      { name: "Marketplace", desc: "Retail Hub - маркетплейс для розничной торговли" },
      { name: "PR & Marketing Hub", desc: "Центр производства PR и маркетинговых материалов" },
    ],
  },
  bottom: {
    name: "FOUNDATION HUB",
    desc: "Хаб фонда и социальных инициатив",
    products: [
      { name: "Портал фонда", desc: "Официальный портал фонда" },
      { name: "Платформа волонтеров", desc: "Платформа для волонтеров и вакансий НПО" },
      { name: "LMS-система", desc: "Система управления обучением" },
      { name: "Community", desc: "Социальная сеть и сообщество" },
    ],
  },
};

export default function EcosystemCube() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCompany, setSelectedCompany] = useState<CompanyData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const sceneRef = useRef<any>(null);
  const [lang, setLang] = useState("ru");

  useEffect(() => {
    const savedLang = localStorage.getItem("sen-lang");
    if (savedLang && ["ru", "kk", "en"].includes(savedLang)) {
      setLang(savedLang);
    }

    const handleLangChange = (e: CustomEvent) => {
      setLang(e.detail);
    };

    window.addEventListener("langChange", handleLangChange as EventListener);
    return () => window.removeEventListener("langChange", handleLangChange as EventListener);
  }, []);

  const t = cubeTranslations[lang as keyof typeof cubeTranslations];

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    let scene: any, camera: any, renderer: any, controls: any;
    let mainCubeGroup: any;
    let raycaster: any, mouse: any;
    let hoveredFace: any = null;
    let animationId: number;

    const loadThree = async () => {
      const THREE = await import("three");
      const { OrbitControls } = await import("three/examples/jsm/controls/OrbitControls.js");
      const gsap = (await import("gsap")).default;

      const CONFIG = {
        smallCubeSize: 0.8,
        gap: 0.05,
        primaryColor: "#0A84FF",
        secondaryColor: "#5856D6",
        accentColor: "#00D4AA",
      };

      // Scene setup
      scene = new THREE.Scene();
      scene.background = null; // Transparent background

      camera = new THREE.PerspectiveCamera(45, containerRef.current!.clientWidth / containerRef.current!.clientHeight, 0.1, 100);
      camera.position.set(5, 4, 5);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(containerRef.current!.clientWidth, containerRef.current!.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      containerRef.current!.appendChild(renderer.domElement);

      // Lighting - brighter setup
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
      scene.add(ambientLight);

      const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
      dirLight.position.set(5, 10, 7);
      dirLight.castShadow = true;
      scene.add(dirLight);

      const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
      dirLight2.position.set(-5, 5, -5);
      scene.add(dirLight2);

      const fillLight = new THREE.DirectionalLight(0x5856D6, 0.5);
      fillLight.position.set(-5, 0, -5);
      scene.add(fillLight);

      const accentLight = new THREE.PointLight(0x00D4AA, 0.8, 20);
      accentLight.position.set(0, 5, 0);
      scene.add(accentLight);

      const backLight = new THREE.PointLight(0x0A84FF, 0.6, 20);
      backLight.position.set(0, -5, 0);
      scene.add(backLight);

      // Create text texture
      function createTextTexture(text: string, bgColor: string = "#1a2540", textColor: string = "#ffffff") {
        const canvas = document.createElement("canvas");
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext("2d")!;

        // Gradient background - brighter
        const gradient = ctx.createLinearGradient(0, 0, 512, 512);
        gradient.addColorStop(0, bgColor);
        gradient.addColorStop(1, "#2a3555");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 512, 512);

        // Border glow effect - brighter
        ctx.shadowColor = CONFIG.primaryColor;
        ctx.shadowBlur = 30;
        ctx.strokeStyle = CONFIG.primaryColor;
        ctx.lineWidth = 6;
        ctx.strokeRect(8, 8, 496, 496);
        ctx.shadowBlur = 0;

        // Auto-size text
        let fontSize = 60;
        const lines = text.split("\n");
        ctx.font = `700 ${fontSize}px "Inter", system-ui, sans-serif`;

        while (fontSize > 20) {
          let fits = true;
          for (const line of lines) {
            if (ctx.measureText(line).width > 400) {
              fits = false;
              break;
            }
          }
          if (fits) break;
          fontSize -= 4;
          ctx.font = `700 ${fontSize}px "Inter", system-ui, sans-serif`;
        }

        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const lineHeight = fontSize * 1.3;
        lines.forEach((line, i) => {
          const offset = (i - (lines.length - 1) / 2) * lineHeight;
          ctx.fillText(line, 256, 256 + offset);
        });

        const tex = new THREE.CanvasTexture(canvas);
        tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
        return tex;
      }

      // Create main cube
      mainCubeGroup = new THREE.Group();
      const allCubes: any[] = [];
      const cubeSize = CONFIG.smallCubeSize;
      const spacing = cubeSize + CONFIG.gap;

      const faceMappings: { [key: string]: { center: { x: number; y: number; z: number } } } = {
        front: { center: { x: 0, y: 0, z: 1 } },
        back: { center: { x: 0, y: 0, z: -1 } },
        right: { center: { x: 1, y: 0, z: 0 } },
        left: { center: { x: -1, y: 0, z: 0 } },
        top: { center: { x: 0, y: 1, z: 0 } },
        bottom: { center: { x: 0, y: -1, z: 0 } },
      };

      const faceColors: { [key: string]: string } = {
        front: CONFIG.primaryColor,
        left: CONFIG.secondaryColor,
        right: CONFIG.accentColor,
        top: "#FF6B6B",
        bottom: "#FFE66D",
        back: "#4ECDC4",
      };

      // Create 3x3x3 grid
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          for (let z = -1; z <= 1; z++) {
            const px = x * spacing;
            const py = y * spacing;
            const pz = z * spacing;

            let companyName: string | null = null;
            let faceName: string | null = null;
            let faceColor = "#1a1a2e";

            for (const [face, mapping] of Object.entries(faceMappings)) {
              const center = mapping.center;
              if (x === center.x && y === center.y && z === center.z) {
                const company = COMPANIES_DATA[face];
                if (company && company.name) {
                  companyName = company.name;
                  faceName = face;
                  faceColor = faceColors[face];
                  break;
                }
              }
            }

            const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
            let material;

            if (companyName) {
              const textMap = createTextTexture(companyName, "#1a2540", "#ffffff");
              material = new THREE.MeshStandardMaterial({
                map: textMap,
                roughness: 0.3,
                metalness: 0.15,
                emissive: new THREE.Color(faceColor),
                emissiveIntensity: 0.25,
              });
            } else {
              material = new THREE.MeshStandardMaterial({
                color: 0x2a3555,
                roughness: 0.4,
                metalness: 0.15,
                transparent: true,
                opacity: 0.9,
              });
            }

            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(px, py, pz);
            cube.castShadow = true;
            cube.receiveShadow = true;

            cube.userData = {
              type: "mainCubeCell",
              gridPos: { x, y, z },
              faceName: faceName,
              companyName: companyName,
              originalColor: faceColor,
            };

            mainCubeGroup.add(cube);
            allCubes.push(cube);
          }
        }
      }

      mainCubeGroup.userData = { cubes: allCubes };
      scene.add(mainCubeGroup);

      // Intro animation
      mainCubeGroup.scale.set(0, 0, 0);
      mainCubeGroup.rotation.y = Math.PI;
      gsap.to(mainCubeGroup.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)",
        delay: 0.3,
      });
      gsap.to(mainCubeGroup.rotation, {
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.3,
      });

      // Controls
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.8;
      controls.maxDistance = 15;
      controls.minDistance = 4;
      controls.enablePan = false;

      // Interaction
      raycaster = new THREE.Raycaster();
      mouse = new THREE.Vector2();

      function getFaceFromIntersection(intersection: any) {
        const cube = intersection.object;
        return cube.userData?.faceName || null;
      }

      function onMouseMove(event: MouseEvent) {
        const rect = containerRef.current!.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(allCubes, true);

        if (intersects.length > 0) {
          const cube = intersects[0].object;
          const faceName = getFaceFromIntersection(intersects[0]);
          const company = faceName ? COMPANIES_DATA[faceName] : null;

          if (company && company.name && hoveredFace !== cube) {
            if (hoveredFace) {
              gsap.to(hoveredFace.scale, { x: 1, y: 1, z: 1, duration: 0.3 });
              if (hoveredFace.material.emissive) {
                gsap.to(hoveredFace.material, { emissiveIntensity: 0.1, duration: 0.3 });
              }
            }
            hoveredFace = cube;
            containerRef.current!.style.cursor = "pointer";

            gsap.to(cube.scale, { x: 1.15, y: 1.15, z: 1.15, duration: 0.3 });
            if (cube.material.emissive) {
              gsap.to(cube.material, { emissiveIntensity: 0.4, duration: 0.3 });
            }
          }
        } else {
          if (hoveredFace) {
            gsap.to(hoveredFace.scale, { x: 1, y: 1, z: 1, duration: 0.3 });
            if (hoveredFace.material.emissive) {
              gsap.to(hoveredFace.material, { emissiveIntensity: 0.1, duration: 0.3 });
            }
            hoveredFace = null;
            containerRef.current!.style.cursor = "default";
          }
        }
      }

      function onClick(event: MouseEvent) {
        const rect = containerRef.current!.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(allCubes, true);

        if (intersects.length > 0) {
          const faceName = getFaceFromIntersection(intersects[0]);
          const company = faceName ? COMPANIES_DATA[faceName] : null;
          if (company && company.name) {
            setSelectedCompany(company);
            controls.autoRotate = false;
          }
        }
      }

      containerRef.current!.addEventListener("mousemove", onMouseMove);
      containerRef.current!.addEventListener("click", onClick);

      function onResize() {
        if (!containerRef.current) return;
        camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      }

      window.addEventListener("resize", onResize);

      function animate() {
        animationId = requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      }

      setIsLoaded(true);
      animate();

      sceneRef.current = { controls };

      return () => {
        window.removeEventListener("resize", onResize);
        containerRef.current?.removeEventListener("mousemove", onMouseMove);
        containerRef.current?.removeEventListener("click", onClick);
        cancelAnimationFrame(animationId);
        renderer.dispose();
        if (containerRef.current && renderer.domElement) {
          containerRef.current.removeChild(renderer.domElement);
        }
      };
    };

    loadThree();
  }, []);

  const closeCard = () => {
    setSelectedCompany(null);
    if (sceneRef.current?.controls) {
      sceneRef.current.controls.autoRotate = true;
    }
  };

  return (
    <section className="py-24 md:py-32 relative" id="cube3d">
      <div className="max-w-7xl mx-auto px-4 md:px-8 xl:px-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-sm text-primary mb-6">
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6">
            {t.title} <span className="gradient-text">{t.titleHighlight}</span> {t.titleSuffix}
          </h2>
          <p className="text-muted text-lg md:text-xl max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="relative">
          {/* 3D Canvas */}
          <div
            ref={containerRef}
            className="w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-3xl overflow-hidden glass"
          />

          {/* Loading overlay */}
          <AnimatePresence>
            {!isLoaded && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-dark/80 rounded-3xl"
              >
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-muted">{t.loading}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Company details card */}
          <AnimatePresence>
            {selectedCompany && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-[90%] sm:w-80 md:w-96 glass rounded-2xl p-6 md:p-8"
              >
                <button
                  onClick={closeCard}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-border/50 hover:bg-border flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 text-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold mb-4">
                  {t.company}
                </span>

                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                  {selectedCompany.name}
                </h3>

                <p className="text-muted text-sm mb-6">{selectedCompany.desc}</p>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-light">{t.products}</h4>
                  {selectedCompany.products.slice(0, 4).map((product, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                      <div>
                        <p className="text-sm text-white font-medium">{product.name}</p>
                        <p className="text-xs text-muted">{product.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-muted"
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            <span>{t.hover}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>{t.click}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>{t.drag}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

