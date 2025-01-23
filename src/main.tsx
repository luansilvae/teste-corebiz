import { render } from "react-dom";
import App from "./App";
import { CartProvider } from "./contexts/CartContext";

import "./styles/global.scss";

render(
  <CartProvider>
    <App />
  </CartProvider>,
  document.getElementById("root")
);
