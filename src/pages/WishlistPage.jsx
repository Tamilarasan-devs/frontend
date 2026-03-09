import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";

const mockWishlist = [
  { id: 1, name: "Product A", price: 29.99, image: "https://source.unsplash.com/400x400/?skincare" },
  { id: 2, name: "Product B", price: 49.99, image: "https://source.unsplash.com/400x400/?vitamins" },
  { id: 3, name: "Product C", price: 19.99, image: "https://source.unsplash.com/400x400/?cosmetics" },
];

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(mockWishlist);

  const handleRemove = (id) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  const handleAddToCart = (item) => {
    console.log("Added to cart:", item);
    // Integrate with your cart logic
  };

  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Wishlist</h1>

        {wishlist.length === 0 ? (
          <p className="text-gray-500 text-center">Your wishlist is empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlist.map(item => (
              <div key={item.id} className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition">
                <img src={item.image} alt={item.name} className="w-full h-64 object-cover"/>
                <div className="p-6 flex flex-col justify-between h-44">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h2>
                    <p className="text-gray-700 font-medium mb-4">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-red-500 hover:text-red-600 text-xl"
                    >
                      <FaHeart />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}