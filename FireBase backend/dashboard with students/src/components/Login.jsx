import React from 'react';
import { Show, SignIn, UserButton } from '@clerk/react';
import { useNavigate } from 'react-router';

 
const internalSignInAppearance = {
    elements: {

        headerTitle: {
            display: "none"
        },
        headerSubtitle: {
            display: "none"
        },
      
        card: {
            boxShadow: "none",
            backgroundColor: "transparent",
            width: "100%", 
            marginTop: "0", 
        },
    
        formButtonPrimary: {
            borderRadius: "0.75rem", 
            transition: "all 150ms ease-in-out",
            "&:hover": {
                transform: "scale(1.02)",
            }
        },
        
        formFieldInput: {
            borderRadius: "0.75rem", 
            padding: "0.75rem 1rem", 
            border: "1px solid #e2e8f0", 
            "&:focus": {
                borderColor: "#3b82f6", 
                ringWidth: "2px",
                ringColor: "rgba(59, 130, 246, 0.25)" 
            }
        },
        
        socialButtonsBlockButton: {
            borderRadius: "0.75rem",
            transition: "all 150ms ease-in-out",
            "&:hover": {
                backgroundColor: "#f8fafc", 
            }
        },
        footer: {
            marginTop: "0",
            paddingTop: "0",
        },
        footerActionText: {
            color: "#64748b", 
        },
        footerActionLink: {
            color: "#3b82f6", 
            fontWeight: "600", 
        }
    }
};

const Login = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">

            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 space-y-6 flex flex-col items-center border border-slate-100">

                <div className="text-center w-full mb-6">
                    <h3 className="text-3xl font-extrabold text-gray-950 tracking-tight">Welcome Back</h3>
                    <p className="text-gray-600 mt-2 text-lg">Log In Into Your Account </p>
                </div>

                <div className="w-full flex justify-center">
                    <Show when="signed-out">
                        <SignIn
                            fallbackRedirectUrl="/dashboard"
                            appearance={internalSignInAppearance}
                        />
                    </Show>
                    <Show when="signed-in">
                        <div className="text-center space-y-4 py-6">
                            <p className="text-green-700 font-semibold text-lg flex items-center gap-2 justify-center">
                                <span className="text-2xl">✓</span>
                                You are already Logged In
                            </p>
                            <div className="flex justify-center mt-2">
                                <UserButton afterSignOutUrl="/login-page" showName />
                            </div>
                        </div>
                    </Show>
                </div>

                <div className="w-full border-t border-slate-100 pt-6 mt-6">
                    <button
                        onClick={() => navigate("/")}
                        className="w-full text-slate-600 hover:text-blue-600 transition flex items-center justify-center gap-2 font-medium text-base hover:bg-blue-50/50 py-3 rounded-xl"
                    >
                        <span>←</span> Back To Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;