import React from 'react';
import './index.css';
import Navbar from './components/Navbar';
import HeroSection from './components/Herosection';
import FeaturesSection from './components/Features';
import QuickAndEasySection from './components/QuickSection';
import BrandingSection from './components/BrandingSection';
import StatsSection from './components/Statistics';
import AboveFooter from './components/AboveFooter';
import Footer from './components/FooterSection';


const App = () => {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <FeaturesSection/>
      <QuickAndEasySection/>
      <BrandingSection/>
      <StatsSection/>
      <AboveFooter/>
      <Footer/>
    </div>
  )
}

export default App