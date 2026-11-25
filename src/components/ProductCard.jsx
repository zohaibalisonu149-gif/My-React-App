import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  return (
    <div className="product-card bg-white rounded-xl shadow-sm overflow-hidden flex flex-col">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} className="h-48 w-full object-cover" loading="lazy" />
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs text-indigo-600 font-medium">{product.category}</span>
        <Link to={`/product/${product.id}`} className="font-semibold text-gray-900 mt-1 hover:text-indigo-600 line-clamp-1">
          {product.name}
        </Link>
        <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
          ⭐ {product.rating} ({product.reviewsCount})
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-bold text-gray-900">${product.price.toFixed(2)}</span>
          <span className="text-sm text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
        </div>
        <button
          onClick={() => addToCart(product)}
          className="mt-3 w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}