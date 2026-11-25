import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("novacart");
    return stored ? JSON.parse(stored) : [];
  });
  const [toast, setToast] = useState(null);

  useEffect(() => { localStorage.setItem("novacart", JSON.stringify(cart)); }, [cart]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const found = prev.find(i => i.id === product.id);
      if (found) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { ...product, qty }];
    });
    showToast(`${product.name} added to cart ✅`);
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const updateQty = (id, qty) => setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, qty) } : i));
  const clearCart = () => setCart([]);

  const count = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, count, subtotal, toast, showToast }}>
      {children}
    </CartContext.Provider>
  );
}
export const useCart = () => useContext(CartContext);