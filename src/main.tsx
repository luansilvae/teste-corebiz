import { render } from "react-dom";
import App from "./App";
import { Footer } from "./components/Footer";
import { CartProvider } from "./contexts/CartContext";

import { ToastContainer, Bounce } from "react-toastify"


import "react-toastify/dist/ReactToastify.css"
import "./styles/global.scss";

render(
  <CartProvider>
    <App />
    <Footer />

    <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
  </CartProvider>,
  document.getElementById("root")
);
