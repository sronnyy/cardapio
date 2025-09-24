"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchAndFilters({ tags = [] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [q, setQ] = useState(searchParams.get("q") ?? "");
  const activeTag = searchParams.get("tag") ?? "";
  const sort = searchParams.get("sort") ?? "popular";
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  function setParam(key, value) {
    const sp = new URLSearchParams(searchParams);
    if (value) sp.set(key, value); else sp.delete(key);
    sp.delete("p");
    router.push(`${pathname}?${sp.toString()}`, { scroll: true });
  }

  const onChange = useCallback((e) => {
    const value = e.target.value;
    setQ(value);
    clearTimeout((onChange)._t);
    (onChange)._t = setTimeout(() => setParam("q", value.trim() || null), 220);
  }, [searchParams]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-[calc(80px+56px)] z-30 "
    >
      <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col gap-6">
        <div className="flex gap-5 items-center">
          {/* Campo de busca premium */}
          <div className="relative flex-1">
            <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-amber-50/30 to-orange-50/20 opacity-0 transition-opacity duration-500 ${isSearchFocused ? 'opacity-100' : ''}`} />
            
            <svg 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 z-10 transition-colors duration-300" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            
            <input
              defaultValue={q}
              onChange={onChange}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder="Buscar pratos, ingredientes..."
              className="w-full pl-12 pr-5 py-4 rounded-xl border text-gray-600 border-neutral-200/80 text-sm bg-white/70 outline-none focus:ring-3 focus:ring-amber-400/30 focus:border-amber-400/40 transition-all duration-400 shadow-sm relative z-10"
            />
            
            <AnimatePresence>
              {q && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => {
                    setQ("");
                    setParam("q", null);
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 transition-colors duration-200 z-10"
                  aria-label="Limpar busca"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Select de ordenação premium */}
          <div className="relative">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white to-neutral-50/80 shadow-sm" />
            <select
              value={sort}
              onChange={(e) => setParam("sort", e.target.value)}
              className="relative rounded-xl border border-neutral-200/80 px-4 pr-10 py-4 text-sm bg-transparent outline-none focus:ring-3 focus:ring-amber-400/30 focus:border-amber-400/40 transition-all duration-400 shadow-sm z-10 appearance-none"
              aria-label="Ordenar"
            >
              <option value="popular">Mais pedidos</option>
              <option value="preco_asc">Preço: menor primeiro</option>
              <option value="preco_desc">Preço: maior primeiro</option>
              <option value="novo">Novidades</option>
            </select>
            
            {/* Ícone customizado para o select */}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-neutral-400 z-10">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        {tags.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex gap-2 overflow-x-auto no-scrollbar py-1"
          >
            <FilterChip
              label="Todos"
              active={!activeTag}
              onClick={() => setParam("tag", null)}
            />
            {tags.map(t => (
              <FilterChip
                key={t}
                label={t}
                active={activeTag === t}
                onClick={() => setParam("tag", t)}
              />
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function FilterChip({ label, active, onClick }) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative shrink-0 rounded-full px-4 py-2.5 text-xs font-medium border transition-all duration-300 group overflow-hidden ${
        active
          ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-500 shadow-lg"
          : "text-neutral-600 border-neutral-200/80 hover:border-amber-400 bg-white shadow-sm hover:shadow-md"
      }`}
      whileHover={{ y: -2 }}
    >
      {/* Efeito de brilho para chips ativos */}
      {active && (
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/30 to-amber-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
      
      {/* Efeito de fundo para hover em chips inativos */}
      {!active && (
        <div className="absolute inset-0 bg-gradient-to-r from-amber-50/0 to-amber-50/0 group-hover:from-amber-50/40 group-hover:to-amber-50/20 transition-all duration-300 rounded-full" />
      )}
      
      <span className="relative z-10 tracking-wide font-medium">
        {label}
      </span>
    </motion.button>
  );
}