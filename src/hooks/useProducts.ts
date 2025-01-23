import { useCallback, useEffect, useState } from "react"
import { Products } from "../@types"
import axios from "axios"

interface useProductsProps {
  products: Products[]
  error: string | null
  isFetching: boolean
}

export function useProducts(): useProductsProps {
  const [products, setProducts] = useState<Products[]>([])
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAllProducts = useCallback(async () => {
    try {
      const response = await axios.get("https://corebiz-test-server.onrender.com/api/v1/products");
      setProducts(response.data);
    } catch (error: unknown) {
      setError((error as Error).message);
    } finally {
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  return { products, error, isFetching }
}
