// src/components/ProductCard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../redux/features/product/productSlice';
import { formatPrice } from '../utils/formatPrice';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const navigate = useNavigate();
  // Calculate original price based on the discount percentage from DummyJSON
  const originalPrice = product.price / (1 - product.discountPercentage / 100);
  const savings = originalPrice - product.price;

  return (
    <div 
    onClick={() => navigate(`/products/${product.id}`)}
    className="bg-white border border-gray-100 rounded-2xl p-4 relative shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between group cursor-pointer">
      
      {/* Blue Discount Tag */}
      {product.discountPercentage > 0 && (
        <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-bl-xl rounded-tr-sm z-10">
          {Math.round(product.discountPercentage)}% OFF
        </span>
      )}

      {/* Image Container */}
      <div className="w-full h-40 flex items-center justify-center overflow-hidden bg-gray-50 rounded-xl mb-4 p-2">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="max-h-full object-contain group-hover:scale-105 transition-transform duration-200"
        />
      </div>

      {/* Product Information */}
      <div className="grow flex flex-col justify-between">
        <div>
          <h3 className="text-gray-800 font-medium text-sm line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
            {product.title}
          </h3>
          
          {/* Rating Placeholder */}
          <div className="flex items-center gap-1 mb-2">
            <span className="text-yellow-400 text-xs">★</span>
            <span className="text-xs text-gray-500 font-medium">{product.rating}</span>
          </div>
        </div>

        {/* Pricing Layout Block */}
        <div className="mt-2 border-t border-gray-50 pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.discountPercentage > 0 && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
          
          {product.discountPercentage > 0 && (
            <div className="text-xs font-semibold text-green-600 mt-0.5">
              Save {formatPrice(savings)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};