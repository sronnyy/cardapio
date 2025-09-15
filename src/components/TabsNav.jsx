"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { motion } from "framer-motion";

const tabs = [
  { prefetch: true, href: "/entradas",   label: "Entradas",           seg: "entradas" },
  { prefetch: true, href: "/pratos",     label: "Principal",  seg: "pratos" },
  { prefetch: true, href: "/sobremesas", label: "Sobremesas",         seg: "sobremesas" },
  { prefetch: true, href: "/bebidas",    label: "Bebidas",            seg: "bebidas" },
];
 
export default function TabsNav() {
  const seg = useSelectedLayoutSegment();

  return (
    <nav className="sticky top-20 z-40 bg-white/95 backdrop-blur-2xl border-b border-neutral-100 shadow-sm">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex gap-1 overflow-x-auto py-3">
          {tabs.map((t, index) => {
            const active = seg === t.seg || (seg === null && t.seg === "entradas");
            return (
              <Link
                key={t.href}
                href={t.href}
                prefetch={false}
                className="relative group px-1"
              >
                <motion.div
                  className={`relative px-6 py-3 rounded-xl transition-all duration-300 ${
                    active
                      ? "bg-gradient-to-r from-amber-50 to-orange-50 shadow-sm"
                      : "hover:bg-neutral-50"
                  }`}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <span
                    className={`relative text-sm font-medium tracking-wide z-10 ${
                      active
                        ? "text-amber-700 font-semibold"
                        : "text-neutral-600 group-hover:text-neutral-800"
                    }`}
                  >
                    {t.label}
                  </span>
                  
                  {active && (
                    <>
                      <motion.div
                        className="absolute inset-0 rounded-xl border border-amber-200/60"
                        layoutId="activeTabBorder"
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                      <motion.div
                        className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-amber-500 rotate-45"
                        layoutId="activeTabMarker"
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    </>
                  )}
                </motion.div>
                
                {/* Efeito sutil de brilho para aba ativa */}
                {active && (
                  <motion.div 
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-100/20 to-orange-100/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}