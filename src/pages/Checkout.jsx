import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", address: "", city: "", payment: "card" });
  const [orderId, setOrderId] = useState(null);
  const [errors, setErrors] = useState({});

  const shipping = 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.address.trim()) e.address = "Required";
    if (!form.city.trim()) e.city = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const placeOrder = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    const id = "NC-" + Math.floor(Math.random() * 900000 + 100000);
    setOrderId(id);
    clearCart();
  };

  if (orderId) return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      <div className="text-5xl mb-4">🎉</div>
      <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
      <p className="text-gray-600 mb-2">Your order ID is</p>
      <p className="text-xl font-mono bg-gray-100 inline-block px-4 py-2 rounded mb-6">{orderId}</p>
      <div>
        <button onClick={() => navigate("/")} className="bg-indigo-600 text-white px-6 py-2 rounded-lg">Back to Home</button>
      </div>
    </div>
  );

  if (!cart.length) return (
    <div className="text-center py-20">
      <p>Your cart is empty.</p>
      <button onClick={() => navigate("/shop")} className="mt-4 text-indigo-600 underline">Go shopping</button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
      <form onSubmit={placeOrder} className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm space-y-4">
        <h1 className="text-2xl font-bold mb-2">Checkout</h1>
        {[
          ["name", "Full Name", "text"],
          ["email", "Email", "email"],
          ["address", "Address", "text"],
          ["city", "City", "text"],
        ].map(([k, label, type]) => (
          <div key={k}>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input type={type} value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            {errors[k] && <p className="text-red-500 text-xs mt-1">{errors[k]}</p>}
          </div>
        ))}
        <div>
          <label className="block text-sm font-medium mb-1">Payment Method</label>
          <select value={form.payment} onChange={e => setForm({ ...form, payment: e.target.value })}
            className="w-full border rounded-lg px-3 py-2">
            <option value="card">Credit / Debit Card</option>
            <option value="paypal">PayPal</option>
            <option value="cod">Cash on Delivery</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700">
          Place Order · ${total.toFixed(2)}
        </button>
      </form>

      <aside className="bg-white p-6 rounded-xl shadow-sm h-fit">
        <h2 className="font-bold mb-4">Order Summary</h2>
        <div className="space-y-2 text-sm max-h-60 overflow-auto mb-4">
          {cart.map(i => (
            <div key={i.id} className="flex justify-between">
              <span>{i.name} × {i.qty}</span>
              <span>${(i.price * i.qty).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="space-y-1 text-sm border-t pt-3">
          <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
          <div className="flex justify-between font-bold text-lg"><span>Total</span><span>${total.toFixed(2)}</span></div>
        </div>
      </aside>
    </div>
  );
}