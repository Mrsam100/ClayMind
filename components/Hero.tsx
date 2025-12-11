
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {/* Main Banner */}
        <div className="lg:col-span-2 bg-[#6A4FBF] rounded-[32px] p-8 md:p-12 text-white relative overflow-hidden flex flex-col justify-center min-h-[400px] shadow-sm">
            {/* Background shapes */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#8065d4] rounded-full -translate-y-1/2 translate-x-1/3 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#FF9F1C] rounded-full translate-y-1/2 -translate-x-1/2 opacity-20"></div>

            <div className="relative z-10 max-w-lg">
                <div className="inline-block bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold mb-6 border border-white/20">
                    New Module Added!
                </div>
                <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
                    Master AI before <br/> it masters you.
                </h1>
                <p className="text-lg text-white/80 mb-8 font-medium">
                    Join 50,000+ students learning to spot deepfakes, understand algorithms, and code the future.
                </p>
                <div className="flex gap-4">
                    <button className="bg-[#FF9F1C] text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-[#e0890b] transition-colors hover:scale-105 transform duration-200">
                        Start Adventure
                    </button>
                    <button className="bg-white/10 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-colors">
                        View Curriculum
                    </button>
                </div>
            </div>
        </div>

        {/* Side Stats / Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
            <div className="bg-white rounded-[32px] p-8 border border-[#E5E5E5] flex flex-col justify-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-[#E0F7FA] flex items-center justify-center text-2xl mb-4">🔥</div>
                <h3 className="text-4xl font-extrabold text-[#1F1F1F] mb-1">12 Day</h3>
                <p className="text-gray-500 font-medium">Learning Streak</p>
                <div className="mt-4 flex gap-1">
                    {[1,1,1,1,0,0,0].map((active, i) => (
                        <div key={i} className={`h-2 flex-1 rounded-full ${active ? 'bg-[#FF9F1C]' : 'bg-gray-100'}`}></div>
                    ))}
                </div>
            </div>

            <div className="bg-[#FF9F1C] rounded-[32px] p-8 text-white relative overflow-hidden flex flex-col justify-center hover:shadow-md transition-shadow group cursor-pointer">
                <div className="absolute -right-4 -bottom-4 text-[80px] opacity-20 group-hover:scale-110 transition-transform">🤖</div>
                <h3 className="text-2xl font-bold mb-2">Daily Challenge</h3>
                <p className="opacity-90 mb-4 text-sm">Can you identify the AI-generated image?</p>
                <button className="bg-white text-[#FF9F1C] px-6 py-2 rounded-lg font-bold text-sm w-fit shadow-sm">Play Now</button>
            </div>
        </div>
    </div>
  );
};

export default Hero;
