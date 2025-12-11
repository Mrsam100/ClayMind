/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

const Community: React.FC = () => {
  return (
    <section className="py-20 px-6 md:px-12 max-w-[1600px] mx-auto min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#4A4A4A] mb-4">Parent Network</h1>
        <p className="text-lg text-gray-500">Connect with other parents and educators ensuring a safe digital future.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {['Webinar', 'Forums', 'Guides'].map((platform) => (
              <div key={platform} className="clay-card p-6 flex items-center justify-between hover:scale-105 transition-transform cursor-pointer">
                  <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#6A4FBF] flex items-center justify-center text-white font-bold">
                          {platform[0]}
                      </div>
                      <span className="font-bold text-lg text-[#4A4A4A]">{platform}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-400">
                      ↗
                  </div>
              </div>
          ))}
      </div>

      <div className="clay-card p-8 bg-[#fff]">
          <h3 className="text-2xl font-bold text-[#4A4A4A] mb-6 border-b border-gray-100 pb-4">Latest Discussions</h3>
          <div className="space-y-6">
              {[1,2,3].map(i => (
                  <div key={i} className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0"></div>
                      <div>
                          <h4 className="font-bold text-[#4A4A4A] text-sm">How much screen time is safe?</h4>
                          <p className="text-xs text-gray-500 mt-1">Posted by @Parent{i} • 2h ago</p>
                      </div>
                  </div>
              ))}
          </div>
          <button className="w-full mt-8 py-3 rounded-xl bg-[#F8E9DD] text-[#6A4FBF] font-bold text-sm hover:bg-[#ebdccf] transition-colors">View All Topics</button>
      </div>
    </section>
  );
};

export default Community;