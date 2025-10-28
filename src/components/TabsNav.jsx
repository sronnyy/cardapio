"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { motion } from "framer-motion";
import { FaLeaf, FaUtensils, FaIceCream, FaGlassMartini, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRef } from "react";

const tabs = [
  { href: "/bebidas",           label: "Bebidas",        seg: "bebidas",           icon: FaGlassMartini, prefetch: true },
  { href: "/entradas",          label: "Entradas",       seg: "entradas",          icon: FaLeaf,         prefetch: true },
  { href: "/frutos-do-mar",     label: "Frutos do Mar",  seg: "frutos-do-mar",     icon: FaUtensils,     prefetch: true },
  { href: "/moqueca",           label: "Moquecas",       seg: "moqueca",           icon: FaUtensils,     prefetch: true },
  { href: "/risotos",           label: "Risotos",        seg: "risotos",           icon: FaUtensils,     prefetch: true },
  { href: "/massas",            label: "Massas",         seg: "massas",            icon: FaUtensils,     prefetch: true },
  { href: "/pratos-executivos", label: "Executivos",     seg: "pratos-executivos", icon: FaUtensils,     prefetch: true },
  { href: "/sobremesas",        label: "Sobremesas",     seg: "sobremesas",        icon: FaIceCream,     prefetch: true },
];

const palette = {
  primary: "#628a4c",
  primaryLight: "#8db573",
  primaryDark: "#4a6a3a",
};

export default function TabsNav() {
  const seg = useSelectedLayoutSegment();
  const isActive = (s) => seg === s || (seg === null && s === "entradas");
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Visível em todas as telas; sticky abaixo do header */}
      <nav
        className="sticky top-20 z-40 bg-white/98 backdrop-blur-3xl border-b border-neutral-100 shadow-sm"
        role="tablist"
        aria-label="Navegação do cardápio"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* faixa rolável no mobile; centraliza no desktop */}
          <div className="relative flex items-center">
            {/* Botão esquerdo - visível em todas as telas */}
            <button
              onClick={scrollLeft}
              className="flex-shrink-0 mr-3 bg-white border border-gray-300 rounded-xl p-2.5 shadow-sm hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 active:scale-95"
              aria-label="Rolar para esquerda"
            >
              <FaChevronLeft className="w-4 h-4 text-gray-700" />
            </button>

            <div
              ref={scrollContainerRef}
              className="flex gap-3 md:gap-4 py-3 md:py-4 px-2 md:px-0 overflow-x-auto no-scrollbar snap-x snap-mandatory md:justify-center flex-1"
              style={{
                WebkitOverflowScrolling: "touch",
                scrollPaddingInline: "1rem",
              }}
            >
              {tabs.map((t) => {
                const active = isActive(t.seg);
                const Icon = t.icon;

                return (
                  <Link
                    key={t.href}
                    href={t.href}
                    prefetch={t.prefetch}
                    className="relative group snap-start"
                    role="tab"
                    aria-selected={active}
                    aria-current={active ? "page" : undefined}
                  >
                    <motion.div
                      className={[
                        // padding responsivo e hit-area grande
                        "relative min-w-max px-5 md:px-6 py-3 md:py-3.5 rounded-2xl",
                        "transition-all duration-300 ease-out border",
                        active
                          ? "bg-white border-gray-200 shadow-lg"
                          : "bg-white/80 border-gray-200/70 hover:bg-white/95"
                      ].join(" ")}
                      whileHover={{ y: -1, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* fundo ativo com animação suave */}
                      {active && (
                        <motion.div
                          className="absolute inset-0 rounded-2xl"
                          style={{
                            background: `linear-gradient(90deg, ${palette.primary}14, ${palette.primaryLight}10)`,
                          }}
                          layoutId="activeTabBackground"
                          transition={{ type: "spring", stiffness: 320, damping: 28 }}
                        />
                      )}

                      <div className="relative z-10 flex items-center gap-3 md:gap-3.5">
                        <div
                          className="p-2 md:p-2.5 rounded-xl transition-colors duration-300"
                          style={{
                            backgroundColor: active ? "rgba(98,138,76,0.12)" : "rgba(0,0,0,0.04)",
                          }}
                        >
                          <Icon
                            className={active ? "scale-110" : "scale-100"}
                            style={{
                              color: active ? palette.primary : "#6b7280",
                              fontSize: 18,
                              transition: "transform .3s",
                            }}
                            aria-hidden="true"
                          />
                        </div>

                        <span
                          className="text-[0.95rem] md:text-base font-semibold tracking-wide"
                          style={{ color: active ? palette.primaryDark : "#374151" }}
                        >
                          {t.label}
                        </span>
                      </div>

                      {/* indicador inferior */}
                      {active && (
                        <motion.div
                          className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 h-1 rounded-t-full"
                          style={{
                            width: 64,
                            background: `linear-gradient(90deg, ${palette.primary}, ${palette.primaryLight})`,
                          }}
                          layoutId="activeTabIndicator"
                          transition={{ type: "spring", stiffness: 320, damping: 28 }}
                        />
                      )}
                    </motion.div>
                  </Link>
                );
              })}
            </div>

            {/* Botão direito - visível em todas as telas */}
            <button
              onClick={scrollRight}
              className="flex-shrink-0 ml-3 bg-white border border-gray-300 rounded-xl p-2.5 shadow-sm hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 active:scale-95"
              aria-label="Rolar para direita"
            >
              <FaChevronRight className="w-4 h-4 text-gray-700" />
            </button>
          </div>
        </div>
      </nav>

      {/* Se existir footer fixo no mobile, aumente este espaçador */}
      <div className="md:hidden h-2" aria-hidden="true" />

      {/* utilitários globais */}
      <style jsx global>{`
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}