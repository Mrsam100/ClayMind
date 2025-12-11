/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect, useState } from 'react';

const Mascot: React.FC = () => {
  const [eyePos, setEyePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate eye position bounded within the eye area
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      setEyePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed bottom-10 left-10 z-[60] hidden md:block group perspective-[800px]">
       <div className="relative w-24 h-24 animate-float transition-transform duration-300 hover:scale-110 hover:rotate-12 cursor-help transform-style-3d">
          
          {/* Head Shape (CSS 3D Construction) */}
          <div className="w-full h-full bg-[#FFB673] rounded-3xl shadow-[inset_-5px_-5px_15px_rgba(0,0,0,0.1),10px_10px_20px_rgba(0,0,0,0.15)] border-4 border-white relative flex flex-col items-center justify-center gap-1">
              
              {/* Antenna */}
              <div className="absolute -top-6 w-2 h-6 bg-[#6A4FBF] rounded-full"></div>
              <div className="absolute -top-8 w-6 h-6 bg-[#2AB9A9] rounded-full border-2 border-white shadow-sm animate-pulse"></div>

              {/* Eyes Container */}
              <div className="flex gap-2">
                 {/* Left Eye */}
                 <div className="w-8 h-8 bg-white rounded-full shadow-inner flex items-center justify-center overflow-hidden">
                    <div 
                        className="w-4 h-4 bg-[#4A4A4A] rounded-full transition-transform duration-75"
                        style={{ transform: `translate(${eyePos.x}px, ${eyePos.y}px)` }}
                    >
                        <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-0.5 right-0.5 opacity-80"></div>
                    </div>
                 </div>
                 {/* Right Eye */}
                 <div className="w-8 h-8 bg-white rounded-full shadow-inner flex items-center justify-center overflow-hidden">
                    <div 
                        className="w-4 h-4 bg-[#4A4A4A] rounded-full transition-transform duration-75"
                        style={{ transform: `translate(${eyePos.x}px, ${eyePos.y}px)` }}
                    >
                         <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-0.5 right-0.5 opacity-80"></div>
                    </div>
                 </div>
              </div>

              {/* Mouth */}
              <div className="w-4 h-2 bg-[#4A4A4A] rounded-b-full opacity-50 mt-1 transition-all group-hover:h-3 group-hover:w-6"></div>
          </div>
          
          {/* Chat Bubble Tooltip */}
          <div className="absolute left-full bottom-full ml-2 mb-2 w-32 bg-white p-3 rounded-xl rounded-bl-none shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <p className="text-xs font-bold text-[#6A4FBF]">I'm AL-G! Click items to learn more!</p>
          </div>
       </div>
    </div>
  );
};

export default Mascot;
