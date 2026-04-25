import React from 'react';

const BrandingSection = () => {
  return (
    <section className="bg-white py-16 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#001f2d]">
            Your One-Stop Solution for Branding and Managing Links
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We offer a comprehensive suite of premium features to allow users to brand and manage links conveniently and confidently.
          </p>
          <button className="bg-[#005f7a] text-white px-6 py-2 rounded font-semibold hover:bg-[#004b61] transition">
            View Plans
          </button>
        </div>

    
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          
         
          <div className="space-y-12">
            <div className="text-center lg:text-left">
              <h3 className="font-bold text-lg text-[#001f2d] mb-2">Unlimited Tracked Clicks</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We don't believe in making you suffer for your success: track as many clicks as you earn with our Pro plans!
              </p>
            </div>

            <div className="text-center lg:text-left">
              <h3 className="font-bold text-lg text-[#001f2d] mb-2">Detailed Link Analytics</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Get actionable, detailed insights into your social media, emails, ads, and any other platforms where click-through matters.
              </p>
            </div>

            <div className="text-center lg:text-left">
              <h3 className="font-bold text-lg text-[#001f2d] mb-2">Branded Domains</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Links shortened using your own custom domain are more professional, more trustworthy, and more clickable.
              </p>
            </div>
          </div>

          <div className="flex justify-center order-first lg:order-none">
            <img 
              src="/images/BrandingSectionImg.png" 
              alt="Branding solutions" 
              className="w-full max-w-[350px] md:max-w-[450px] object-contain"
            />
          </div>

         
          <div className="space-y-12">
            <div className="text-center lg:text-left">
              <h3 className="font-bold text-lg text-[#001f2d] mb-2">Fully Custom Links</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Create short links that put your brand front-and-center! Attaching your brand domain to TinyURL is quick and intuitive.
              </p>
            </div>

            <div className="text-center lg:text-left">
              <h3 className="font-bold text-lg text-[#001f2d] mb-2">Bulk Short URLs</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Need tons of unique, rule-based links quickly? Shorten several links in a single go using our platform or API.
              </p>
            </div>

            <div className="text-center lg:text-left">
              <h3 className="font-bold text-lg text-[#001f2d] mb-2">Link Management</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Worried about finding one or two essential links in a tide of thousands? We solve that with intuitive management features.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}; export default BrandingSection;