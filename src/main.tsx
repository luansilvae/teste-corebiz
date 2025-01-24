import { render } from "react-dom";
import App from "./App";
import { Footer } from "./components/Footer";
import { CartProvider } from "./contexts/CartContext";

import "./styles/global.scss";

render(
  <CartProvider>
    <App />
    <Footer />
  </CartProvider>,
  document.getElementById("root")
);
