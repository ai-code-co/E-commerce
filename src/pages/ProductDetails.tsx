// src/pages/ProductDetail.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchProductById, clearSelectedProduct } from '../redux/features/product/productSlice';
import { formatPrice } from '../utils/formatPrice';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const { selectedProduct, status, error } = useAppSelector((state) => state.product);
  const [activeImage, setActiveImage] = useState<string | null>(null);;

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
    
    // Clean state details when leaving the view profile block
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id]);

  // Sync state fallback preview whenever selected item populates cleanly
  useEffect(() => {
    if (selectedProduct) {
      setActiveImage(selectedProduct.thumbnail);
    }
  }, [selectedProduct]);

  if (status === 'loading') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 animate-pulse flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 h-96 bg-gray-200 rounded-2xl"></div>
        <div className="w-full md:w-1/2 flex-1 space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-24 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }

  if (status === 'failed' || !selectedProduct) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-red-600 font-medium mb-4">{error || "Product could not be loaded."}</p>
        <button onClick={() => navigate('/')} className="bg-blue-600 text-white px-6 py-2 rounded-xl font-medium">
          Back to Home
        </button>
      </div>
    );
  }

  const originalPrice = selectedProduct.price / (1 - selectedProduct.discountPercentage / 100);

  return (
    <div className="bg-gray-50  p-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation Line wrapper */}
        <button onClick={() => navigate(-1)} className="text-sm font-semibold text-blue-600 hover:underline mb-6 inline-flex items-center gap-1">
          ← Back to Results
        </button>

        {/* Product Master Presentation Wrapper */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* LEFT: Image Gallery Display Column */}
          <div className="flex flex-col gap-4">
            <div className="w-full h-96 bg-gray-50 rounded-2xl flex items-center justify-center p-4 border border-gray-50 overflow-hidden">
              {activeImage && ( <img src={activeImage} alt={selectedProduct.title} className="max-h-full object-contain" />)}
            </div>
            
            {/* Horizontal Sub Thumbnail Stack Slider Array */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {selectedProduct.images?.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 border-2 rounded-xl overflow-hidden bg-gray-50 shrink-0 p-1 ${activeImage === img ? 'border-blue-600' : 'border-gray-100'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Spec Data Information Column */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full">
                {selectedProduct.brand || 'Premium'}
              </span>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">{selectedProduct.title}</h1>
              
              <div className="flex items-center gap-4 mt-3 mb-4">
                <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2.5 py-0.5 rounded-lg text-sm font-bold">
                  <span>★</span> {selectedProduct.rating}
                </div>
                <span className="text-sm text-gray-500 font-medium">Category: <span className="capitalize text-gray-700">{selectedProduct.category}</span></span>
              </div>

              <hr className="border-gray-100 my-4" />

              {/* Pricing Blocks Layout */}
              <div className="space-y-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-gray-900">{formatPrice(selectedProduct.price)}</span>
                  <span className="text-lg text-gray-400 line-through">{formatPrice(originalPrice)}</span>
                  <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    {Math.round(selectedProduct.discountPercentage)}% OFF
                  </span>
                </div>
                <p className="text-xs font-medium text-gray-400">Inclusive of all local sales taxes</p>
              </div>

              {/* Description Block */}
              <div className="mt-6">
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Product Description</h3>
                <p className="text-gray-600 mt-1.5 text-sm leading-relaxed">{selectedProduct.description}</p>
              </div>
            </div>

            {/* Action Checkout Row Area */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl transition-colors shadow-sm shadow-blue-200">
                Add To Cart
              </button>
              <button className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-bold py-3.5 px-6 rounded-xl transition-colors">
                Buy Now
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};