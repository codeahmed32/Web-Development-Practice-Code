import React from 'react';

const StatsSection = () => {
  return (
    <section className="bg-[#001f2d] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
    
        <div className="w-full md:w-1/2 p-8 md:p-16 lg:p-24 space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Transforming the Digital Landscape Since ‘02
            </h2>
            <p className="text-gray-400 text-sm md:text-base max-w-md leading-relaxed">
              TinyURL has created billions of short links for marketers, influencers, small business owners, and large businesses.
            </p>
          </div>

          
          <div className="space-y-6">
            <div className="flex items-baseline space-x-4">
              <span className="text-2xl md:text-3xl font-bold min-w-[120px]">Billions</span>
              <span className="text-gray-400 text-sm uppercase tracking-wider">of redirects per month</span>
            </div>
            
            <div className="flex items-baseline space-x-4">
              <span className="text-2xl md:text-3xl font-bold min-w-[120px]">24 years</span>
              <span className="text-gray-400 text-sm uppercase tracking-wider">of shortening URLs</span>
            </div>

            <div className="flex items-baseline space-x-4">
              <span className="text-2xl md:text-3xl font-bold min-w-[120px]">31,369,215,832</span>
              <span className="text-gray-400 text-sm uppercase tracking-wider">TinyURLs created</span>
            </div>
          </div>
        </div>

        
        <div className="w-full md:w-1/2 h-64 md:h-[600px]">
          <img 
            src="/images/Statsimg.png" 
            alt="Team working together" 
            className="w-full h-full object-cover object-center"
          />
        </div>

      </div>
    </section>
  );
};

export default StatsSection;