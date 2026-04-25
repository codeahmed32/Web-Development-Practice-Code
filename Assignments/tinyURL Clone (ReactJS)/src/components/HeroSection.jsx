import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-[#001f2d] text-white py-12 px-6 md:py-20 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <div className="text-center lg:text-left space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            URL Shortener, Branded Short Links & Analytics
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-xl mx-auto lg:mx-0">
            Welcome to the original link shortener — simplifying the Internet through the power of the URL since 2002.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <button className="bg-white text-[#001f2d] font-bold px-8 py-3 rounded">View Plans</button>
            <button className="bg-[#007a99] text-white font-bold px-8 py-3 rounded">Create Free Account</button>
          </div>
        </div>


        <div className="bg-white rounded-lg shadow-2xl text-gray-800 w-full max-w-lg mx-auto lg:ml-auto">
          
          <div className="flex text-sm md:text-base">
            <button className="flex-1 py-4 bg-white border-b-2 border-blue-500 font-bold">Shorten a Link</button>
            <button className="flex-1 py-4 bg-[#007a99] text-white font-bold">Generate QR Code</button>
          </div>
          <div className="p-5 md:p-8 space-y-4">
             <label className="block font-bold">Long URL *</label>
             <input type="text" placeholder="Paste URL here" className="w-full p-3 border rounded border-gray-300" />
             <button className="w-full bg-[#1e7e44] text-white font-bold py-4 rounded text-lg">Shorten Link</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;