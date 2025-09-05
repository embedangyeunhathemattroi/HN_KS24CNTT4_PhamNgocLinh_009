import React, { useState, useEffect }  from 'react'
import{Plus,Edit3,Trash2,Bookmark,BookmarkCheck} from 'lucide-react'
import {HN_KS24CNTT4_PhamNgocLinh_009} from 'HN_KS24CNTT4_PhamNgocLinh_009'

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
}

const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  itemsPerPage, 
  totalItems 
}) => {
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`px-3 py-1 text-sm rounded ${
            i === currentPage
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {i}
        </button>
      );
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-gray-200">
      <div className="text-sm text-gray-600">
        Hiển thị {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}-{Math.min(currentPage * itemsPerPage, totalItems)} của {totalItems} sản phẩm
      </div>
      
      <div className="flex items-center gap-1">
        <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
          ‹
        </button>
        {renderPageNumbers()}
        <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
          ›
        </button>
        <span className="text-sm text-gray-600 ml-2">
          / {totalPages} trang
        </span>
      </div>
    </div>
  );
};


const ProductManagement:React.FC=()=>{
    const[products,setProducts]=useState<Product[]>([
        {id:1,EnglishVocabulary:'Appple',VietnameseVocabulary:'quả táo',isBookmarked:flase},
         {id:2,EnglishVocabulary:'Book',VietnameseVocabulary:'',isBookmarked:flase},
          {id:,EnglishVocabulary:'Computer',VietnameseVocabulary:'máy tính',isBookmarked:flase},
    ])
}