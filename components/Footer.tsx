/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { BRAND_NAME } from '../constants';

interface FooterProps {
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onLinkClick }) => {
  return (
    <footer className="pt-20 pb-10 px-6 md:px-12 mt-12 bg-[#F8E9DD] border-t border-white/50 relative overflow-hidden">
        {/* Background blobs for footer */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#FFB673] rounded-full mix-blend-multiply filter blur-[80px] opacity-20"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#6A4FBF] rounded-full mix-blend-multiply filter blur-[80px] opacity-10"></div>
            
            {/* Floating 3D Orb - Animated */}
            <div className="absolute top-10 right-10 w-32 h-32 shape-sphere opacity-40 animate-float-delayed z-0 shadow-[0_20px_40px_rgba(0,0,0,0.1)]"></div>
        </div>

        <div className="max-w-[1800px] mx-auto relative z-10 w-full">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                
                {/* Brand Column */}
                <div className="col-span-1 md:col-span-1">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-10 h-10 rounded-full bg-[#FFB673] flex items-center justify-center text-white font-bold text-sm shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.1),2px_2px_4px_rgba(255,255,255,0.4)] border border-white/30">C</div>
                        <span className="font-bold text-xl text-[#6A4FBF]">{BRAND_NAME}</span>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed mb-6">
                        Empowering the next generation with AI literacy and digital safety skills.
                    </p>
                    <div className="flex gap-3">
                        {['tw', 'fb', 'in'].map(social => (
                            <button key={social} className="clay-icon-btn w-10 h-10 hover:scale-110">
                                <span className="text-xs font-bold uppercase">{social}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Links */}
                <div>
                    <h4 className="font-bold text-[#4A4A4A] mb-6 ml-1">Learn</h4>
                    <div className="flex flex-col gap-3 items-start">
                        <button onClick={(e) => onLinkClick(e, 'Market')} className="clay-chip-link cursor-pointer">Modules</button>
                        <button onClick={(e) => onLinkClick(e, 'Exchange')} className="clay-chip-link cursor-pointer">AI Simulator</button>
                        <button onClick={(e) => onLinkClick(e, 'Earn')} className="clay-chip-link cursor-pointer">Leaderboard</button>
                        <button onClick={(e) => onLinkClick(e, 'Wallet')} className="clay-chip-link cursor-pointer">Student Profile</button>
                        <button onClick={(e) => onLinkClick(e, 'about')} className="clay-chip-link cursor-pointer">Our Mission</button>
                    </div>
                </div>

                <div>
                    <h4 className="font-bold text-[#4A4A4A] mb-6 ml-1">Resources</h4>
                    <div className="flex flex-col gap-3 items-start">
                        <button onClick={(e) => onLinkClick(e, 'help')} className="clay-chip-link cursor-pointer">Educator Guide</button>
                        <button onClick={(e) => onLinkClick(e, 'api')} className="clay-chip-link cursor-pointer">Parent Safety</button>
                        <button onClick={(e) => onLinkClick(e, 'fees')} className="clay-chip-link cursor-pointer">School Pricing</button>
                        <button onClick={(e) => onLinkClick(e, 'security')} className="clay-chip-link cursor-pointer">Data Privacy</button>
                    </div>
                </div>

                {/* Newsletter */}
                <div>
                    <h4 className="font-bold text-[#4A4A4A] mb-6">Stay Updated</h4>
                    <div className="clay-card p-2 bg-[#F8E9DD] flex clay-bevel">
                        <input type="email" placeholder="Parent/Teacher Email" className="bg-transparent w-full px-3 py-2 text-sm outline-none text-[#4A4A4A] placeholder-gray-400" />
                        <button className="clay-icon-btn w-8 h-8 bg-[#6A4FBF] text-white hover:bg-[#583eb5]">
                            →
                        </button>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-200/50 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
                <p>&copy; 2025 ClayMind Inc. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <button onClick={(e) => onLinkClick(e, 'privacy')} className="hover:text-[#6A4FBF]">Children's Privacy</button>
                    <button onClick={(e) => onLinkClick(e, 'terms')} className="hover:text-[#6A4FBF]">Terms of Service</button>
                </div>
            </div>
        </div>
    </footer>
  );
};

export default Footer;