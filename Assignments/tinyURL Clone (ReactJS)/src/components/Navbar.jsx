import React from 'react'
import  { useState } from 'react';
// import './index.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gradient-to-r from-[#005f7a] to-[#002d3a] text-white px-6 py-4 relative">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-10">
                    <div className="text-2xl md:text-3xl font-black uppercase tracking-tighter">TinyURL</div>
                    <div className="hidden lg:flex space-x-8 text-lg font-medium">
                        <a href="#" className="hover:opacity-80">Plans</a>
                        <a href="#" className="hover:opacity-80">Features</a>
                        <a href="#" className="hover:opacity-80">Domains</a>
                        <a href="#" className="hover:opacity-80">Resources</a>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="hidden md:flex items-center space-x-6 text-lg font-medium">
                        <a href="#">Log In</a>
                        <a href="#" className="bg-[#007a99] border border-white/20 px-5 py-2 rounded-md">Sign Up</a>
                    </div>

                    <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-2xl focus:outline-none">
                        {isOpen ? '✕' : '☰'}
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-[#002d3a] p-6 flex flex-col space-y-4 z-50 shadow-xl">
                    <a href="#">Plans</a>
                    <a href="#">Features</a>
                    <a href="#">Domains</a>
                    <a href="#">Resources</a>
                    <hr className="border-white/10" />
                    <a href="#">Log In</a>
                    <a href="#" className="bg-[#007a99] py-3 text-center rounded-md">Sign Up</a>
                </div>
            )}
        </nav>
    )
}

export default Navbar