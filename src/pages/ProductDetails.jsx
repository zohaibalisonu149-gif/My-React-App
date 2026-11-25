import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) return <div className="text-center py-20">Product not found. <Link to="/shop" className="text-indigo-600 underline">Back to shop</Link></div>;

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <img src={product.image} alt={product.name} className="rounded-xl w-full h-96 object-cover shadow" />
        <div>
          <span className="text-sm text-indigo-600 font-medium">{product.category}</span>
          <h1 className="text-3xl font-bold mt-1 mb-2">{product.name}</h1>
          <div className="text-sm text-gray-500 mb-4">⭐ {product.rating} ({product.reviewsCount} reviews) · {product.stockStatus}</div>
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
            <span className="text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
          </div>
          <p className="text-gray-600 mb-4">{product.fullDescription}</p>

          <h3 className="font-semibold mb-2">Specifications</h3>
          <ul className="list-disc list-inside text-sm text-gray-600 mb-6">
            {product.specifications.map((s, i) => <li key={i}>{s}</li>)}
          </ul>

          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-9 h-9 border rounded-lg text-lg">−</button>
            <span className="w-10 text-center font-medium">{qty}</span>
            <button onClick={() => setQty(q => q + 1)} className="w-9 h-9 border rounded-lg text-lg">+</button>
          </div>

          <button onClick={() => addToCart(product, qty)}
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
            Add to Cart
          </button>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}