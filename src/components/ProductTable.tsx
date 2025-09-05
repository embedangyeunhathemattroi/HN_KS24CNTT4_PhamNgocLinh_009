import React, { useState, useEffect }  from 'react'
import{Plus,Edit3,Trash2,Bookmark,BookmarkCheck} from 'lucide-react'
import {HN_KS24CNTT4_PhamNgocLinh_009} from 'HN_KS24CNTT4_PhamNgocLinh_009'

interface ProductTableProps{
    products:Product[];
    onToggleBookmark:(id:number) => void;
    onDeleteProduct:(id:number) => void;
}

const ProductTableProps :React.FC<ProductTableProps>=>({
  products,
   onToggleBookmark,
    onDeleteProduct,

    })=>{
}
export default function Producttable() {
return (
     <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              Danh sách từ vựng
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Từ Tiếng Anh</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Từ Tiếng Việt</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product.id} className={`border-b border-gray-100 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="px-6 py-4 text-sm text-gray-800">{product.EnglishVocabulary}</td>
                    <td className="px-6 py-4 text-sm text-blue-600 font-medium">{product.VietnameseVocabulary}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onToggleBookmark(product.id)}
                          className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                            product.isBookmarked
                              ? 'bg-blue-800 text-blue-700 border-blue-300 hover:bg-blue-200'
                              : 'bg-gray-800 text-gray-600 border-gray-300 hover:bg-gray-300'
                          }`}
                        >Sửa
                          {product.isBookmarked ? (
                            <BookmarkCheck className="w-3 h-3" />
                          ) : (
                            <Bookmark className="w-3 h-3" />
                          )}
                        </button>
                        <button
                          onClick={() => onDeleteProduct(product.id)}
                          className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-700 border border-red-300 hover:bg-red-200 transition-colors"
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
)

}