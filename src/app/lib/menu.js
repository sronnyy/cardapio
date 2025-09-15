import entradas from "@/app/data/entradas.json";
import pratos from "@/app/data/pratos.json";
import sobremesas from "@/app/data/sobremesas.json";
import bebidas from "@/app/data/bebidas.json";

const db = { entradas, pratos, sobremesas, bebidas };

export async function getMenu(cat) {
  await new Promise(r => setTimeout(r, 120)); // simular IO
  return db[cat] ?? [];
}