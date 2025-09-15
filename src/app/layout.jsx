import "./globals.css";
import TabsNav from "@/components/TabsNav";
import { Inter, Playfair_Display } from "next/font/google";

// Configuração de fontes premium
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata = {
  title: "Cardápio | Restaurante X",
  description: "Experiência culinária sofisticada com ingredientes selecionados.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" >
      <body className="min-h-dvh bg-neutral-50 text-neutral-800 antialiased">
        {/* HEADER FIXO com design premium */}
        <header className="fixed inset-x-0 top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-neutral-200/70">
          <div className="mx-auto max-w-6xl px-6 h-20 flex items-center justify-between">
            <a href="/" className="group flex items-center gap-3">
              <div className="relative h-10 w-10 rounded-lg bg-gradient-to-br from-neutral-900 to-neutral-800 flex items-center justify-center shadow-md">
                <span className="text-gold-light font-medium text-lg font-serif tracking-wider">R</span>
                <div className="absolute inset-0 border border-gold/30 rounded-lg"></div>
              </div>
              <span className="text-lg font-serif font-semibold tracking-wide text-neutral-800 group-hover:opacity-80 transition">
                Restaurante X
              </span>
            </a>
            <a
              href="/entradas"
              className="inline-flex items-center gap-2 rounded-full bg-neutral-900 text-gold-light px-5 py-2.5 text-sm font-medium hover:bg-neutral-800 focus:outline-none transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <span>Ver Cardápio</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </header>

        {/* compensação do header */}
        <div className="h-20" />

        {/* TABS FIXAS com design premium */}
        <TabsNav />

        {/* CONTEÚDO TROCÁVEL POR ROTA */}
        <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>

        {/* compensação do footer */}
        <div className="h-24" />

        {/* FOOTER FIXO premium */}
        {/* <footer className="fixed inset-x-0 bottom-0 z-50 bg-white/90 backdrop-blur-xl border-t border-neutral-200/70">
          <div className="mx-auto max-w-6xl px-6 h-24 flex items-center justify-between">
            <div className="flex flex-col">
              <p className="text-sm text-neutral-700 leading-none font-medium">
                © {new Date().getFullYear()} Restaurante X
              </p>
              <p className="text-xs text-neutral-500 mt-1.5">
                Todos os direitos reservados
              </p>
            </div>

            <div className="flex flex-col items-end">
              <p className="text-sm text-neutral-700 leading-none font-medium">
                Atendimento: <span className="text-gold">18h–23h</span>
              </p>
              <p className="text-xs text-neutral-500 mt-1.5">
                Reservas: <span className="text-gold">(11) 9999-9999</span>
              </p>
            </div>
          </div>
        </footer> */}
      </body>
    </html>
  );
}