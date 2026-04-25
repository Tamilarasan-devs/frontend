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
import LazySection from '../components/common/LazySection'
import About from './About'
import AboutPage from './NewAbout'
import OurBusiness from './AboutPage'

export default function Home() {
  return (
    <div>
        <Helmet>
        <title>Home - Aayubakwath</title>
      </Helmet>

        {/* ── Above the fold — loads immediately ── */}
        <Banner/>
        <div className='mt-10'>
        <OfferScrollBar/>
        </div>
        <FirstBanner/>
        <CategoryList/>

        {/* ── Below the fold — loads only when scrolled near ── */}

        <LazySection minHeight={400}>
          <ProductGrid/>
        </LazySection>

 <LazySection minHeight={300}>
         <OurBusiness/>
        </LazySection>
 <LazySection minHeight={300}>
          <OurStory/>
        </LazySection>


        {/* <LazySection minHeight={300}>
          <VideoPage/>
        </LazySection> */}

        <LazySection minHeight={400}>
          <TopSelling/>
        </LazySection>

        <LazySection minHeight={250}>
          <BanrCombo/>
        </LazySection>

        <LazySection minHeight={100}>
          <RewardsCard/>
        </LazySection>

        <LazySection minHeight={300}>
          <ClientReview/>
        </LazySection>

       

        <LazySection minHeight={250}>
          <SecondBanner/>
        </LazySection>

        <LazySection minHeight={200}>
          <Certificate/>
        </LazySection>

        {/* <LazySection minHeight={400}>
          <ReelSection/>
        </LazySection> */}

        <LazySection minHeight={500}>
          <Testimonial/>
        </LazySection>

        
    </div>
  )
}
