"use client";

import React, { useState, useEffect } from "react";
import Footer from "@/src/components/global/Footer";
import Navbar from "@/src/components/global/Navbar";
import { useCart } from "@/src/contexts/CartContext";
import { useIsMobile } from "@/hooks/use-mobile";
import CatalogPageSkeleton from "@/src/components/skeletons/CatalogPageSkeleton";
import { toast } from "sonner";
import CatalogHeader from "@/src/components/product/CatalogHeader";
import HeroSlider from "@/src/components/product/HeroSlider";
import FiltersSidebar from "@/src/components/product/FiltersSidebar";
import MobileFilterBar from "@/src/components/product/MobileFilterBar";
import ProductGrid from "@/src/components/product/ProductGrid";
import PaginationControls from "@/src/components/product/PaginationControls";
import { ProductService } from "@/services/product.service";
import type { Product } from "@/src/types/product";

const paperTypes = ["Blunt", "Hemp", "Natural", "Organic", "Rice"];
const packagingOptions = ["Tube", "Box", "Wrapped Bundle", "Custom"];

const heroSlides = [
  { src: "/bluetshirt.png", label: "Natural Hemp Cones" },
  { src: "/whitetshirt.png", label: "Precision Size Options" },
  { src: "/brochureimages/u9.jpeg", label: "Production-Ready Inventory" },
  { src: "/brochureimages/u15.jpeg", label: "Natural Hemp Cones" },
  { src: "/brochureimages/u12.jpeg", label: "Precision Size Options" },
  { src: "/brochureimages/u11.jpeg", label: "Precision Size Options" },
];

export default function ProductPage() {
  const { addItem } = useCart();
  const isMobile = useIsMobile();

  // Products state
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [selectedPaperTypes, setSelectedPaperTypes] = useState<string[]>(["Blunt", "Hemp", "Natural", "Organic", "Rice"]);
  const [selectedPackaging, setSelectedPackaging] = useState<string[]>(["Tube"]);
  const [sizeRange, setSizeRange] = useState<[number, number]>([0, 500]);
  const [lotSize, setLotSize] = useState<[number, number]>([1000, 5000]);
  const [sortBy, setSortBy] = useState("featured");

  // Hero slider state
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Fetch products from backend
  useEffect(() => {
    ProductService.getAll()
      .then((data) => {
        console.log("Products API response:", data);
        setProducts(data);
      })
      .catch((err) => {
        console.error("Products API error:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  // Collapsible filter states
  const [paperTypeOpen, setPaperTypeOpen] = useState(false);
  const [sizeRangeOpen, setSizeRangeOpen] = useState(false);
  const [lotSizeOpen, setLotSizeOpen] = useState(false);
  const [packagingOpen, setPackagingOpen] = useState(false);

  const handlePaperTypeToggle = (type: string) => {
    setSelectedPaperTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const handlePackagingToggle = (option: string) => {
    setSelectedPackaging((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  // Auto-advance hero slider on desktop
  useEffect(() => {
    if (isMobile) return;

    const interval = setInterval(() => {
      setActiveSlide((prev) => {
        // Advance to next slide, including the duplicate first slide
        return prev + 1;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [isMobile]);

  // Handle seamless loop reset when we reach the duplicate first slide
  useEffect(() => {
    if (isMobile) return;
    
    // When we reach the duplicate first slide (index = heroSlides.length)
    if (activeSlide === heroSlides.length) {
      // Wait for the transition to complete, then reset to 0 without animation
      const resetTimeout = setTimeout(() => {
        setIsTransitioning(true);
        setActiveSlide(0);
        // Re-enable transitions after a brief moment
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, 700); // Wait for transition duration (700ms)

      return () => clearTimeout(resetTimeout);
    }
  }, [activeSlide, heroSlides.length, isMobile]);


  const handleAddToCart = (product: Product) => {
    addItem({
      productId: product.productId,
      name: product.name,
      categoryName: product.categoryName,
      quantity: 1, // Add 1 item at a time
      price: product.price,
      imageUrl: product.imageUrl.toString(),
      size: product.size
    });

    toast.success("Added to cart", {
      description: `${product.name}`,
    });
  };

  // Helper function to extract numeric size from string (e.g., "100mm" -> 100)
  const parseSize = (sizeString: string): number => {
    if (!sizeString) return 0;
    // Extract numbers from the string (handles formats like "100mm", "140mm", etc.)
    const match = sizeString.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  };

  // Calculate dynamic size range from products
  const sizeRangeBounds = React.useMemo(() => {
    if (products.length === 0) return { min: 0, max: 500 };
    
    const sizes = products
      .map((p) => parseSize(p.size))
      .filter((size) => size > 0);
    
    if (sizes.length === 0) return { min: 0, max: 500 };
    
    const minSize = Math.min(...sizes);
    const maxSize = Math.max(...sizes);
    // Add some padding (10%) for better UX
    const padding = Math.max(10, (maxSize - minSize) * 0.1);
    return {
      min: Math.max(0, Math.floor(minSize - padding)),
      max: Math.ceil(maxSize + padding),
    };
  }, [products]);

  // Initialize size range when products are loaded (only if still at default)
  useEffect(() => {
    if (products.length > 0 && sizeRange[0] === 0 && sizeRange[1] === 500 && sizeRangeBounds.min !== 0 && sizeRangeBounds.max !== 500) {
      setSizeRange([sizeRangeBounds.min, sizeRangeBounds.max]);
    }
  }, [products, sizeRangeBounds, sizeRange]);

  const clearFilters = () => {
    setSelectedPaperTypes([]);
    setSelectedPackaging([]);
    // Reset to dynamic range bounds
    setSizeRange([sizeRangeBounds.min, sizeRangeBounds.max]);
    setLotSize([1000, 5000]);
  };

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    // Paper type filter
    if (
      selectedPaperTypes.length > 0 &&
      !selectedPaperTypes.includes(product.categoryName)
    ) {
      return false;
    }

    // Size range filter
    const productSize = parseSize(product.size);
    if (productSize > 0) {
      if (productSize < sizeRange[0] || productSize > sizeRange[1]) {
        return false;
      }
    }

    // Add more filter logic as needed
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      case "featured":
      default:
        return 0; // Keep original order
    }
  });

  // Calculate pagination
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPaperTypes, selectedPackaging, sortBy, sizeRange]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isMobile === null) return <CatalogPageSkeleton />;

  return (
    <div className="min-h-screen h-screen overflow-y-scroll scrollbar-hide">
      <Navbar />
      <main className="pt-3 pb-20">
        {/* Header Section */}
        <div className="max-w-400 mx-auto px-0 md:px-6 mb-12">
          <CatalogHeader />

          {/* Full-width hero image slider (one image at a time, reduced height) */}
          <HeroSlider
            slides={heroSlides}
            activeSlide={activeSlide}
            isTransitioning={isTransitioning}
            isMobile={isMobile}
          />
        </div>

        {/* Main Content */}
        <div className="max-w-400 mx-auto px-4 md:px-6 flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          {!isMobile && (
            <FiltersSidebar
              paperTypes={paperTypes}
              packagingOptions={packagingOptions}
              selectedPaperTypes={selectedPaperTypes}
              selectedPackaging={selectedPackaging}
              sizeRange={sizeRange}
              sizeRangeMin={sizeRangeBounds.min}
              sizeRangeMax={sizeRangeBounds.max}
              lotSize={lotSize}
              paperTypeOpen={paperTypeOpen}
              sizeRangeOpen={sizeRangeOpen}
              lotSizeOpen={lotSizeOpen}
              packagingOpen={packagingOpen}
              onPaperTypeToggle={handlePaperTypeToggle}
              onPackagingToggle={handlePackagingToggle}
              onSizeRangeChange={setSizeRange}
              onLotSizeChange={setLotSize}
              setPaperTypeOpen={setPaperTypeOpen}
              setSizeRangeOpen={setSizeRangeOpen}
              setLotSizeOpen={setLotSizeOpen}
              setPackagingOpen={setPackagingOpen}
              onClearFilters={clearFilters}
            />
          )}

          {/* Product Grid */}
          <div className="w-full lg:w-4/5">
            {/* Mobile Horizontal Filter Bar */}
            {isMobile && (
              <MobileFilterBar
                paperTypes={paperTypes}
                packagingOptions={packagingOptions}
                selectedPaperTypes={selectedPaperTypes}
                selectedPackaging={selectedPackaging}
                sizeRange={sizeRange}
                lotSize={lotSize}
                onPaperTypeToggle={handlePaperTypeToggle}
                onPackagingToggle={handlePackagingToggle}
                onClearFilters={clearFilters}
              />
            )}

            <ProductGrid
              products={paginatedProducts}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onAddToCart={handleAddToCart}
              loading={loading}
              error={error}
            />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
