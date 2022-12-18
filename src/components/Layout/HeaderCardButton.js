import { useContext, useEffect, useState } from "react";

import CartContext from "../../store/Cart-context";
import CartIcon from "../Card/CartIcon";
import classes from "./HeaderCardButton.module.css";

const HeaderCardButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;

  const numberOfCartItem = items.reduce((currentNum, item) => {
    return currentNum + item.amount;
  }, 0);

  const btnClasses = `${classes.button}  ${
    btnIsHighlighted ? classes.bump : ""
  }`;
  useEffect(() => {
    if (items.length === 0) {
      return;
    } else {
      setBtnIsHighlighted(true);

      const timer = setTimeout(() => setBtnIsHighlighted(false), 300);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [items]);
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItem}</span>
    </button>
  );
};

export default HeaderCardButton;
