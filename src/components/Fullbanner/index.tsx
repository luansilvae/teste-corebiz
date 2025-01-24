import React from "react";
import { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import styles from "./fullbanner.module.scss";

import "swiper/scss";
import "swiper/scss/pagination";

export const Fullbanner: React.FC = () => {
  const bannerImages = [
    {
      desktop: "/banner-desk-1.png",
      mobile: "/banner-mobile-1.png",
    },
    {
      desktop: "/banner-desk-2.png",
      mobile: "/banner-mobile-2.png",
    },
    {
      desktop: "/banner-desk-3.png",
      mobile: "/banner-mobile-3.png",
    },
  ];

  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      grabCursor={true}
      loop={true}
      slidesPerGroup={1}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
    >
      {bannerImages.map((banner) => {
        return (
          <SwiperSlide>
            <div className={styles.slider}>
              <img
                loading="lazy"
                src={banner.desktop}
                className={`${styles["slider__image--desktop"]}`}
                alt="Carousel image"
              />
              <img
                loading="lazy"
                src={banner.mobile}
                className={`${styles["slider__image--mobile"]}`}
                alt="Carousel image"
              />
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
