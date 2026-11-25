import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, updateQty, removeFromCart, subtotal } = useCart();
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  const applyPromo = () => {
    if (promo.trim().toUpperCase() === "NOVA10") setDiscount(subtotal * 0.1);
    else { setDiscount(0); alert("Invalid promo code. Try NOVA10"); }
  };

  const shipping = cart.length ? 9.99 : 0;
  const tax = (subtotal - discount) * 0.08;
  const total = Math.max(0, subtotal - discount + shipping + tax);

  if (!cart.length) return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
      <Link to="/shop" className="text-indigo-600 underline">Continue shopping →</Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        <h1 className="text-2xl font-bold mb-2">Shopping Cart</h1>
        {cart.map(item => (
          <div key={item.id} className="flex gap-4 bg-white p-4 rounded-xl shadow-sm">
            <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
              <div className="flex items-center gap-2 mt-2">
                <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-7 h-7 border rounded">−</button>
                <span className="w-8 text-center">{item.qty}</span>
                <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-7 h-7 border rounded">+</button>
                <button onClick={() => removeFromCart(item.id)} className="ml-auto text-red-500 text-sm">Remove</button>
              </div>
            </div>
            <div className="font-bold">${(item.price * item.qty).toFixed(2)}</div>
          </div>
        ))}
      </div>

      <aside className="bg-white rounded-xl shadow-sm p-6 h-fit">
        <h2 className="text-lg font-bold mb-4">Order Summary</h2>
        <div className="flex gap-2 mb-4">
          <input value={promo} onChange={e => setPromo(e.target.value)} placeholder="Promo code"
            className="border rounded px-3 py-2 flex-1 text-sm" />
          <button onClick={applyPromo} className="bg-gray-800 text-white px-3 py-2 rounded text-sm">Apply</button>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          {discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>−${discount.toFixed(2)}</span></div>}
          <div className="flex justify-between"><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
          <div className="flex justify-between font-bold text-lg border-t pt-2"><span>Total</span><span>${total.toFixed(2)}</span></div>
        </div>
        <button onClick={() => navigate("/checkout")}
          className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700">
          Proceed to Checkout
        </button>
      </aside>
    </div>
  );
}