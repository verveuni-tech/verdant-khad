import React from 'react'
import Hero from '../components/Home/Hero'
import Categories from '../components/Home/Categories'
import FeaturedProducts from '../components/Home/FeaturedProducts'
import OrganicSolutions from '../components/Home/OrganicSolutions'
import ShopByUseCase from '../components/Home/ShopByUseCase'
import TrustStrip from '../components/Home/TrustStrip'

const Home = () => {
  return (
    <div>
      <Hero/>
      <Categories/>
      <ShopByUseCase/>
      <TrustStrip/>
      <FeaturedProducts/>
      <OrganicSolutions/>
      
    </div>
  )
}

export default Home
