import styles from "./header.module.scss";

import LogoCorebiz from "../../assets/logo.svg";
import { useCallback, useState } from "react";
import { useCart } from "../../hooks/useCart";
import { Cart } from "./Cart";

const Header: React.FC = () => {
  const [openCart, setOpenCart] = useState<boolean>(false)
  const { amountProducts } = useCart()
  const handleOpenCart = useCallback(() => setOpenCart(state => !state), [])

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.menuButton}>
          <button aria-label="Abrir menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="16"
              viewBox="0 0 23 16"
              fill="none"
            >
              <path
                id="Icon"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 15.0154H22.5V12.5128H0V15.0154ZM0 8.75904H22.5V6.25647H0V8.75904ZM0 0V2.50257H22.5V0H0Z"
                fill="black"
              />
            </svg>
          </button>
        </div>

        <div className={styles.logo}>
          <a href="/" aria-label="Corebiz">
            <img src={LogoCorebiz} alt="Corebiz" />
          </a>
        </div>

        <form className={styles.search} aria-label="Pesquisar">
          <input
            type="text"
            placeholder="O que está procurando?"
            aria-label="Digite o termo para buscar"
            className={styles.search__input}
          />
          <button
            type="submit"
            aria-label="Pesquisar"
            className={styles.search__submit}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <g clip-path="url(#clip0_106_23)">
                <path
                  d="M12.021 2.05969C9.27512 -0.686237 4.80593 -0.686237 2.06 2.05969C-0.685325 4.80621 -0.685325 9.27481 2.06 12.0213C4.50532 14.466 8.31378 14.728 11.0579 12.819C11.1157 13.0922 11.2478 13.3529 11.4603 13.5654L15.4593 17.5644C16.042 18.1459 16.9837 18.1459 17.5635 17.5644C18.1456 16.9822 18.1456 16.0405 17.5635 15.4601L13.5645 11.46C13.3532 11.2493 13.0919 11.1165 12.8187 11.0588C14.7289 8.31406 14.467 4.5062 12.021 2.05969ZM10.7585 10.7588C8.70844 12.8089 5.37202 12.8089 3.32254 10.7588C1.27367 8.70872 1.27367 5.37289 3.32254 3.32282C5.37202 1.27335 8.70844 1.27335 10.7585 3.32282C12.8086 5.37289 12.8086 8.70872 10.7585 10.7588Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_106_23">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </form>

        <nav aria-label="Menu de opções">
          <ul className={styles.header__actions}>
            <li>
              <a href="/login" className={styles.login} aria-label="Entrar">
                Minha conta
              </a>
            </li>

            <li>
              <button
                onClick={handleOpenCart}
                className={styles.minicartButton}
                aria-label="Abrir carrinho"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.8717 4.43517C17.7713 4.31982 17.6261 4.25391 17.4737 4.25391H4.10248L3.72191 1.32659C3.59573 0.557719 2.93912 0 2.16048 0H0.528351C0.23687 0 0.00100708 0.235863 0.00100708 0.527344C0.00100708 0.818824 0.23687 1.05469 0.528351 1.05469H2.16048C2.42004 1.05469 2.63889 1.24059 2.67854 1.48057L3.11473 4.83015C3.11627 4.84407 3.11782 4.85743 3.12039 4.87083L4.1035 12.3707C4.13014 12.5333 4.19279 12.6803 4.26409 12.8209C3.64689 13.0367 3.20019 13.6186 3.20019 14.3086C3.20019 15.181 3.90985 15.8836 4.78222 15.8836H5.4067C5.3476 16.0494 5.30957 16.2322 5.30957 16.418C5.30957 17.2903 6.01923 18 6.8916 18C7.76396 18 8.47363 17.2903 8.47363 16.418C8.47363 16.2322 8.43559 16.0494 8.37649 15.8836H11.77C11.7109 16.0494 11.6728 16.2322 11.6728 16.418C11.6728 17.2903 12.3825 18 13.2549 18C14.1272 18 14.8369 17.2903 14.8369 16.418C14.8369 16.2322 14.7989 16.0564 14.7398 15.8906H16.4189C16.7104 15.8906 16.9463 15.6548 16.9463 15.3633C16.9463 15.0718 16.7104 14.8359 16.4189 14.8359H4.78222C4.49127 14.8359 4.25488 14.5995 4.25488 14.3086C4.25488 14.0176 4.4913 13.7812 4.83014 13.7792L8.03431 13.4877L15.6552 12.7981C16.3721 12.7332 16.9551 12.192 17.0751 11.469L17.9958 4.85437C18.017 4.70296 17.9716 4.55052 17.8717 4.43517ZM5.71231 12.6395C5.43166 12.6704 5.18859 12.4716 5.14633 12.2162L4.51922 7.41797H6.40767L6.84322 12.5367L5.71231 12.6395ZM10.0908 12.2447L8.13131 12.4196H8.13117L8.10041 12.4225L7.89327 12.4413L7.46591 7.41797H10.0908V12.2447ZM13.2948 11.9535L11.1456 12.1489V7.41797H13.7291L13.2948 11.9535ZM16.0327 11.3093C15.9931 11.5457 15.7989 11.7259 15.56 11.7476L14.3635 11.8563L14.7884 7.41797H16.5724L16.0327 11.3093Z"
                    fill="black"
                  />
                </svg>

                <span
                  className={styles.minicartButton__amount}
                >
                  {amountProducts}
                </span>
              </button>

              <Cart openCart={openCart} />

            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
