import { ReactNode } from "react"
import { Products } from "../../@types"

export interface CartProps {
  children: ReactNode
}

export interface CartContextData {
  handleAddToCart: (productId: number) => void
  handleRemoveFromCart: (productId: number) => void
  clearCart: () => void
  isCartEmpty: boolean
  cart: Products[]
  totalProducts: number
  amountProducts: number
}
