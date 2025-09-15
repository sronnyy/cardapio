"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function MenuItemCard({ item, index = 0 }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ y: -8, transition: { duration: 0.4 } }}
      className="group relative overflow-hidden rounded-3xl bg-white p-1 shadow-2xl transition-all duration-500 hover:shadow-3xl"
      style={{ 
        background: "linear-gradient(135deg, #ffffff 0%, #fafafa 50%, #f5f5f5 100%)",
      }}
    > j
      {/* Efeito de brilho dourado na borda */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-400/0 via-amber-400/10 to-amber-400/0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      
      {/* Efeito de luz suave no hover */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-white/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Grade com proporções mais equilibradas */}
      <div className="grid gap-5 grid-cols-[150px_1fr]">
        {/* Container da imagem com borda elegante */}
        <div className="relative overflow-hidden  rounded-l-2xl rounded-r-[10px]">
          {item.imagem && !imageError ? (
            <>
              {/* Skeleton loading com gradiente suave */}
              <div
                className={`absolute inset-0 z-10 bg-gradient-to-br from-neutral-100 to-neutral-200 ${
                  imageLoaded ? "hidden" : "block"
                }`}
              />
              
              {/* Imagem com efeito de zoom suave */}
              <motion.img
                src={item.imagem}
                alt={item.nome}
                className={`h-full object-cover  transition-all duration-1000 ${
                  imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Overlay gradiente para melhor contraste de texto */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-60" />
              
              {/* Badge de especialidade com design premium */}
              {item.destaque && (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute right-3 top-3 z-20 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-3 py-1.5 text-xs font-semibold uppercase text-white shadow-lg"
                >
                  <span className="drop-shadow-md">Especialidade</span>
                </motion.div>
              )}
            </>
          ) : (
            // Fallback visual premium quando não há imagem
            <div className="flex h-full  items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 text-neutral-400">
              <svg className="h-10 w-10 opacity-50" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 19V5a2 2 0 0 0-2-2H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2ZM8.5 13.5 11 16l3.5-4.5L19 18H5l3.5-4.5Z" />
              </svg>
            </div>
          )}
        </div>

        <div className="flex flex-col  ">
          <div className=" flex flex-col items-start justify-between ">
            <h3 className="pr-2 text-lg font-bold tracking-tight text-neutral-900 leading-tight">
              {item.nome}
            </h3>
            <div className="flex flex-col items-end shrink-0">
              <span className="whitespace-nowrap text-lg font-bold bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent">
                R$ {Number(item.preco).toFixed(2).replace(".", ",")}
              </span>
              {item.precoAnterior && (
                <span className="text-sm text-neutral-400 line-through mt-1">
                  R$ {Number(item.precoAnterior).toFixed(2).replace(".", ",")}
                </span>
              )}
            </div>
          </div>

          <div className="my-3 h-px w-16 bg-gradient-to-r from-amber-400 to-amber-300" />

          {item.desc && (
            <p className="mb-6 hidden text-md font-light leading-relaxed tracking-wide text-neutral-600">
              {item.desc}
            </p>
          )}

          <div className="mb-6 grid grid-cols-2 gap-4">
            {item.tempoPreparo && (
              <div className="flex items-center">
                <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                  <svg className="h-4 w-4 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-neutral-600">{item.tempoPreparo} min</span>
              </div>
            )}

      
          </div>

          {Array.isArray(item.tags) && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag, i) => (
                <motion.span
                  key={`${tag}-${i}`}
                  whileHover={{ scale: 1.05 }}
                  className="rounded-full border border-amber-200 bg-amber-50/70 px-3 py-1.5 text-xs font-medium text-amber-700 transition-all duration-300 hover:border-amber-300 hover:bg-amber-100"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}