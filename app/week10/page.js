"use client";   
import React from 'react';
import { useUserAuth } from "./_utils/auth-context"; // Ensure this path is correct.
import Link from 'next/link';

export default function Page() {
    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

    const pagePosition = {
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    };

    if (!user) {
        return (
            <main className="flex items-center justify-center h-screen" style={pagePosition}>
                <div className="bg-white w-96 p-6 rounded shadow-sm">
                    <div className="flex items-center justify-center mb-4">
                        <img 
                            src="https://cdn.iconscout.com/icon/free/png-256/github-156-675764.png" 
                            alt="GitHub Logo" 
                            className="w-12 h-12" 
                        />
                    </div>
                    <button 
                        onClick={gitHubSignIn} 
                        className="bg-purple-500 w-full text-gray-100 py-2 rounded hover:bg-gray-600 transition-colors"
                    >
                        Login with GitHub
                    </button>
                </div>
            </main>
        );
    }
    
    return (
        <main className="flex items-center justify-center h-screen" style={backgroundImageStyle}>
          <div className="bg-white max-w-2xl w-full h-auto p-8 rounded shadow-2xl border-8 border-black ">
            <div className="flex items-center justify-center mb-10 flex-col">
              <h3 className="text-gray-700 text-lg font-bold">Successfully Authenticated</h3>
              <p className="text-black text-lg ">Welcome to the app, {user.displayName}</p>
            </div>
            <div>
              <Link href="/week10/shopping-list">
                <div className="bg-orange-500 w-full text-gray-100 py-2 rounded-md   mb-6 mt-4 hover:bg-orange-600 transition-colors block text-center ">
                  Shopping List
                </div>
              </Link>
            </div>
            <button onClick={firebaseSignOut} className="bg-red-500 w-full text-gray-100 py-2 rounded hover:bg-gray-600 transition-colors">
              Sign Out
            </button>
          </div>
        </main>
      );
    }