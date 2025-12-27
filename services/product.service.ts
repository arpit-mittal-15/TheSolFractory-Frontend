import { http } from "@/services/http"; // adjust path if needed
import type { Product } from "@/src/types/product";

interface ProductsResponse {
  result: Product[];
  isSuccess: boolean;
  message: string;
}

export const ProductService = {
  async getAll(): Promise<Product[]> {
    const res = await http<ProductsResponse>("/api/product");
    return res.result;
  },
};
