"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { Product } from "@/src/types/product";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProductGridProps {
  products: Product[];
  sortBy: string;
  onSortChange: (value: string) => void;
  onAddToCart: (product: Product) => void;
  loading?: boolean;
  error?: string | null;
}

export default function ProductGrid({
  products,
  sortBy,
  onSortChange,
  onAddToCart,
  loading = false,
  error = null,
}: ProductGridProps) {


  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-4 border-gray-700 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-red-400">Error: {error}</div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-11 mt-1">
        <h2 className="text-2xl md:text-3xl font-serif" style={{ textShadow: "0 0 2px rgba(255,255,255,0.6)" }}>Products</h2>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-45 btn-glass-panel rounded-xl bg-blue-100 border-white/10 text-white px-3 py-2 h-10">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="btn-glass-panel border-white/10 text-white">
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="name">Name A-Z</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => {
          return (
            <div
              key={product.productId}
              className="glass-panel rounded-xl overflow-hidden group hover:-translate-y-2 transition-all duration-300"
            >
              <div className="aspect-5/5 not-md:aspect-4/3 bg-white/5 p-6 flex items-center justify-center relative overflow-hidden">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={200}
                  height={250}
                  className="object-contain rounded-xl drop-shadow-2xl group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t flex justify-center from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end p-6">
                  <Button
                    onClick={() => onAddToCart(product)}
                    className="w-25 btn-liquid active btn-primary py-3 text-[10px] font-bold uppercase tracking-widest"
                  >
                    Add
                  </Button>
                </div>
              </div>
              <div className="p-5 border-t border-white/5">
                <h3 className="text-sm font-bold truncate">
                  {product.name}
                </h3>
                <p className="text-[10px] text-gray-400 mt-1 mb-2">
                  {product.categoryName}
                </p>
                <p className="text-[10px] text-gray-400 mt-1 mb-2">
                  {product.size}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-light">
                    ${product.price}
                  </span>
                  <span className="text-[9px] text-gray-500">MOQ 1k</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

