import CartItem from "./CartItems";
import Style from "./Cart.module.css";
import CartContext from "../Storage/CartContext";
import { useContext, useState } from "react";
import Modal from "../Body/Modal";
import SubumitForm from "./SubmitForm";

export default function Cart(props) {
  const ctx = useContext(CartContext);
  const [checkOut, setCheckOut] = useState(false);
  const order = ctx.items.length > 0;

  function orederHandler() {
    setCheckOut(true);
  }
  function cancleOrderHandler(){
    setCheckOut(false);
  }

  function cartCloseHandler(){
    props.onClose()
  }

  const cartAction = (
    <div className={Style.actions}>
      <button className={Style["button--alt"]} onClick={cartCloseHandler}>
        Close
      </button>
      {order && (
        <button className={Style.button} onClick={orederHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartSubmit = (
    <SubumitForm onCacelOrder ={cancleOrderHandler} onClose= {cartCloseHandler}/>
  );

  return (
    <Modal>
      <ul className={Style["cart-items"]}>
        {ctx.items.map((item) => {
          return (
            <CartItem
              name={item.name}
              price={item.price}
              amount={item.amount}
              key={item.name}
            />
          );
        })}
      </ul>

      <div>
        <div className={Style.total}>
          <p>Total Amount</p>
          <p>${Math.round(ctx.amount)}</p>
        </div>
        {!checkOut ? cartAction: cartSubmit}
      </div>
    </Modal>
  );
}
