import SearchAndFilters from "@/components/SearchAndFilters";
import MenuItemCard from "@/components/MenuItemCard";
import { getMenu } from "@/app/lib/menu";

export const revalidate = 60;

const TAKE = 36;

export default async function Page({ searchParams }) {
  const page = Math.max(1, Number(searchParams.p ?? 1));
  const q = (searchParams.q ?? "").toLowerCase();
  const sort = searchParams.sort ?? "preco_asc"; // default opcional

  let items = await getMenu("entradas");

  if (q) {
    items = items.filter(i =>
      i.nome.toLowerCase().includes(q) ||
      (i.desc ?? "").toLowerCase().includes(q)
    );
  }

  if (sort === "preco_asc") items.sort((a, b) => a.preco - b.preco);
  else if (sort === "preco_desc") items.sort((a, b) => b.preco - a.preco);
  else if (sort === "novo") items.sort((a, b) => (b.id ?? 0) - (a.id ?? 0));

  const start = (page - 1) * TAKE;
  const pageItems = items.slice(start, start + TAKE);
  const hasPrev = page > 1;
  const hasNext = start + TAKE < items.length;

  return (
    <div className="space-y-6">
      {/* só busca e preço ↑↓ */}
      <SearchAndFilters sortOptions={[
        { value: "preco_asc", label: "Preço: menor primeiro" },
        { value: "preco_desc", label: "Preço: maior primeiro" },
      ]} />

      <section className="scroll-mt-28">
        <h2 className="sr-only">Entradas</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {pageItems.map(i => <MenuItemCard key={i.id} item={i} />)}
        </div>

        <div className="mt-4 flex justify-center gap-2">
          {hasPrev && (
            <a className="px-3 py-1.5 rounded border text-sm" href={`?p=${page-1}`}>
              Anterior
            </a>
          )}
          {hasNext && (
            <a className="px-3 py-1.5 rounded border text-sm" href={`?p=${page+1}`}>
              Próxima
            </a>
          )}
        </div>
      </section>

      <a
        href="#top"
        className="fixed bottom-24 right-4 rounded-full border bg-white/90 dark:bg-neutral-900/80 backdrop-blur px-3 py-2 text-sm shadow hover:shadow-md"
      >
        Topo
      </a>
    </div>
  );
}