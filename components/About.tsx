/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen py-20 px-6 md:px-12 max-w-[1600px] mx-auto animate-fade-in-up relative">
      {/* Background Floating Orbs */}
       <div className="absolute top-0 left-0 w-64 h-64 bg-[#FFB673] opacity-10 rounded-full blur-3xl pointer-events-none -z-10"></div>
       <div className="absolute bottom-40 right-10 w-40 h-40 shape-sphere opacity-40 animate-float -z-10"></div>
       <div className="absolute top-40 right-20 w-24 h-24 shape-sphere opacity-20 animate-float-delayed -z-10"></div>
       
       <div className="text-center mb-20 relative z-10">
         <span className="clay-text-convex text-xs font-bold uppercase tracking-widest text-[#6A4FBF] mb-6">Our Mission</span>
         <h1 className="text-5xl md:text-7xl font-extrabold text-[#4A4A4A] mb-8 drop-shadow-sm">
           Education for the <br/> Age of AI.
         </h1>
         <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-light">
           We prepare children for a future where they don't just consume technology, but understand it, question it, and shape it.
         </p>
       </div>

       {/* Main Content Blocks */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24 relative z-10">
          <div className="clay-card clay-bevel p-10 bg-white/60 relative overflow-hidden group hover:scale-[1.01] transition-transform duration-500">
             <h3 className="text-3xl font-extrabold text-[#4A4A4A] mb-6">Why Now?</h3>
             <p className="text-gray-600 leading-relaxed mb-8 text-lg font-medium">
               AI is entering the hands of students faster than schools can adapt. We fill that gap with an <span className="text-[#6A4FBF] font-bold">immersive learning world</span> that requires zero teacher training and runs on any device.
             </p>
             <button className="clay-button px-8 py-3 text-sm bg-[#F8E9DD] text-[#4A4A4A]">Read Our Vision</button>
             
             {/* Decorative abstract shape inside card */}
             <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-[#2AB9A9] opacity-10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700"></div>
          </div>
          
          <div className="relative h-[450px] clay-card clay-img-inset group">
             <img 
               src="https://images.unsplash.com/photo-1516962248559-3f0f135262c8?q=80&w=2070&auto=format&fit=crop" 
               alt="Clay Texture Art" 
               className="w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105" 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#6A4FBF]/60 via-transparent to-transparent flex items-end p-8">
                <div className="clay-card p-4 bg-white/90 backdrop-blur-sm">
                   <span className="block text-[#4A4A4A] font-bold text-lg">Founded 2024</span>
                   <span className="text-xs text-[#6A4FBF] font-bold uppercase tracking-wider">India • UAE • Global</span>
                </div>
             </div>
          </div>
       </div>

       {/* Team / Stats with Tactile Cards */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 relative z-10">
           {[
             { label: "Students", val: "50K+", color: "#FFB673", icon: "🎓" },
             { label: "Schools", val: "120+", color: "#6A4FBF", icon: "🏫" },
             { label: "Modules", val: "500+", color: "#2AB9A9", icon: "📚" }
           ].map((stat, i) => (
             <div key={i} className="clay-card clay-bevel p-8 text-center hover:-translate-y-2 transition-transform cursor-default relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1" style={{backgroundColor: stat.color}}></div>
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-5xl font-extrabold mb-2 tracking-tight" style={{color: stat.color}}>{stat.val}</div>
                <div className="text-gray-400 font-bold uppercase text-xs tracking-[0.2em]">{stat.label}</div>
             </div>
           ))}
       </div>

       {/* Call to Action - Large Tactile Section */}
       <div className="clay-card p-16 text-center relative overflow-hidden bg-[#F8E9DD] clay-bevel mb-12">
          <div className="relative z-10">
             <h2 className="text-4xl font-extrabold text-[#4A4A4A] mb-8">Ready to secure the future?</h2>
             <p className="text-gray-500 mb-10 max-w-lg mx-auto text-lg">
                Join the platform that turns screen time into skill time.
             </p>
             <div className="flex flex-col sm:flex-row justify-center gap-6">
               <button className="clay-button px-10 py-4 text-lg shadow-xl bg-[#F8E9DD] text-[#4A4A4A]">For Schools</button>
               <button className="px-10 py-4 rounded-full bg-white text-[#6A4FBF] font-bold shadow-[6px_6px_12px_#d3c6bc,-6px_-6px_12px_#ffffff] hover:shadow-[8px_8px_16px_#d3c6bc,-8px_-8px_16px_#ffffff] hover:text-[#4A4A4A] transition-all border border-white/50">
                 For Parents
               </button>
             </div>
          </div>
          
          {/* Decorative Background Orbs */}
          <div className="absolute top-[-80px] left-[-80px] w-64 h-64 bg-[#FFD447] rounded-full mix-blend-multiply filter blur-[60px] opacity-40 animate-pulse"></div>
          <div className="absolute bottom-[-80px] right-[-80px] w-64 h-64 bg-[#6A4FBF] rounded-full mix-blend-multiply filter blur-[60px] opacity-20"></div>
       </div>
    </div>
  );
};

export default About;