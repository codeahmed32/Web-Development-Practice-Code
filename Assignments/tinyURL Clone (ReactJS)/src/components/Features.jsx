import React from 'react';

const FeaturesSection = () => {
  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#001f2d] mb-12">
          TinyURL Plans Include:
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          
          {[
            { title: "Detailed Link Analytics", img: "cardimg1.png" },
            { title: "Fully Branded Domains", img: "cardimg2.png" },
            { title: "Bulk Short URLs", img: "cardimg3.png" },
            { title: "Link Management", img: "cardimg4.png" }
          ].map((item, i) => (
            <div key={i} className="flex flex-col text-center md:text-left">
              <h3 className="text-xl font-bold text-[#001f2d] mb-3">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-6">
                Detailed description goes here for each feature...
              </p>
              <div className="mt-auto h-40 flex justify-center md:justify-start items-end">
                <img src={`/images/${item.img}`} alt={item.title} className="max-h-full object-contain" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;