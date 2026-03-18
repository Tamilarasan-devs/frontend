import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";
import OfferModal from "../components/layout/OfferModel";
import TrackOrder from "../components/product/TrackOrder";

/* Lazy Loaded Pages */
const Home = lazy(() => import("../pages/Home"));
const LoginPage = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const ContactPage = lazy(() => import("../pages/ContactPage"));
const AboutPage = lazy(() => import("../pages/AboutPage"));
const BlogPage = lazy(() => import("../pages/Blog"));
const CartCheckout = lazy(() => import("../pages/Cart"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const WishlistPage = lazy(() => import("../pages/WishlistPage"));
const Dealership = lazy(() => import("../pages/Dealership"));
const About = lazy(() => import("../pages/About"));

/* Lazy Loaded Components */
const ProductListingPage = lazy(() =>
  import("../components/product/ProductListingPage")
);
const SingleProduct = lazy(() =>
  import("../components/product/SingleProduct")
);
const CategoryList = lazy(() =>
  import("../components/product/CategoryList")
);
const ProductGrid = lazy(() =>
  import("../components/product/ProductGrid")
);
const ClientReview = lazy(() =>
  import("../components/clientReview/ClientReview")
);
const OfferScrollBar = lazy(() =>
  import("../components/layout/OfferScrollBar")
);
const Banner = lazy(() => import("../components/layout/Banner"));

export default function AppRoutes() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <BrowserRouter>
      <OfferModal />

      <Suspense fallback={<div style={{padding:"40px",textAlign:"center"}}>Loading...</div>}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/scroll-bar" element={<OfferScrollBar />} />
            <Route path="/banner" element={<Banner />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/productListing" element={<ProductListingPage />} />
            <Route path="/cart" element={<CartCheckout />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/dealership" element={<Dealership />} />
            <Route path="/aboutpage" element={<About />} />
            <Route path="/product" element={<SingleProduct />} />
            <Route path="/categorylist" element={<CategoryList />} />
            <Route path="/productgrid" element={<ProductGrid />} />
            <Route path="/clientreview" element={<ClientReview />} />
            <Route path="/trackorder" element={<TrackOrder/> }   />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}