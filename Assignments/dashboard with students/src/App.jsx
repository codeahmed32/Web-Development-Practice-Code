import React from 'react';
import { useNavigate } from 'react-router';

const App = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Simple Navigation */}
      <nav className="flex justify-between items-center px-8 py-3 bg-white shadow-sm">
        <h1 className="text-2xl font-black text-blue-600 tracking-tighter">My Portfolio</h1>
        <button 
          onClick={() => navigate("/login-page")}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
        >
          Login
        </button>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center mt-20 px-4 text-center">
        <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-bold mb-4 uppercase tracking-widest">
          Welcome to My Projects PlatForm
        </span>
        <h2 className="text-2xl md:text-5xl font-black text-slate-900 mb-6">
          Everything you need, <br /> <span className="text-blue-600">in one place.</span>
        </h2>
        <p className="text-slate-500 text-lg max-w-xl mb-10 leading-relaxed">
          Log in To see my Progress 
        </p>
        <button 
          onClick={() => navigate("/login-page")}
          className="bg-slate-900 text-white px-10 py-4 rounded-2xl text-xl font-bold hover:bg-black transition-transform hover:scale-105"
        >
          Get Started →
        </button>
      </div>
    </div>
  );
};

export default App;