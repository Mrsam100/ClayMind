
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { Paper } from '../types';
import { getPublisherInfo } from '../constants';

interface ProductCardProps {
  product: Paper;
  onClick: (paper: Paper) => void;
  onUpvote: (id: string) => void;
  isUpvoted: boolean;
  onPublisherClick?: (publisher: string) => void;
  onToggleSave?: (paper: Paper) => void;
  isSaved?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onClick, 
  onToggleSave,
  isSaved 
}) => {
  const publisherInfo = getPublisherInfo(product.publisher);

  return (
    <div 
        className="pop-card group cursor-pointer flex flex-col h-full bg-white hover:border-[#6A4FBF]" 
        onClick={() => onClick(product)}
    >
      {/* Image Area */}
      <div className="h-48 w-full relative bg-gray-100 overflow-hidden">
         {product.fileUrl ? (
             <img src={product.fileUrl} alt={product.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
         ) : (
             <div className="w-full h-full flex items-center justify-center bg-[#F0F0F0] text-4xl">
                {publisherInfo.logo}
             </div>
         )}
         
         <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-[#1F1F1F] shadow-sm">
             {product.category}
         </div>

         <button 
            onClick={(e) => { e.stopPropagation(); onToggleSave && onToggleSave(product); }}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-md transition-colors ${isSaved ? 'text-red-500' : 'text-gray-400 hover:text-[#6A4FBF]'}`}
         >
             <svg xmlns="http://www.w3.org/2000/svg" fill={isSaved ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
             </svg>
         </button>
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-1">
         <div className="flex items-center gap-2 mb-3">
             <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs">{publisherInfo.logo}</span>
             <span className="text-xs font-bold text-gray-500 uppercase">{product.publisher}</span>
         </div>
         
         <h3 className="font-bold text-xl text-[#1F1F1F] mb-2 leading-tight group-hover:text-[#6A4FBF] transition-colors">{product.title}</h3>
         
         <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">{product.abstractPreview}</p>
         
         {/* Footer */}
         <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
             <div className="flex items-center gap-1 text-sm font-bold text-[#FF9F1C]">
                 <span>★</span> {product.upvotes} XP
             </div>
             <span className="text-xs font-bold bg-[#F5F5F5] px-2 py-1 rounded text-gray-500">{product.readTime}</span>
         </div>
      </div>
    </div>
  );
}

export default ProductCard;
