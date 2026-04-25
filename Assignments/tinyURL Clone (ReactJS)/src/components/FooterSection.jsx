import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#0D7592] to-[#002543] text-white py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 md:gap-8">
          
         
          <div className="space-y-4">
            <h4 className="font-bold text-lg mb-6">Features</h4>
            <ul className="space-y-3 text-sm opacity-90">
              <li><a href="#" className="hover:underline">Link Editor</a></li>
              <li><a href="#" className="hover:underline">Link Management</a></li>
              <li><a href="#" className="hover:underline">Branded Links</a></li>
              <li><a href="#" className="hover:underline">Short URL Tracking</a></li>
              <li><a href="#" className="hover:underline">QR Code Generator</a></li>
              <li><a href="#" className="hover:underline">Short URL API</a></li>
            </ul>
          </div>

          
          <div className="space-y-4">
            <h4 className="font-bold text-lg mb-6">Resources</h4>
            <ul className="space-y-3 text-sm opacity-90">
              <li><a href="#" className="hover:underline">Blog</a></li>
              <li><a href="#" className="hover:underline">For Developers</a></li>
              <li><a href="#" className="hover:underline">Our Proven Process</a></li>
              <li><a href="#" className="hover:underline">About Us</a></li>
            </ul>
          </div>

          
          <div className="space-y-4">
            <h4 className="font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-3 text-sm opacity-90">
              <li><a href="#" className="hover:underline">Help Desk</a></li>
              <li><a href="#" className="hover:underline">Contact Sales</a></li>
              <li><a href="#" className="hover:underline">Contact Support</a></li>
              <li><a href="#" className="hover:underline">Report Abuse</a></li>
            </ul>
          </div>

          
          <div className="space-y-4">
            <h4 className="font-bold text-lg mb-6">Legal</h4>
            <ul className="space-y-3 text-sm opacity-90">
              <li><a href="#" className="hover:underline">Terms of Service</a></li>
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Cookie Policy</a></li>
              <li><a href="#" className="hover:underline">Accessibility Statement</a></li>
              <li><a href="#" className="hover:underline">Privacy Manager</a></li>
            </ul>
          </div>

         
          <div className="col-span-2 lg:col-span-1 flex flex-col items-center lg:items-end justify-center space-y-6 pt-10 lg:pt-0">
            
            <div className="flex space-x-6 text-xl">
              <a href="#" className="hover:opacity-70 transition-opacity">f</a>
              <a href="#" className="hover:opacity-70 transition-opacity">📷</a>
              <a href="#" className="hover:opacity-70 transition-opacity">in</a>
              <a href="#" className="hover:opacity-70 transition-opacity">𝕏</a>
            </div>
            
            
            <div className="text-center lg:text-right">
              <div className="text-3xl font-black uppercase tracking-tighter mb-2">TinyURL</div>
              <p className="text-xs opacity-70 leading-relaxed">
                © 2026 TinyURL LLC<br />
                All Rights Reserved
              </p>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;