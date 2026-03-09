import React, { useState } from "react";
import { FaHeart, FaTruck, FaUserEdit } from "react-icons/fa";

const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  addresses: [
    { id: 1, label: "Home", details: "123 Main Street, City, Country" },
    { id: 2, label: "Office", details: "456 Office Blvd, City, Country" },
  ],
};

const mockOrders = [
  { id: 101, date: "2026-01-20", status: "Delivered", total: 89.99 },
  { id: 102, date: "2026-02-10", status: "Processing", total: 49.99 },
  { id: 103, date: "2026-02-18", status: "Shipped", total: 129.99 },
];

const mockWishlist = [
  { id: 201, name: "Product A", price: 29.99, image: "https://source.unsplash.com/400x400/?skincare" },
  { id: 202, name: "Product B", price: 49.99, image: "https://source.unsplash.com/400x400/?vitamins" },
];

export default function ProfilePage() {
  const [user, setUser] = useState(mockUser);

  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* User Info */}
        <div className="bg-white shadow-lg rounded-xl p-8 flex flex-col md:flex-row md:justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Hello, {user.name}</h2>
            <p className="text-gray-700">{user.email}</p>
            <p className="text-gray-700">{user.phone}</p>
          </div>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition mt-4 md:mt-0">
            <FaUserEdit /> Edit Profile
          </button>
        </div>

        {/* Addresses */}
        <div className="bg-white shadow-lg rounded-xl p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Your Addresses</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {user.addresses.map(addr => (
              <div key={addr.id} className="p-4 border border-gray-200 rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">{addr.label}</p>
                  <p className="text-gray-700">{addr.details}</p>
                </div>
                <button className="text-indigo-600 font-medium hover:underline">Edit</button>
              </div>
            ))}
          </div>
        </div>

        {/* Orders */}
        <div className="bg-white shadow-lg rounded-xl p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Order History</h3>
          <div className="space-y-4">
            {mockOrders.map(order => (
              <div key={order.id} className="flex flex-col sm:flex-row justify-between items-center p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Order #{order.id}</p>
                  <p className="text-gray-600 text-sm">Date: {order.date}</p>
                </div>
                <p className={`font-semibold ${order.status === "Delivered" ? "text-green-600" : order.status === "Shipped" ? "text-yellow-600" : "text-gray-600"}`}>
                  {order.status}
                </p>
                <p className="font-medium text-gray-900 mt-2 sm:mt-0">${order.total.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Wishlist */}
        <div className="bg-white shadow-lg rounded-xl p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Your Wishlist</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockWishlist.map(item => (
              <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover"/>
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <h4 className="text-gray-900 font-medium">{item.name}</h4>
                    <p className="text-gray-700">${item.price.toFixed(2)}</p>
                  </div>
                  <button className="text-red-500 hover:text-red-600"><FaHeart /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}