import React from 'react';

const AboveFooter = () => {
  return (
    <section className="bg-[#002342] py-16 px-6 md:py-24">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        
        
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Ready for Shorter, Smarter Links?
        </h2>

        
        <p className="text-white text-base md:text-lg opacity-90 max-w-2xl mx-auto leading-relaxed">
          Transform a long link into a short, trackable one using our platform. 
          Create a free account or subscribe to a paid plan today!
        </p>

        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
          <button className="w-full sm:w-auto bg-white text-[#001f2d] font-bold px-10 py-3 rounded hover:bg-gray-100 transition duration-200">
            View Plans
          </button>
          <button className="w-full sm:w-auto bg-[#007a99] text-white font-bold px-10 py-3 rounded hover:bg-[#008cb0] transition duration-200">
            Create Free Account
          </button>
        </div>

      </div>
    </section>
  );
};

export default AboveFooter;