import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function Hero() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Main Banner Container */}
      <div className="relative bg-[#212844] rounded-3xl p-8 md:p-16 flex items-center min-h-75 overflow-hidden shadow-sm">
        
        {/* Left Navigation Arrow */}
        <button className="absolute left-4 md:left-6 bg-white p-3 rounded-full text-blue-500 shadow-md hover:bg-gray-50 transition z-20">
          <FiChevronLeft className="text-xl" />
        </button>

        {/* Text Content */}
        <div className="text-white z-10 md:ml-16 text-center md:text-left w-full md:w-auto">
          <h3 className="text-lg md:text-xl font-medium mb-3 text-gray-200">
            Best Deal Online on smart watches
          </h3>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-wide">
            SMART WEARABLE.
          </h1>
          <p className="text-xl md:text-2xl font-semibold text-gray-100">
            UP to 80% OFF
          </p>
        </div>

        {/* Placeholder for the Watch Image (Right Side) */}
        <div className="hidden md:block absolute right-10 top-0 bottom-0 w-1/3 bg-linear-to-l from-[#2a3356] to-transparent">
           {/* You can add your <img src={watchImage} /> here later! */}
        </div>

        {/* Right Navigation Arrow */}
        <button className="absolute right-4 md:right-6 bg-white p-3 rounded-full text-blue-500 shadow-md hover:bg-gray-50 transition z-20">
          <FiChevronRight className="text-xl" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <span className="w-6 h-2 bg-blue-500 rounded-full cursor-pointer"></span>
        <span className="w-2 h-2 bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400 transition"></span>
        <span className="w-2 h-2 bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400 transition"></span>
        <span className="w-2 h-2 bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400 transition"></span>
        <span className="w-2 h-2 bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400 transition"></span>
        <span className="w-2 h-2 bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400 transition"></span>
      </div>
    </div>
  );
}