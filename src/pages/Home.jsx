import { Link } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Home() {
  // Alag alag sections ke liye products filter karna
  const trending = products.slice(0, 8);
  const newArrivals = products.slice(8, 16);
  const topRated = [...products].sort((a, b) => b.rating - a.rating).slice(0, 8);
  const lifestyle = products.filter(p => p.category === "Home & Lifestyle").slice(0, 4);
  
  const categories = [...new Set(products.map(p => p.category))];

  return (
    <div>
      {/* === NAYA PROFESSIONAL DARK BANNER === */}
      <section className="relative bg-gray-900 text-white overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600')] bg-cover bg-center"
          style={{ opacity: 0.4 }}
        ></div>
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-900/90 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-32 flex flex-col items-start justify-center min-h-[500px]">
          <span className="bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide mb-6 backdrop-blur-sm">
            ✨ New Season Arrivals
          </span>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight max-w-3xl">
            Shop Smarter with <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              NovaCart
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-xl leading-relaxed">
            Discover premium products with unbeatable prices. Experience the future of online shopping today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link 
              to="/shop" 
              className="bg-indigo-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-indigo-500 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(79,70,229,0.3)] transition-all duration-300 text-center"
            >
              Browse Shop
            </Link>
            <Link 
              to="/about" 
              className="bg-white/5 backdrop-blur-md border border-white/10 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 text-center"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
      {/* === BANNER END === */}

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map(cat => (
            <Link key={cat} to={`/shop?cat=${encodeURIComponent(cat)}`}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center font-semibold text-gray-800 border border-gray-100">
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Products (8 items) */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
          <Link to="/shop" className="text-indigo-600 font-medium text-sm hover:underline">View All →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trending.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="bg-gray-900 text-white rounded-2xl p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between shadow-xl">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Summer Sale — up to 30% off</h3>
            <p className="opacity-80">Use code <span className="font-mono bg-white/20 px-2 py-1 rounded text-sm ml-1">NOVA10</span> at checkout.</p>
          </div>
          <Link to="/shop" className="mt-6 md:mt-0 inline-block bg-indigo-500 px-8 py-3 rounded-xl font-medium hover:bg-indigo-400 hover:-translate-y-1 transition-all duration-300">
            Grab Deals
          </Link>
        </div>
      </section>

      {/* New Arrivals (8 items) */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold text-gray-900">New Arrivals</h2>
          <Link to="/shop" className="text-indigo-600 font-medium text-sm hover:underline">View All →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Top Rated (8 items) */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Top Rated Products</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topRated.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Home & Lifestyle Specials */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Upgrade Your Space</h2>
          <Link to="/shop?cat=Home%20%26%20Lifestyle" className="text-indigo-600 font-medium text-sm hover:underline">Explore →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {lifestyle.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

    </div>
  );
}