import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getProfile, addAddress } from "../services/userService";
import { getCart } from "../services/cartService";
import { createOrder } from "../services/orderService";

export default function Checkout() {
  const navigate = useNavigate();
  const qc = useQueryClient();

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newAddress, setNewAddress] = useState("");

  const { data: userProfile, isLoading: isUserLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile
  });

  const { data: cartData, isLoading: isCartLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart
  });

  const orderMut = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cart"] });
      qc.invalidateQueries({ queryKey: ["orders"] });
      alert("Order placed successfully!");
      navigate('/profile');
    },
    onError: (err) => {
      alert(err.response?.data?.message || "Failed to place order.");
    }
  });

  const addressMut = useMutation({
    mutationFn: addAddress,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile"] });
      setNewAddress("");
    }
  });

  if (isUserLoading || isCartLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#faf7f2]">Loading Checkout...</div>;
  }

  const addresses = userProfile?.addresses || [];
  const cartItems = cartData?.data || [];
  
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#faf7f2]">
        <h2 className="text-2xl font-bold text-[#03349a] mb-4">Your cart is empty!</h2>
        <button onClick={() => navigate('/productListing')} className="w-48 py-3 rounded-2xl text-white font-bold bg-[#03349a]">Shop Now</button>
      </div>
    );
  }

  const subtotal = cartItems.reduce((acc, curr) => acc + (curr.quantity * parseFloat(curr.product?.finalPrice || curr.product?.price || 0)), 0);

  const handlePlaceOrder = () => {
    let finalAddress = selectedAddress;
    if (!finalAddress) {
      if (!newAddress.trim()) {
        alert("Please select or enter a shipping address.");
        return;
      }
      finalAddress = newAddress;
    }
    
    orderMut.mutate({ shippingAddress: finalAddress });
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Left: Address Selection */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-red-50">
          <h2 className="text-2xl font-black text-[#03349a] mb-6">Delivery Details</h2>
          
          <div className="space-y-4 mb-8">
            {addresses.map((addr) => (
              <div 
                key={addr.id} 
                onClick={() => { setSelectedAddress(addr.details); setNewAddress(""); }}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedAddress === addr.details ? 'border-[#03349a] bg-blue-50' : 'border-gray-100 hover:border-gray-300'}`}
              >
                <p className="font-bold text-gray-900">{addr.label}</p>
                <p className="text-sm text-gray-600 mt-1">{addr.details}</p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-100">
            <h3 className="font-bold text-gray-800 mb-3">Or enter a new address:</h3>
            <textarea
              value={newAddress}
              onChange={(e) => { setNewAddress(e.target.value); setSelectedAddress(null); }}
              placeholder="123 Main St, Apt 4B, City, Country, ZIP"
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#03349a] focus:border-transparent outline-none h-24 resize-none"
            ></textarea>
            {newAddress.trim() && (
              <button 
                onClick={() => addressMut.mutate({ label: "Custom", details: newAddress })}
                className="mt-3 text-sm font-bold text-[#03349a] underline"
              >
                Save this address for later
              </button>
            )}
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-red-50 h-fit">
          <h2 className="text-2xl font-black text-[#03349a] mb-6">Order Summary</h2>
          
          <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4">
                <img src={item.product?.productImages?.[0]?.url || item.product?.image} alt={item.product?.productName} className="w-16 h-16 rounded-xl object-cover bg-gray-50 border border-gray-100" />
                <div className="flex-1">
                  <p className="font-bold text-gray-900 text-sm line-clamp-1">{item.product?.productName}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Qty: {item.quantity}</p>
                </div>
                <p className="font-bold text-gray-900">₹{(item.quantity * parseFloat(item.product?.finalPrice || item.product?.price || 0)).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-dashed border-gray-200 pt-4 mb-6">
            <div className="flex justify-between font-bold text-gray-600 mb-2">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-600 mb-2">
              <span>Shipping</span>
              <span className="text-emerald-600">Free</span>
            </div>
            <div className="flex justify-between text-xl font-black text-[#03349a] mt-4 pt-4 border-t border-gray-100">
              <span>Total</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={orderMut.isPending}
            className="w-full py-4 rounded-2xl text-white font-bold text-lg cursor-pointer shadow-lg hover:-translate-y-0.5 transition-all"
            style={{ background: `linear-gradient(135deg, #03349a, #a81010)`, opacity: orderMut.isPending ? 0.7 : 1 }}
          >
            {orderMut.isPending ? "Processing..." : "Place Order (Cash on Delivery)"}
          </button>
        </div>

      </div>
    </div>
  );
}
