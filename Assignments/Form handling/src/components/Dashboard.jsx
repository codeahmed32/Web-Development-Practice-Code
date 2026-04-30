import React, { useEffect } from 'react';
import { Show, UserButton, useAuth } from '@clerk/react';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router';
import WeatherApp from './WeatherApp';
import Students from './Students';

const Dashboard = () => {
    const { isSignedIn, isLoaded } = useAuth();
    const navigate = useNavigate();

    const navigator = useNavigate();
    const toWeatherApp = () => {
        navigate("/weather-app")
    }

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            navigate("/login-page");
        }
    }, [isSignedIn, isLoaded]);

    const toStudents = () => {
        navigate("/students"); // Ya jo bhi aapka route path hai
    }; 

    return (
        <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8">
            <div className="max-w-6xl mx-auto">

                {/* Header Section */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-8 gap-4">
                    <div>
                        <h2 className="text-2xl font-black text-slate-800">Dashboard</h2>
                        <p className="text-slate-500 font-medium">Now you got all the controls </p>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-50 p-2 pr-4 rounded-2xl border border-slate-100">
                        <UserButton afterSignOutUrl="/login-page" />
                        <span className="text-sm font-bold text-slate-700">Account Settings</span>
                    </div>
                </header>


                <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Chatbot Compartment */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col h-[400px]">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-blue-100 rounded-2xl text-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-black text-slate-800">AI Chatbot</h3>
                        </div>

                        <div className="flex-1 bg-slate-50 rounded-3xl p-6 border-2 border-dashed border-slate-200 flex items-center justify-center">
                            <p className="text-slate-400 font-medium italic">Chatbot UI goes here...</p>
                        </div>

                        <button className="mt-6 bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100">
                            Start New Conversation
                        </button>
                    </div>

                    {/* Weather App Compartment */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col h-[400px]">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-orange-100 rounded-2xl text-orange-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707.707m12.728 0l-.707-.707" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-black text-slate-800">Weather Updates</h3>
                        </div>

                        <div className="flex-1 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 text-white flex flex-col justify-between shadow-inner">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-5xl font-black">28°C</p>
                                    <p className="text-lg opacity-80 font-medium">Lahore, Pakistan</p>
                                </div>
                                <div className="text-4xl">☀️</div>
                            </div>
                            <p className="text-sm font-medium bg-white/20 w-max px-4 py-2 rounded-full">Mostly Sunny</p>
                        </div>

                        <button className="mt-6 bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-colors" onClick={toWeatherApp}>
                            Check Detail Forecast
                        </button>
                    </div>

                    {/* Student Management Compartment */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col h-[400px]">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-green-100 rounded-2xl text-green-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-black text-slate-800">Student Portal</h3>
                        </div>

                        <div className="flex-1 bg-slate-50 rounded-3xl p-6 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
                            <p className="text-slate-500 font-bold text-lg mb-2">Manage Records</p>
                            <p className="text-slate-400 text-sm">Add, update, or view all student details in one place.</p>
                        </div>

                        <button
                            onClick={toStudents}
                            className="mt-6 bg-green-600 text-white py-4 rounded-2xl font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-100"
                        >
                            Open Student Management
                        </button>
                    </div>


                </main>
            </div>
        </div>
    );
};

export default Dashboard;