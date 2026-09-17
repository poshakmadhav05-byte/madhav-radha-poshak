'use client';

import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (!isCartOpen) return null;

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    let message = "✨ Namaste! I would like to order the following Poshak from Madhav Radha:\n\n";
    
    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.title}*\n   Qty: ${item.quantity} | Price: ₹${item.price * item.quantity}\n\n`;
    });
    
    message += `*Total Amount: ₹${totalPrice}*\n\nPlease confirm availability, payment options, and shipping details.`;

    const phoneNumber = "8791711275"; 
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      ></div>

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-amber-200">
          
          <div className="p-6 bg-amber-950 text-amber-100 flex items-center justify-between">
            <h3 className="text-xl font-bold font-serif flex items-center gap-2">
              🛒 Seva Cart ({cart.length})
            </h3>
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-full bg-amber-900 text-white flex items-center justify-center hover:bg-amber-800 transition cursor-pointer font-bold"
            >
              ✕
            </button>
          </div>

          <div className="p-6 flex-1 overflow-y-auto space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-20 text-gray-500">
                <span className="text-4xl block mb-2">🌸</span>
                Aapka Seva Cart khali hai. Kuch divya poshak add karein!
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 rounded-2xl border border-amber-100 bg-amber-50/30 items-center">
                  <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-xl border border-amber-200" />
                  <div className="flex-1">
                    <h4 className="font-bold text-amber-950 text-sm line-clamp-1">{item.title}</h4>
                    <p className="text-amber-800 font-extrabold text-sm mt-1">₹{item.price}</p>
                    
                    <div className="flex items-center gap-3 mt-2">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 rounded-lg bg-amber-200 text-amber-900 font-bold flex items-center justify-center hover:bg-amber-300 transition cursor-pointer"
                      >
                        -
                      </button>
                      <span className="text-sm font-semibold text-gray-800">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 rounded-lg bg-amber-200 text-amber-900 font-bold flex items-center justify-center hover:bg-amber-300 transition cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm font-bold p-2 cursor-pointer"
                    title="Remove"
                  >
                    🗑️
                  </button>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-6 bg-amber-50 border-t border-amber-200 space-y-4">
              <div className="flex justify-between items-center text-lg font-bold text-amber-950">
                <span>Total Seva Amount:</span>
                <span className="text-2xl text-amber-800">₹{totalPrice}</span>
              </div>

              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-4 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-base shadow-lg flex items-center justify-center gap-3 transition-all transform active:scale-95 cursor-pointer"
              >
                <span>💬</span> Order via WhatsApp
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}