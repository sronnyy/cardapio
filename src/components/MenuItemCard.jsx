"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaClock, FaFire, FaStar, FaUtensils } from "react-icons/fa";

export default function MenuItemCard({ item, index = 0 }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
      className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:shadow-xl border border-gray-100"
    >
      {/* Efeito de brilho verde na borda */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-[#628a4c]/0 via-[#628a4c]/5 to-[#628a4c]/0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      
      {/* Efeito de luz suave no hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="grid grid-cols-1 md:h-40 md:grid-cols-[140px_1fr] gap-0">
        {/* Container da imagem */}
        <div className="relative h-32 md:h-full overflow-hidden rounded-t-2xl md:rounded-l-2xl md:rounded-r-none bg-gradient-to-br from-green-50 to-green-100">
          {item.imagem && !imageError ? (
            <>
              {/* Skeleton loading */}
              <div
                className={`absolute inset-0 z-10 bg-gradient-to-br from-gray-100 to-gray-200 ${
                  imageLoaded ? "hidden" : "block"
                }`}
              />
              
              {/* Imagem com efeito de zoom suave */}
              <motion.img
                src={item.imagem}
                alt={item.nome}
                className={`h-full w-full object-cover transition-all duration-700 ${
                  imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Overlay gradiente */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              
              {/* Badges */}
              <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
                {item.destaque && (
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-1 rounded-full bg-gradient-to-r from-[#d4af37] to-amber-500 px-3 py-1 text-xs font-semibold text-white shadow-lg"
                  >
                    <FaStar className="text-[10px]" />
                    <span>Especialidade</span>
                  </motion.div>
                )}
                
                {item.popular && (
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1 text-xs font-semibold text-white shadow-lg"
                  >
                    <FaFire className="text-[10px]" />
                    <span>Popular</span>
                  </motion.div>
                )}
              </div>
            </>
          ) : (
            // Fallback visual
            <div className="flex h-full items-center justify-center text-gray-300">
              <FaUtensils className="h-8 w-8 opacity-50" />
            </div>
          )}
        </div>

        {/* Conteúdo do card */}
        <div className="p-4 md:p-5">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3 gap-2">
            <h3 className="text-lg font-bold text-gray-900 leading-tight flex-1">
              {item.nome}
            </h3>
            
            <div className="flex flex-col items-start md:items-end shrink-0">
              <span className="text-xl font-bold bg-gradient-to-r from-[#628a4c] to-[#4a6a3a] bg-clip-text text-transparent">
                R$ {Number(item.preco).toFixed(2).replace(".", ",")}
              </span>
              {item.precoAnterior && (
                <span className="text-sm text-gray-400 line-through">
                  R$ {Number(item.precoAnterior).toFixed(2).replace(".", ",")}
                </span>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="w-12 h-0.5 bg-gradient-to-r from-[#628a4c] to-[#8db573] rounded-full mb-3" />

          {/* Descrição */}
          {item.desc && (
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {item.desc}
            </p>
          )}

          {/* Informações adicionais */}
          <div className="flex flex-wrap gap-4 mb-4">
            {item.tempoPreparo && (
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100">
                  <FaClock className="text-[10px] text-[#628a4c]" />
                </div>
                <span className="text-xs text-gray-600">{item.tempoPreparo} min</span>
              </div>
            )}

            {item.porcoes && (
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100">
                  <FaUtensils className="text-[10px] text-amber-600" />
                </div>
                <span className="text-xs text-gray-600">{item.porcoes} porções</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {Array.isArray(item.tags) && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag, i) => (
                <motion.span
                  key={`${tag}-${i}`}
                  whileHover={{ scale: 1.05 }}
                  className="rounded-full border border-green-200 bg-green-50 px-2.5 py-1 text-xs font-medium text-[#4a6a3a] transition-all duration-300 hover:border-green-300 hover:bg-green-100"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          )}

          {/* Botão de ação */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r hidden hidden from-[#628a4c] to-[#4a6a3a] text-white py-2.5 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300"
          >
            Adicionar ao Pedido
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}