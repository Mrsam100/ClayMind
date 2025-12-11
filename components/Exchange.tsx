/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

const Exchange: React.FC = () => {
  return (
    <div className="min-h-screen py-20 px-6 flex items-center justify-center relative overflow-hidden">
      {/* 3D Floating Objects */}
      <div className="absolute top-20 left-10 w-32 h-32 shape-sphere opacity-40 animate-float-delayed"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 shape-sphere opacity-20 animate-float"></div>

      <div className="max-w-md w-full clay-card p-8 z-10 relative">
        <h2 className="text-3xl font-extrabold text-[#4A4A4A] mb-8 text-center">AI Fact Simulator</h2>
        <p className="text-center text-gray-500 mb-6 text-sm">Input a statement and see how the AI analyzes it for truth.</p>
        
        {/* Input */}
        <div className="bg-[#f0e6da] rounded-2xl p-4 mb-4 shadow-inner">
           <div className="flex justify-between mb-2">
             <span className="text-xs font-bold text-gray-500">Statement Input</span>
           </div>
           <div className="flex gap-4 items-center">
             <input type="text" placeholder="e.g. Sharks live in volcanoes" className="bg-transparent text-lg font-bold text-[#4A4A4A] outline-none w-full placeholder-gray-300" />
           </div>
        </div>

        {/* Processing Arrow */}
        <div className="flex justify-center -my-4 relative z-10">
           <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md border-4 border-[#F8E9DD] text-[#6A4FBF] animate-pulse">
             <span className="text-xl">🤖</span>
           </button>
        </div>

        {/* Output */}
        <div className="bg-[#f0e6da] rounded-2xl p-4 mb-8 shadow-inner pt-6">
           <div className="flex justify-between mb-2">
             <span className="text-xs font-bold text-gray-500">AI Analysis</span>
           </div>
           <div className="flex gap-4 items-center min-h-[40px]">
             <span className="text-gray-400 font-bold italic">Waiting for input...</span>
           </div>
        </div>

        <div className="flex justify-between text-sm font-semibold text-gray-500 mb-8 px-2">
           <span>Accuracy</span>
           <span>98% Confidence</span>
        </div>

        <button className="clay-button w-full py-4 text-lg shadow-lg bg-[#F8E9DD] text-[#4A4A4A]">Analyze Statement</button>
      </div>
    </div>
  );
};

export default Exchange;