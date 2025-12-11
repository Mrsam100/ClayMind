
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useMemo } from 'react';
import { Paper } from '../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  papers: Paper[];
  onProductClick: (paper: Paper) => void;
  onUpvote: (id: string) => void;
  userUpvotes: string[];
  onPublisherClick: (publisher: string) => void;
  onToggleSave: (paper: Paper) => void;
  savedPaperIds: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  hideFilters?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  papers, 
  onProductClick, 
  onUpvote, 
  userUpvotes, 
  onPublisherClick,
  onToggleSave,
  savedPaperIds,
  hideFilters = false
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredPapers = useMemo(() => {
    let result = papers;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.publisher.toLowerCase().includes(q)
      );
    }
    return result;
  }, [searchQuery, papers]);

  return (
    <section className="mb-20">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-3xl font-extrabold text-[#1F1F1F]">Explore Modules</h2>
          
          {!hideFilters && (
            <div className="relative w-full md:w-80">
                <input 
                    type="text" 
                    placeholder="Search topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-[#E5E5E5] rounded-xl px-4 py-3 pl-10 text-[#1F1F1F] outline-none focus:border-[#FF9F1C] focus:ring-2 focus:ring-[#FF9F1C]/20 transition-all"
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#999" className="w-5 h-5 absolute left-3 top-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
            </div>
          )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPapers.map(paper => (
            <ProductCard 
                key={paper.id}
                product={paper} 
                onClick={onProductClick}
                onUpvote={onUpvote}
                isUpvoted={userUpvotes.includes(paper.id)}
                onPublisherClick={onPublisherClick}
                onToggleSave={onToggleSave}
                isSaved={savedPaperIds.includes(paper.id)}
            />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
