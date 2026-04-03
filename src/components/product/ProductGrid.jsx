import React, { useState, useEffect ,useRef} from "react";
import { axiosInstance } from "../../utils/axiosInstance";
import ProductCard from "./ProductCard";
// import { products } from "../../services/productData";
export default function ProductGrid() {
  
const headerRef = useRef(null);

const BRAND = "#03349a";
const ACCENT = "#c9643a 829b1c";
const GREEN='#829b1c'

  const [headerVisible, setHeaderVisible] = useState(false);
  // 🔹 Fetch Products
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/product/getAllProduct");
      console.log('response :',response)
      setProducts(response.data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-4 md:p-6">

      <div className="m-5 opacity-100 translate-y-0 transition-all duration-700 ease-in-out">

        <h2 className="text-[clamp(26px,4vw,36px)] font-bold text-gray-900 m-0 leading-[1.15]">
    Fuel Your Day,  <span className="text-[#03349a]">Naturally</span>
  </h2>
 <div className="mt-3 flex items-center gap-1.5">
    <div className="w-9 h-[2.5px] bg-[#03349a] rounded-full" />
    <div className="w-2 h-2 rounded-full bg-[#c9643a] opacity-60" />
    <div className="w-4 h-[2.5px] bg-[#f0ece8] rounded-full" />
  </div>
  <p className="text-[18px] font-semibold fontsemibold mt-4 text-accent mb-2.5 flex items-center gap-2.5">
    Aayubakwath brings together powerful herbs to keep you active, energized, and balanced—every single day.
    <span className="w-8 h-[1.5px] bg-accent rounded-full opacity-50 inline-block" />
  </p>

  

 
</div>
      {/* Loading */}
      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-400">No products found</p>
      ) : (

        /* 🔥 Product Grid */
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 ">
  {products.map((product, idx) => (
    <div key={product.id} className="flex justify-center">
      <ProductCard
        product={product}
        animDelay={idx * 0.08}
        sectionVisible={true}
        onClick={(item) => console.log("Go to product", item)}
        onAddToCart={(item) => console.log("Add to cart", item)}
      />
    </div>
  ))}
</div>
        
      )}
    </div>
  );
}