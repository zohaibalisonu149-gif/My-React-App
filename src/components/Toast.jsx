import { useCart } from "../context/CartContext";

export default function Toast() {
  const { toast } = useCart();
  if (!toast) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-5 py-3 rounded-lg shadow-lg text-sm z-50">
      {toast}
    </div>
  );
}