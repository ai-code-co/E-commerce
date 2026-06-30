// src/pages/Home.tsx
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchProducts } from '../redux/features/product/productSlice';
import Hero from '../components/Hero';
import { Categories } from '../components/Categories'; 
import { ProductCard } from '../components/ProductCard';

export const Home = () => {
  const dispatch = useAppDispatch();
  
  // Destructure product and category elements from the Redux store
  const { items, status, error } = useAppSelector((state) => state.product);
  const { selectedCategory } = useAppSelector((state) => state.category); 

  useEffect(() => {
    // Only fetch base products on load if the store is currently empty/idle
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  // Dynamic filter logic: If a category is selected, filter matching items locally.
  // Otherwise, display items directly (which naturally adapts to global search results).
  const filteredProducts = selectedCategory
    ? items.filter((product) => {
        if (!product.category) return false;
        return product.category.toLowerCase() === selectedCategory.toLowerCase();
      })
    : items;

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* Render the interactive Categories track component */}
        <Categories />

        {/* Section Title Header - UPDATED: Dynamically changes context based on state */}
        <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-3 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
            {selectedCategory ? (
              <span>
                Showing results for <span className="text-blue-600 capitalize">"{selectedCategory.replace('-', ' ')}"</span>
              </span>
            ) : (
              <span>
                Discover <span className="text-blue-600">Our Products</span>
              </span>
            )}
          </h2>
        </div>

        {/* Async Status Management */}
        {status === 'loading' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(10)].map((_, index) => (
              <div key={index} className="bg-white border border-gray-100 rounded-2xl p-4 h-72 animate-pulse flex flex-col justify-between">
                <div className="w-full h-40 bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        )}

        {status === 'failed' && error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-xl text-center font-medium border border-red-100">
            Error loading results: {error}. Please try a different query.
          </div>
        )}

        {/* Dynamic Products Grid Rendering */}
        {status === 'succeeded' && (
          filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-gray-100 rounded-2xl shadow-sm my-4">
              <span className="text-4xl">🔍</span>
              <p className="text-gray-500 font-semibold mt-3 text-base">
                No matching items found. Try checking your spelling or using different keywords!
              </p>
            </div>
          )
        )}
        
      </div>
    </div>
  );
};