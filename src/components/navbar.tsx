import { Link } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiChevronDown } from 'react-icons/fi';

export default function Navbar() {
  // Array of categories to keep our code clean and avoid repeating HTML
  const categories = [
    'Groceries', 
    'Premium Fruits', 
    'Home & Kitchen', 
    'Fashion', 
    'Electronics', 
    'Beauty', 
    'Home Improvement', 
    'Sports, Toys & Luggage'
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      
      {/* --- Top Tier: Main Navigation --- */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-8">
        
        {/* Logo Area */}
        <Link to="/" className="flex items-center gap-3 text-blue-500 hover:opacity-80 transition">
          <div className="p-2 bg-blue-50 rounded-md">
            <FiMenu className="text-xl" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-blue-600">MegaMart</span>
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex grow max-w-2xl items-center bg-gray-100 rounded-md px-4 py-2.5">
          <FiSearch className="text-gray-500 mr-3 text-lg" />
          <input
            type="text"
            placeholder="Search essentials, groceries and more..."
            className="bg-transparent outline-none grow text-sm text-gray-700"
          />
          <div className="border-l border-gray-300 pl-4 ml-2 cursor-pointer hover:text-blue-500 transition">
            <FiMenu className="text-gray-500 text-lg" />
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-6 text-sm font-medium text-gray-700">
          <Link to="/login" className="flex items-center gap-2 hover:text-blue-600 transition">
            <FiUser className="text-lg" />
            <span className="hidden sm:block">Sign Up/Sign In</span>
          </Link>
          
          {/* Cart Indicator */}
          <Link to="/cart" className="flex items-center gap-2 hover:text-blue-600 transition">
            <FiShoppingCart className="text-lg" />
            <span className="hidden sm:block">Cart</span>
          </Link>
        </div>
      </div>

      {/* --- Bottom Tier: Categories --- */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex gap-3 overflow-x-auto no-scrollbar">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              index === 0 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category} <FiChevronDown className="text-xs" />
          </button>
        ))}
      </div>
      
    </header>
  );
}