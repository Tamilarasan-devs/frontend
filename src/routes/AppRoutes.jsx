import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import OfferScrollBar from '../components/layout/OfferScrollBar'
import Banner from '../components/layout/Banner'
import LoginPage from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home'
import Layout from '../components/layout/Layout'
import ContactPage from '../pages/ContactPage'
import AboutPage from '../pages/AboutPage'
import BlogPage from '../pages/Blog'
import ProductListingPage from "../components/product/ProductListingPage"
import CartCheckout from '../pages/Cart'
import ProfilePage from '../pages/ProfilePage'
import WishlistPage from '../pages/WishlistPage'
import Dealership from '../pages/Dealership'
import About from '../pages/About'
import SingleProduct from '../components/product/SingleProduct'
import OfferModal from '../components/layout/OfferModel'
import CategoryList from '../components/product/CategoryList'
import ProductGrid from '../components/product/ProductGrid'
import ClientReview from '../components/clientReview/ClientReview'



export default function AppRoutes() {

  return (
    <>
          
              
    <BrowserRouter>
    <OfferModal/>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/scroll-bar" element={<OfferScrollBar />} />
          <Route path="/banner" element={<Banner />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path='/contact'  element={<ContactPage />} />
          <Route path='/about'  element={<AboutPage />} />
          <Route path='/blog'  element={<BlogPage />} />
          <Route path='/productListing' element={<ProductListingPage />} />
          <Route path='/cart' element={<CartCheckout />} />
          <Route  path='/profile' element={<ProfilePage />} />
          <Route path='/wishlist' element={<WishlistPage />} />
          <Route path='/dealership' element={<Dealership />} />
          <Route path='/aboutpage' element={<About/>} />
          <Route path='/product' element={<SingleProduct/> } />
          <Route path='/categorylist' element={<CategoryList/>}/>
          <Route path='/productgrid' element={<ProductGrid/> }  />
          <Route path='/clientreview' element={<ClientReview/> } />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
          
  )
}
