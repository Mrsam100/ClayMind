
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { BRAND_NAME } from '../constants';

interface NavbarProps {
  onNavClick: (targetId: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  activeCategory: string;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavClick, activeCategory, cartCount, onOpenCart, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'Market', label: 'Explore', icon: '🚀' },
    { id: 'Exchange', label: 'Simulator', icon: '⚡' },
    { id: 'Earn', label: 'Leaderboard', icon: '🏆' },
    { id: 'Learn', label: 'School', icon: '🎓' },
    { id: 'Community', label: 'Community', icon: '🌍' },
  ];

  return (
    <>
      {/* DESKTOP SIDEBAR - Fixed width, Flex-shrink 0 to prevent collapse */}
      <aside className="hidden md:flex flex-col w-[280px] min-w-[280px] h-full bg-white border-r border-[#E5E5E5] p-6 z-50 shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
         {/* Brand */}
         <div className="flex items-center gap-3 mb-10 cursor-pointer group" onClick={() => onNavClick('Market')}>
             <div className="w-10 h-10 rounded-xl bg-[#FF9F1C] flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-orange-200 group-hover:scale-110 transition-transform">
                C
             </div>
             <span className="font-extrabold text-2xl tracking-tight text-[#1F1F1F]">{BRAND_NAME}</span>
         </div>

         {/* Navigation */}
         <div className="flex-1 flex flex-col gap-2 overflow-y-auto no-scrollbar">
             <span className="text-xs font-bold text-gray-400 uppercase tracking-widest px-4 mb-2">Menu</span>
             {navLinks.map(link => (
                 <button 
                    key={link.id}
                    onClick={() => onNavClick(link.id)}
                    className={`sidebar-link ${activeCategory === link.id ? 'active' : ''}`}
                 >
                     <span className="text-xl w-8 text-center">{link.icon}</span>
                     <span>{link.label}</span>
                 </button>
             ))}
         </div>

         {/* User Profile / Wallet */}
         <div className="mt-auto pt-6 border-t border-gray-100">
             <div className="bg-[#FFF8F0] p-4 rounded-2xl border border-[#F0E6D8] mb-4">
                 <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-gray-500">MY XP</span>
                    <span className="text-xs font-bold text-[#2EC4B6]">+120 This Week</span>
                 </div>
                 <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                     <div className="bg-[#FF9F1C] w-[70%] h-full rounded-full"></div>
                 </div>
                 <div className="mt-2 text-right font-bold text-sm text-[#1F1F1F]">Level 12</div>
             </div>

             <div className="flex flex-col gap-2">
                <button 
                    onClick={onOpenCart}
                    className="w-full py-3 rounded-xl border-2 border-[#1F1F1F] font-bold text-[#1F1F1F] hover:bg-[#1F1F1F] hover:text-white transition-colors flex justify-between px-4 items-center"
                >
                    <span>My Favorites</span>
                    {cartCount > 0 && <span className="bg-[#FF9F1C] text-white text-xs px-2 py-0.5 rounded-full">{cartCount}</span>}
                </button>

                <button 
                    onClick={onLogout}
                    className="w-full py-3 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 font-bold text-sm transition-colors"
                >
                    Sign Out
                </button>
             </div>
         </div>
      </aside>

      {/* MOBILE HEADER */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-[#E5E5E5] z-[90] flex items-center justify-between px-4 shadow-sm">
          <div className="flex items-center gap-2" onClick={() => onNavClick('Market')}>
              <div className="w-8 h-8 rounded-lg bg-[#FF9F1C] flex items-center justify-center text-white font-bold">C</div>
              <span className="font-bold text-lg">{BRAND_NAME}</span>
          </div>
          <div className="flex gap-4">
            <button onClick={onOpenCart} className="relative p-2">
                <span className="text-xl">❤️</span>
                {cartCount > 0 && <span className="absolute top-0 right-0 w-4 h-4 bg-[#FF9F1C] rounded-full text-[10px] text-white flex items-center justify-center border border-white">{cartCount}</span>}
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>
          </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-white z-[100] pt-20 px-6 flex flex-col gap-4 animate-fade-in md:hidden">
              <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="mb-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl">🎓</div>
                    <div>
                        <div className="font-bold text-lg">Student</div>
                        <div className="text-xs text-gray-500">Level 12 • 4,500 XP</div>
                    </div>
                  </div>
              </div>

              {navLinks.map(link => (
                 <button 
                    key={link.id}
                    onClick={() => { onNavClick(link.id); setIsMobileMenuOpen(false); }}
                    className="p-4 bg-[#FFF8F0] rounded-xl text-left font-bold text-lg text-[#1F1F1F] flex gap-3 active:scale-95 transition-transform"
                 >
                    <span>{link.icon}</span> {link.label}
                 </button>
              ))}
              
              <button 
                onClick={() => { onLogout(); setIsMobileMenuOpen(false); }}
                className="mt-auto mb-8 p-4 bg-red-50 text-red-500 rounded-xl font-bold text-center"
              >
                  Log Out
              </button>
          </div>
      )}
    </>
  );
};

export default Navbar;
