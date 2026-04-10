import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";
import OfferModal from "../components/layout/OfferModel";
import TrackOrder from "../components/product/TrackOrder";
import ShippingPolicy from "../pages/help-support/ShippingPolicy";
import TermsOfService from "../pages/help-support/TermsConditions";
import Policy from "../pages/help-support/Policy";
import RefundPolicy from "../pages/help-support/RefundPolicy";
import Faq from "../pages/help-support/Faq";



/* Lazy Loaded Pages */
const Home = lazy(() => import("../pages/Home"));
const LoginPage = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const ContactPage = lazy(() => import("../pages/ContactPage"));
const AboutPage = lazy(() => import("../pages/AboutPage"));
const BlogPage = lazy(() => import("../pages/Blog"));
const BlogDetail = lazy(() => import("../pages/BlogDetail"));
const CartCheckout = lazy(() => import("../pages/Cart"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const WishlistPage = lazy(() => import("../pages/WishlistPage"));
const Dealership = lazy(() => import("../pages/Dealership"));
const About = lazy(() => import("../pages/About"));
const Checkout = lazy(() => import("../pages/Checkout"));
const NewAbout = lazy(()=> import("../pages/NewAbout"))

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

      {/* <Suspense fallback={<div style={{padding:"40px",textAlign:"center"}}></div>}> */}
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/scroll-bar" element={<OfferScrollBar />} />
            <Route path="/banner" element={<Banner />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* <Route path="/about" element={<NewAbout />} /> */}
            {/* <Route path="/about" element={<AboutPage />} /> */}
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/productListing" element={<ProductListingPage />} />
            <Route path="/cart" element={<CartCheckout />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/dealership" element={<Dealership />} />
            <Route path="/aboutpage" element={<NewAbout />} />
            <Route path="/product/:id" element={<SingleProduct />} />
            <Route path="/categorylist" element={<CategoryList />} />
            <Route path="/productgrid" element={<ProductGrid />} />
            <Route path="/clientreview" element={<ClientReview />} />
            <Route path="/trackorder" element={<TrackOrder/> }   />
            <Route path="/shipping-policy" element={<ShippingPolicy/> }  />
            <Route path="/terms"  element={<TermsOfService/> } />
         <Route path="/privacy" element={<Policy/> } />
         <Route path="/returns" element={<RefundPolicy/> } />
         <Route path="/faq" element={<Faq/> } />
          </Route>
        </Routes>
      {/* </Suspense> */}
    </BrowserRouter>
  );
}