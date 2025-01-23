import React from "react";
import { Navigation, Pagination} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useProducts } from "../../hooks/useProducts";
import { formattedCurrency } from "../../utils/formattedCurrency";

import "swiper/scss";
import "swiper/scss/navigation";
import styles from "./product-shelf.module.scss";
import { useCart } from "../../hooks/useCart";

export const ProductShelf: React.FC = () => {
  const { products, isFetching } = useProducts();
  const { handleAddToCart } = useCart()
  const totalStars = 5;

  return (
    <section className={styles.shelf}>
      <h1 className={styles.shelf__title}>Mais Vendidos</h1>
      <Swiper
        className={`${styles.shelf__slider} shelf`}
        modules={[Navigation, Pagination]}
        navigation
        slidesPerView={2}
        slidesPerGroup={1}
        spaceBetween={16}
        preventClicks={true}
        preventClicksPropagation={true}
        preventInteractionOnTransition={true}
        loopPreventsSlide={true}
        grabCursor={false}
        loop
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 22
          },
          980: {
            slidesPerView: 3,
            spaceBetween: 22
          },
          1300: {
            slidesPerView: 4,
            spaceBetween: 99
          },
        }}
      >
        {isFetching ? (
          <h2>carregando</h2>
        ) : (
          products &&
          products.map((product) => (
            <SwiperSlide key={product.productId}>
              <article className={styles.shelf__item}>
                <img
                  src={product.imageUrl}
                  alt={product.productName}
                  className={styles.shelf__image}
                />

                <h3 className={styles.shelf__productName}>
                  {product.productName}
                </h3>

                <div className={styles.shelf__productReviews}>
                  <div style={{ display: "flex", gap: "2px" }}>
                    {Array.from({ length: totalStars }, (_, index) =>
                      index < product.stars ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="11"
                          viewBox="0 0 12 11"
                          fill="none"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M5.69478 8.68583L9.21415 10.649L8.28021 6.94899L11.3896 4.45951L7.29501 4.13846L5.69478 0.648987L4.09454 4.13846L0 4.45951L3.10935 6.94899L2.17541 10.649L5.69478 8.68583Z"
                            fill="#F8475F"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="11"
                          viewBox="0 0 12 11"
                          fill="none"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M11.3896 4.4595L7.29501 4.13318L5.69478 0.648972L4.09454 4.13845L0 4.4595L3.10935 6.94897L2.17541 10.649L5.69478 8.68581L9.21415 10.649L8.2859 6.94897L11.3896 4.4595ZM5.69477 7.70161L3.55353 8.89634L4.12301 6.64371L2.23234 5.12792L4.72666 4.92792L5.69477 2.80687L6.66857 4.93319L9.16289 5.13319L7.27222 6.64897L7.8417 8.90161L5.69477 7.70161Z"
                            fill="#F8475F"
                          />
                        </svg>
                      )
                    )}
                  </div>
                </div>

                <div className={styles.shelf__listPrice}>
                  {product.listPrice ? (
                    <span className={styles.shelf__listPriceValue}>
                      de {formattedCurrency(product.listPrice / 100)}
                    </span>
                  ) : (
                    ""
                  )}
                </div>

                <div className={styles.shelf__sellingPrice}>
                  <span className={styles.shelf__sellingPriceValue}>
                    por {formattedCurrency(product.price / 100)}
                  </span>
                </div>
                <div className={styles.shelf__installments}>
                  {product.installments.length ? (
                    <span className={styles.shelf__installmentsValue}>
                      ou em {product.installments[0].quantity}x de {formattedCurrency(product.installments[0].value / 100)}
                    </span>
                  ) : (
                    ""
                  )}
                </div>

                <button className={styles.shelf__buttonBuy} onClick={() => {
                  handleAddToCart(product.productId)
                }}>Comprar</button>
              </article>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </section>
  );
};
