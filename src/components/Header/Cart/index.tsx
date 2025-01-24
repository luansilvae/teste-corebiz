import React from "react";

import { formattedCurrency } from "../../../utils/formattedCurrency";
import { useCart } from "../../../hooks/useCart";

import styles from './cart.module.scss'

type Props = {
  openCart: boolean;
};

export const Cart: React.FC<Props> = ({ openCart }) => {
  const { cart, isCartEmpty, totalProducts, clearCart, handleRemoveFromCart } =
    useCart();

  return (
    <div
      className={`${styles.cartSection} ${openCart ? styles['cartSection--active'] : styles['cartSection--hidden']}`}>
      {isCartEmpty ? (
        <strong>Seu carrinho está vazio.</strong>
      ) : (
        <div className={styles.cartSection__content}>
          <ul className={styles.content__list}>
            {cart.map((cartProduct, index) => (
              <li key={index} className={styles.list__product}>
                <img src={cartProduct.imageUrl} alt={cartProduct.productName} loading="lazy" />
                <div className={styles.product__info}>
                  <h4>{cartProduct.productName}</h4>

                  <span>
                    Qtd. {cartProduct.amount}
                    <strong>
                      {formattedCurrency(
                        (cartProduct.amount * cartProduct.price) / 100
                      )}
                    </strong>
                  </span>
                </div>
                <button
                  className={styles.product__button}
                  onClick={() => handleRemoveFromCart(cartProduct.productId)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                  >
                    <path
                      id="_1828778"
                      data-name="1828778"
                      d="M8.283,7.136l5.451-5.451A.907.907,0,0,0,12.451.4L7,5.853,1.549.4A.907.907,0,0,0,.266,1.684L5.717,7.136.266,12.587A.907.907,0,1,0,1.549,13.87L7,8.418l5.451,5.451a.907.907,0,0,0,1.283-1.283l-1.2-1.2Zm0,0"
                      transform="translate(0 -0.136)"
                      fill="#999"
                    ></path>
                  </svg>
                </button>
              </li>
            ))}
          </ul>
          <div className={styles.content__submit}>
            <div className={styles.submitHeader}>
              <span>
                Subtotal: 
                <strong>{formattedCurrency(totalProducts / 100)}</strong>
              </span>

              <button onClick={clearCart}>Limpar carrinho</button>
            </div>

            <button>Finalizar compra</button>
          </div>
        </div>
      )}
    </div>
  );
};
