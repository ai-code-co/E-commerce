// src/components/Categories.tsx
import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchCategories, selectCategory } from '../redux/features/category/categorySlice';

export const Categories: React.FC = () => {
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const { list, status, selectedCategory } = useAppSelector((state) => state.category);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return (
      <div className="flex gap-3 overflow-x-auto pb-3 animate-pulse">
        {[...Array(6)].map((_, idx) => (
          <div key={idx} className="h-10 w-28 bg-gray-200 rounded-full shrink-0"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="my-6">
      <h3 className="text-lg font-bold text-gray-800 mb-3 tracking-tight">
        Shop by <span className="text-blue-600">Categories</span>
      </h3>
      
      {/* FIX: Removed 'snap-x' and added 'overflow-x-scroll' with clean touch behaviors 
        to ensure the browser retains your exact manual scroll positions upon state re-renders.
      */}
      <div 
        ref={containerRef}
        className="flex gap-3 overflow-x-scroll pb-2 scrollbar-hide version-scroll style-touch"
        style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
      >
        {/* "All Products" Toggle Pill Option */}
        <button
          type="button"
          onClick={() => dispatch(selectCategory(null))} // 👈 Sets state to null to show all products
          className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-150 shrink-0 ${
            selectedCategory === null
              ? 'bg-blue-600 border-blue-600 text-white shadow-md scale-105'
              : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
          }`}
        >
          All Products
        </button>

        {/* Dynamic API Categories Array */}
        {list.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => dispatch(selectCategory(category))}
            className={`px-5 py-2 rounded-full text-sm font-semibold border capitalize transition-all duration-150 shrink-0 ${
              selectedCategory === category
                ? 'bg-blue-600 border-blue-600 text-white shadow-md scale-105'
                : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
            }`}
          >
            {category.replace('-', ' ')}
          </button>
        ))}
      </div>
    </div>
  );
};