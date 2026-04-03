import React from 'react'
import Banner from '../components/layout/Banner'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Newsletter from '../components/layout/NewsLetter'
import OffersSection from '../components/layout/OfferSection'
import CategoryList from '../components/product/CategoryList'
import FirstBanner from '../components/layout/banner/FirstBanner'
import TopSelling from '../components/product/TopSelling'
import GridBanner from '../components/layout/banner/GridBanner'
import OurStory from '../components/layout/OurStory'
import SecondBanner from '../components/layout/banner/SecondBanner'
import Testimonial from '../components/layout/Testimonial'
import TwoSideBanner from '../components/layout/banner/TwoSideBanner'
import OfferScrollBar from '../components/layout/OfferScrollBar'
import RewardsCard from '../components/common/RewardsCard'
import ProductGrid from '../components/product/ProductGrid'
import ClientReview from '../components/clientReview/ClientReview'
import BanrCombo from '../components/layout/banner/BanrCombo'
import Certificate from './Certificate'
import ReelSection from '../components/layout/ReelSection'
import VideoPage from './VideoPage'
import { Helmet } from "react-helmet-async";

export default function Home() {
  return (
    <div>
        <Helmet>
        <title>Home - Aayubakwath</title>
      </Helmet>
        <Banner/>
        <div className='mt-10'>

        <OfferScrollBar/>
        </div>
        <CategoryList/>
        <ProductGrid/>
        <FirstBanner/>
{/* <GridBanner/> */}
<div className='mb-20'>
<VideoPage/>
  </div>
        <TopSelling/>
        {/* <TwoSideBanner/>
        <GridBanner/> */}
        {/* <OurStory/> */}
        {/* 
        <OffersSection/> */}
        {/* <Newsletter/> */}
        <BanrCombo/>
        <RewardsCard/>
        <ClientReview/>
        <SecondBanner/>

        <Certificate/>
<ReelSection/>
        {/* <Testimonial/> */}
        
    </div>
  )
}
