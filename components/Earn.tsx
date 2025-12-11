/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

const Earn: React.FC = () => {
  const leaders = [
    { asset: "Logic Master", apy: "Level 12", tvl: "4,500 XP", color: "#627EEA", icon: "🧠" },
    { asset: "Safety Hero", apy: "Level 10", tvl: "3,200 XP", color: "#2775CA", icon: "🛡️" },
    { asset: "Prompt Pro", apy: "Level 8", tvl: "2,800 XP", color: "#14F195", icon: "💬" },
    { asset: "Data Whiz", apy: "Level 15", tvl: "6,000 XP", color: "#E6007A", icon: "📊" },
  ];

  return (
    <div className="min-h-screen py-20 px-6 md:px-12 max-w-[1600px] mx-auto animate-fade-in-up">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#4A4A4A] mb-4">Class Leaderboard</h1>
        <p className="text-lg text-gray-500">Track your progress and earn badges as you master AI literacy.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {leaders.map((pool, idx) => (
          <div key={idx} className="clay-card p-6 flex flex-col items-center hover:scale-105 transition-transform cursor-pointer">
            <div 
                className="w-16 h-16 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-md mb-6"
                style={{ backgroundColor: pool.color }}
            >
                {pool.icon}
            </div>
            <h3 className="text-xl font-bold text-[#4A4A4A] mb-1">{pool.asset}</h3>
            <span className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-6">Achievement</span>
            
            <div className="w-full bg-white/50 rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">Rank</span>
                    <span className="text-lg font-bold text-[#2AB9A9]">{pool.apy}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Total XP</span>
                    <span className="text-sm font-bold text-[#4A4A4A]">{pool.tvl}</span>
                </div>
            </div>

            <button className="clay-button w-full py-3 text-sm bg-[#F8E9DD] text-[#4A4A4A]">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Earn;