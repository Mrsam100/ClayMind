/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

const Learn: React.FC = () => {
  const topics = [
    { title: "What is AI?", color: "#FFB673", icon: "🤖" },
    { title: "Machine Learning", color: "#6A4FBF", icon: "🧠" },
    { title: "Digital Ethics", color: "#2AB9A9", icon: "⚖️" },
    { title: "Online Safety", color: "#FFD447", icon: "🛡️" },
  ];

  return (
    <section className="py-20 px-6 md:px-12 max-w-[1600px] mx-auto w-full">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#4A4A4A] mb-4">ClayMind Academy</h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">Teacher resources and lesson plans for integrating AI literacy into your curriculum.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {topics.map((topic, i) => (
           <div key={i} className="clay-card p-8 flex flex-col items-center text-center hover:-translate-y-2 transition-transform cursor-pointer group">
               <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner bg-[#F8E9DD] group-hover:scale-110 transition-transform">
                  {topic.icon}
               </div>
               <h3 className="text-xl font-bold text-[#4A4A4A] mb-2">{topic.title}</h3>
               <button className="mt-4 text-sm font-bold" style={{ color: topic.color }}>View Lesson Plan →</button>
           </div>
        ))}
      </div>

      <div className="mt-20 clay-card p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 bg-white/50">
          <div className="flex-1">
             <span className="text-xs font-bold uppercase tracking-widest text-[#6A4FBF] mb-2 block">For Schools</span>
             <h2 className="text-3xl font-extrabold text-[#4A4A4A] mb-4">Scalable Curriculum</h2>
             <p className="text-gray-600 mb-8 leading-relaxed">Our platform aligns with global education standards and requires zero teacher training. Start in India, expand globally.</p>
             <button className="clay-button px-8 py-3 bg-[#F8E9DD] text-[#4A4A4A]">Partner With Us</button>
          </div>
          <div className="w-full md:w-1/3 h-64 bg-gray-200 rounded-2xl relative overflow-hidden shadow-inner">
             {/* Abstract Clay Illustration using simple divs */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-[#FFB673] shadow-lg"></div>
             <div className="absolute top-1/3 left-1/4 w-16 h-16 rounded-full bg-[#6A4FBF] opacity-80 mix-blend-multiply"></div>
          </div>
      </div>
    </section>
  );
};

export default Learn;