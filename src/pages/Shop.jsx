import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Shop() {
  const [params] = useSearchParams();
  const initialCat = params.get("cat") || "All";
  const [cat, setCat] = useState(initialCat);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  const categories = ["All", ...new Set(products.map(p => p.category))];

  const filtered = useMemo(() => {
    let list = products.filter(p =>
      (cat === "All" || p.category === cat) &&
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    if (sort === "low") list.sort((a, b) => a.price - b.price);
    if (sort === "high") list.sort((a, b) => b.price - a.price);
    return list;
  }, [cat, search, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shop All Products</h1>

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search products…"
          className="border rounded-lg px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        <select value={cat} onChange={e => setCat(e.target.value)}
          className="border rounded-lg px-3 py-2">
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={sort} onChange={e => setSort(e.target.value)}
          className="border rounded-lg px-3 py-2">
          <option value="default">Sort: Default</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 py-20">No products match your filters.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}