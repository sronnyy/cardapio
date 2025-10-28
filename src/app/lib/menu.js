import entradas from "@/app/data/entradas-organizadas.json";
import sobremesas from "@/app/data/sobremesas-organizadas.json";
import bebidas from "@/app/data/bebidas-organizadas.json";
import frutosDoMar from "@/app/data/frutos-do-mar.json";
import risotos from "@/app/data/risotos.json";
import moquecas from "@/app/data/moquecas.json";
import massas from "@/app/data/massas.json";
import pratosExecutivos from "@/app/data/pratos-executivos.json";

const db = { 
  entradas, 
  sobremesas, 
  bebidas, 
  "frutos-do-mar": frutosDoMar,
  risotos,
  moqueca: moquecas,
  massas,
  "pratos-executivos": pratosExecutivos
};

export async function getMenu(cat) {
  await new Promise(r => setTimeout(r, 120)); // simular IO
  const data = db[cat] ?? [];
  
  // Se os dados estão organizados por categoria, flatten para uma lista simples
  if (Array.isArray(data) && data.length > 0 && data[0].categoria) {
    return data.flatMap(categoria => categoria.itens);
  }
  
  return data;
}