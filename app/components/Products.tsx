'use client';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';
import { API_URL } from '../api';

export default function Products() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePopupIndex, setActivePopupIndex] = useState<number | null>(null);

  // Selected size state for the current popup product
  const [selectedSize, setSelectedSize] = useState('0 Number');

  // Product Section Header Text ke liye state
  const [sectionHeader, setSectionHeader] = useState({
    tagline: '✨ Divine Collection',
    heading: 'Poshak & Shringar Gallery',
    subheading: 'Explore our sacred collection crafted meticulously with devotion for your deities. Click any product to view details.',
  });

  // Standard Poshak Sizes list for Laddu Gopal / Thakur Ji
  const poshakSizes = [
    'Size No. 0 (Zero size)',
    'Size No. 1',
    'Size No. 2',
    'Size No. 3',
    'Size No. 4',
    'Size No. 5',
    'Size No. 6',
    'Size No. 7 (Large)',
  ];

  // Strapi se Product Section Header aur Products fetch karne ke liye useEffect
  useEffect(() => {
    async function fetchData() {
      try {
        // 1. Fetch Product Section Header (Single Type)
        const headerRes = await fetch(`${API_URL}/api/product-section`);
        const headerJson = await headerRes.json();
        if (headerJson && headerJson.data) {
          setSectionHeader({
            tagline: headerJson.data.tagline || sectionHeader.tagline,
            heading: headerJson.data.heading || sectionHeader.heading,
            subheading: headerJson.data.subheading || sectionHeader.subheading,
          });
        }

        // 2. Fetch Products List (Collection Type)
       const res = await fetch(`${API_URL}/api/products?populate=*`);
        const data = await res.json();
        
        const formattedProducts = data.data.map((item: any) => {
          const imageUrl = item.image?.url 
    ? `${API_URL}${item.image.url}` 
    : '/images/gallery/1.jpg';

          const stockStatus = item.inStock || 'In Stock';
          // Check if stock is out of stock (case-insensitive check)
          const isOutOfStock = stockStatus.toLowerCase().includes('out of stock');

          return {
            id: item.id,
            title: item.title,
            description: item.description,
            price: item.price,
            originalPrice: item.originalPrice,
            image: imageUrl,
            inStock: stockStatus,
            isOutOfStock: isOutOfStock,
            fabricText: item.fabricText || '🌿 Fabric: Pure Silk & Zardozi Work',
          };
        });

        setProducts(formattedProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data from Strapi:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Body scroll lock jab popup open ho
  useEffect(() => {
    if (activePopupIndex !== null) {
      document.body.style.overflow = 'hidden';
      setSelectedSize('Size No. 0'); // Reset default size when popup opens
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [activePopupIndex]);

  const nextProduct = () => {
    if (products.length > 0) {
      setActivePopupIndex((prev) => (prev !== null ? (prev + 1) % products.length : 0));
      setSelectedSize('Size No. 2');
    }
  };

  const prevProduct = () => {
    if (products.length > 0) {
      setActivePopupIndex((prev) => (prev !== null ? (prev - 1 + products.length) % products.length : 0));
      setSelectedSize('Size No. 2');
    }
  };

  const currentProduct = activePopupIndex !== null ? products[activePopupIndex] : null;

  // Handle adding to cart with selected size
  const handleAddToCartWithMetadata = (product: any) => {
    if (product.isOutOfStock) return; // Prevent adding if out of stock
    const productWithSize = {
      ...product,
      cartId: `${product.id}-${selectedSize}`, 
      title: `${product.title} (${selectedSize})`,
      size: selectedSize,
    };
    addToCart(productWithSize);
  };

  return (
    <section id="product" className="py-24 bg-gradient-to-b from-amber-50/80 via-stone-50 to-amber-50/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header - Dynamic from Strapi */}
        <div className="text-center max-w-2xl mx-auto mb-16 transition-all duration-700">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 font-semibold text-xs tracking-widest uppercase shadow-xs">
            {sectionHeader.tagline}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-amber-950 font-serif mt-3">
            {sectionHeader.heading}
          </h2>
          <p className="text-gray-600 mt-3 text-lg">
            {sectionHeader.subheading}
          </p>
        </div>

        {/* Loading State */}
        {loading && products.length === 0 ? (
          <div className="text-center py-12 text-amber-900 font-medium">
            Loading Divine Poshaks from Strapi CMS... ✨
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div 
                key={product.id || index} 
                onClick={() => setActivePopupIndex(index)}
                className="bg-white rounded-3xl border border-amber-200/60 overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-102 flex flex-col justify-between group animate-fade-in-scale cursor-pointer"
              >
                <div className="relative w-full h-72 bg-gradient-to-tr from-amber-100/50 to-orange-50 flex items-center justify-center overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 drop-shadow-lg"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/300?text=Divine+Poshak";
                    }}
                  />
                  {/* Dynamic Stock Badge from CMS */}
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                    product.isOutOfStock ? 'bg-red-700 text-white' : 'bg-amber-900/90 text-amber-100'
                  }`}>
                    {product.inStock}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 font-serif group-hover:text-amber-700 transition-colors duration-300">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-xs text-gray-400 line-through font-medium">
                        ₹{product.originalPrice}
                      </span>
                      <p className="text-xl font-extrabold text-amber-800">
                        ₹{product.price}
                      </p>
                    </div>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivePopupIndex(index);
                      }}
                      className={`rounded-xl px-5 py-2.5 text-white text-sm font-medium shadow-md transition-all duration-300 ${
                        product.isOutOfStock 
                          ? 'bg-gray-400 cursor-not-allowed opacity-75' 
                          : 'bg-amber-700 hover:bg-amber-800 shadow-amber-200 transform active:scale-95 cursor-pointer'
                      }`}
                    >
                      {product.isOutOfStock ? 'Out of Stock' : 'Buy Now'}
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* --- POPUP WITH SIZE DROPDOWN & SLIDER --- */}
        {currentProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-4xl h-[530px] bg-white rounded-3xl overflow-hidden shadow-2xl border border-amber-200 grid grid-cols-1 md:grid-cols-2 animate-scale-up">
              
              {/* Close Button */}
              <button
                onClick={() => setActivePopupIndex(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-amber-900/80 text-white flex items-center justify-center font-bold hover:bg-amber-950 transition cursor-pointer shadow-md"
              >
                ✕
              </button>

              {/* Slider Left Arrow */}
              <button
                onClick={prevProduct}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-amber-900/70 text-white flex items-center justify-center font-bold hover:bg-amber-900 transition shadow-lg cursor-pointer"
                aria-label="Previous Product"
              >
                ‹
              </button>

              {/* Slider Right Arrow */}
              <button
                onClick={nextProduct}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-amber-900/70 text-white flex items-center justify-center font-bold hover:bg-amber-900 transition shadow-lg cursor-pointer"
                aria-label="Next Product"
              >
                ›
              </button>

              {/* Popup Left: Image Container */}
              <div className="relative w-full h-full bg-gradient-to-tr from-amber-100/60 to-orange-50 flex items-center justify-center p-8 overflow-hidden">
                <img
                  key={currentProduct.id}
                  src={currentProduct.image}
                  alt={currentProduct.title}
                  className="max-h-full max-w-full object-contain drop-shadow-xl animate-fade-in"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/400?text=Divine+Poshak";
                  }}
                />
                <div className="absolute bottom-4 left-4 bg-amber-900/80 text-amber-100 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                  Item {(activePopupIndex ?? 0) + 1} of {products.length}
                </div>
              </div>

              {/* Popup Right: Details & Size Selector */}
              <div className="p-8 flex flex-col justify-between h-full overflow-y-auto">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-2">
                    ✨ Madhav Radha Exclusive
                  </span>
                  <h3 className="text-xl font-bold text-amber-950 font-serif mb-2">
                    {currentProduct.title}
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed mb-4">
                    {currentProduct.description}
                  </p>
                  
                  {/* SIZE DROPDOWN SELECTION */}
                  <div className="mb-4">
                    <label className="block text-xs font-bold text-amber-950 uppercase mb-1.5">
                      📏 Select Deity Poshak Size:
                    </label>
                    <select
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      disabled={currentProduct.isOutOfStock}
                      className="w-full px-3 py-2.5 rounded-xl border border-amber-300 bg-amber-50/50 text-amber-950 font-semibold text-sm focus:outline-none focus:border-amber-700 cursor-pointer shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {poshakSizes.map((size, idx) => (
                        <option key={idx} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1 mb-2">
                    <p className="text-xs text-gray-500 font-medium">{currentProduct.fabricText}</p>
                    <p className={`text-xs font-semibold ${currentProduct.isOutOfStock ? 'text-red-600' : 'text-amber-700'}`}>
                      📦 Status: {currentProduct.inStock}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-4 mb-4 pt-3 border-t border-amber-100">
                    <span className="text-sm text-gray-400 line-through font-medium">
                      ₹{currentProduct.originalPrice}
                    </span>
                    <span className="text-2xl font-extrabold text-amber-800">
                      ₹{currentProduct.price}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      if (!currentProduct.isOutOfStock) {
                        handleAddToCartWithMetadata(currentProduct);
                        setActivePopupIndex(null); 
                      }
                    }}
                    disabled={currentProduct.isOutOfStock}
                    className={`w-full rounded-xl py-3 text-white font-semibold shadow-md transition-all duration-300 text-sm ${
                      currentProduct.isOutOfStock 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-amber-700 hover:bg-amber-800 transform active:scale-95 cursor-pointer'
                    }`}
                  >
                    {currentProduct.isOutOfStock ? 'Currently Out of Stock 🚫' : 'Add to Cart ✨'}
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}