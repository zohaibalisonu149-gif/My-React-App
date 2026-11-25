import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setOpen(false);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const linkCls = ({ isActive }) =>
    `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
      isActive
        ? "bg-indigo-50 text-indigo-700 shadow-sm"
        : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
    }`;

  return (
    <header className="sticky top-0 z-50">
      {/* 1. Top Announcement Bar */}
      <div className="bg-gray-900 text-white text-xs font-medium py-2 text-center tracking-wide">
        🚚 Free shipping on all orders over $50! Use code{" "}
        <span className="font-bold text-indigo-400">NOVA10</span> for 10% off.
      </div>

      {/* 2. Main Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
            <div className="bg-indigo-600 p-2 rounded-xl group-hover:bg-indigo-700 transition-colors">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                <path d="M8 22l4-12 4 8 4-8 4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-extrabold text-2xl text-gray-900 tracking-tight">NovaCart</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <NavLink key={link.name} to={link.path} className={linkCls}>
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Search Bar (Desktop) */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="Search premium products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-100 text-gray-800 text-sm rounded-full pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white transition-all"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </form>

          {/* Right Side Icons (Cart & Menu) */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all group"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="group-hover:scale-110 transition-transform">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 4.6A2 2 0 0 0 6.5 21h11" />
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
              </svg>
              {count > 0 && (
                <span className="absolute 0 top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 border-2 border-white shadow-sm">
                  {count}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
              onClick={() => setOpen(!open)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            open ? "max-h-96 border-t border-gray-100" : "max-h-0"
          }`}
        >
          <div className="px-4 py-4 bg-white flex flex-col gap-2">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative mb-2">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-100 text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </form>

            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `block px-4 py-2.5 rounded-lg text-sm font-medium ${
                    isActive ? "bg-indigo-50 text-indigo-700" : "text-gray-700 hover:bg-gray-50"
                  }`
                }
                onClick={() => setOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}