
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import ClayScene from './ClayScene';
import { BRAND_NAME } from '../constants';

interface LandingPageProps {
  onLoginClick: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLoginClick }) => {
  return (
    <div className="relative min-h-screen bg-[#FFF8F0] overflow-x-hidden">
      {/* 3D Scene Background - Only active here */}
      <ClayScene />

      {/* Navigation Header */}
      <nav className="relative z-10 flex justify-between items-center px-6 md:px-12 py-6 max-w-[1600px] mx-auto">
        <div className="flex items-center gap-2">
           <div className="w-10 h-10 rounded-xl bg-[#FF9F1C] flex items-center justify-center text-white font-bold text-xl shadow-lg border-2 border-white">C</div>
           <span className="font-extrabold text-2xl text-[#4A4A4A] tracking-tight">{BRAND_NAME}</span>
        </div>
        <div className="flex gap-4">
           <button onClick={onLoginClick} className="hidden md:block px-6 py-2 font-bold text-[#4A4A4A] hover:text-[#6A4FBF]">Schools</button>
           <button 
             onClick={onLoginClick}
             className="px-8 py-3 bg-[#6A4FBF] text-white rounded-full font-bold shadow-lg hover:scale-105 transition-transform"
            >
              Log In
           </button>
        </div>
      </nav>

      {/* Main Hero Content */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
         <div className="inline-block px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-[#FFB673] text-[#FF9F1C] font-extrabold text-sm mb-8 animate-bounce">
            🚀 The #1 AI Safety Platform for Kids
         </div>
         
         <h1 className="text-6xl md:text-8xl font-extrabold text-[#4A4A4A] mb-8 leading-tight drop-shadow-sm max-w-4xl">
            Education for the <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9F1C] to-[#6A4FBF]">Age of AI.</span>
         </h1>

         <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mb-12 font-medium leading-relaxed">
            Gamified lessons that teach children aged 7-14 how to understand algorithms, spot deepfakes, and navigate the digital world safely.
         </p>

         <div className="flex flex-col sm:flex-row gap-6">
            <button 
                onClick={onLoginClick}
                className="px-12 py-5 bg-[#FF9F1C] text-white text-xl font-bold rounded-2xl shadow-[0_10px_20px_rgba(255,159,28,0.3)] hover:-translate-y-1 transition-transform border-b-4 border-[#e0890b]"
            >
                Student Start
            </button>
            <button 
                onClick={onLoginClick}
                className="px-12 py-5 bg-white text-[#4A4A4A] text-xl font-bold rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-transform border-b-4 border-gray-200"
            >
                Parent Guide
            </button>
         </div>

         {/* Floating Elements simulated with CSS for performance over JS */}
         <div className="absolute top-1/4 left-10 hidden lg:block animate-float">
            <div className="bg-white p-4 rounded-2xl shadow-xl transform -rotate-12 border border-gray-100">
                <span className="text-4xl">🤖</span>
            </div>
         </div>
         <div className="absolute bottom-1/4 right-10 hidden lg:block animate-float-delayed">
            <div className="bg-white p-4 rounded-2xl shadow-xl transform rotate-12 border border-gray-100">
                <span className="text-4xl">🛡️</span>
            </div>
         </div>
      </section>
      
      {/* Simple Footer for Landing */}
      <footer className="relative z-10 py-8 text-center text-gray-400 text-sm font-bold bg-[#FFF8F0]/80 backdrop-blur-sm">
          &copy; 2025 ClayMind. Building safe digital futures.
      </footer>
    </div>
  );
};

export default LandingPage;
