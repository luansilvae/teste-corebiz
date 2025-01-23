import { createContext, useCallback, useMemo, useState } from "react"
import { useProducts } from "../../hooks/useProducts"
import { Products } from "../../@types"
import { CartContextData, CartProps } from "./types"

export const CartContext = createContext({} as CartContextData)

export function CartProvider({ children }: CartProps) {
  const { products } = useProducts()

  const [cart, setCart] = useState<Products[]>(() => {
    const storageValue = localStorage.getItem("cart")

    if (storageValue) {
      return JSON.parse(storageValue)
    } else {
      return [] as Products[]
    }
  })

  const handleAddToCart = useCallback(
    (productId: number) => {
      const productAdded = products.find(product => product.productId === productId)

      if (!productAdded) {
        console.error(`Product with ID ${productId} not found.`)
        return
      }
  
      setCart((prev: Products[]) => {
        const isProductInCart = prev.find(product => product.productId === productId)

        if (isProductInCart) {
          const additionalProduct = prev.map(product =>
            product.productId === productId
              ? { ...product, amount: product.amount + 1 }
              : product
          )

          localStorage.setItem("cart", JSON.stringify(additionalProduct))

          return additionalProduct
        } else {
          const newProductAdded = [...prev, { ...productAdded, amount: 1 }]

          localStorage.setItem("cart", JSON.stringify(newProductAdded))

          return newProductAdded
        }
      })
    },
    [products]
  )

  const handleRemoveFromCart = useCallback((productId: number) => {
    setCart((prev: Products[]) => {
      const cartRemovedProduct = prev.reduce((acc, product) => {
        if (product.productId === productId) {
          if (product.amount === 1) return acc
          return [...acc, { ...product, amount: product.amount - 1 }]
        } else {
          return [...acc, product]
        }
      }, [] as Products[])

      localStorage.setItem("cart", JSON.stringify(cartRemovedProduct))
      return cartRemovedProduct
    })
  }, [])

  const isCartEmpty = useMemo(() => cart.length === 0, [cart.length])

  const amountProducts = useMemo(
    () => cart.reduce((acc: number, product) => acc + product.amount, 0),
    [cart]
  )

  const totalProducts = useMemo(
    () =>
      cart.reduce(
        (acc: number, product) =>
          acc + product.amount * product.price,
        0
      ),
    [cart]
  )

  const clearCart = () => {
    localStorage.removeItem("cart")
    setCart([])
  }

  return (
    <CartContext.Provider
      value={{
        handleAddToCart,
        cart,
        handleRemoveFromCart,
        clearCart,
        isCartEmpty,
        amountProducts,
        totalProducts
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
