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

export default function Home() {
  return (
    <div>
        
        <Banner/>
        <div className='mt-10'>

        <OfferScrollBar/>
        </div>
        <CategoryList/>
        {/* <FirstBanner/> */}
        <TopSelling/>
        {/* <TwoSideBanner/>
        <GridBanner/> */}
        <OurStory/>
        <SecondBanner/>
        <OffersSection/>
        {/* <Newsletter/> */}
        <Testimonial/>
        
    </div>
  )
}
