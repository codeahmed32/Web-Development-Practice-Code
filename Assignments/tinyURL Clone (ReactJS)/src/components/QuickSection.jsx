import React from 'react';

const QuickAndEasySection = () => {
  return (
    <section className="bg-gray-50 py-10 md:py-0"> 
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch bg-white shadow-lg overflow-hidden">
        
        <div className="w-full md:w-1/2 relative bg-[#136173]">
          <img 
            src="/images/QuickSectionLeftimg.png" // Replace with your image path
            alt="Person using a tablet with analytics data"
            className="w-full h-full object-cover relative z-10"
          />

        </div>

        <div className="w-full md:w-1/2 bg-[#136173] text-white p-8 px-6 md:px-16 md:py-16 lg:px-20 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-8">
            Link Shortening Done Quick and Easy
          </h2>
          
          <div className="space-y-6 text-base md:text-lg text-white/90 leading-relaxed max-w-xl">
            <p>
              Our URL shortener is not only among the first-ever link
              shorteners on the Internet — it's the best out there.
            </p>
            <p>
              Shorten links for social media, blogs, SMS, emails, ads, and
              almost anything both off- and online.
            </p>
            <p>
              Wave goodbye to long, clunky links and give your audiences
              the experiences they deserve!
            </p>
          </div>

          <div className="flex flex-row items-center gap-4 mt-10">
            <button className="bg-white text-[#136173] font-bold text-lg px-8 py-3 rounded hover:bg-gray-200 transition duration-150">
              View Plans
            </button>
            <button className="bg-[#002d3a] text-white font-semibold text-lg px-8 py-3 rounded hover:bg-[#003a4d] transition duration-150 border border-transparent hover:border-white/20">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickAndEasySection;