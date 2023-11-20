import Style from "./Forms.module.css";
import {  useContext } from "react";
import CartContext from "../Storage/CartContext";

export default function Forms(props) {
  const ctx = useContext(CartContext);

  function submitHandler(event) {
    event.preventDefault();
    const addItem = { amount: 1, name: props.name, price: props.price };
    ctx.addItem(addItem);
  }

  return (
    <form className={Style.form} onSubmit={submitHandler}>
      <div className={Style.input}>
        <label>Amount</label>
        <input
          type="number"
          min="0"
          max="5"
          step="1"
          onChange={submitHandler}
          value={ctx.items.findIndex((item) => {return (item.name === props.name)}) > -1 ? ctx.items[ctx.items.findIndex((item) => {return (item.name === props.name)})].amount : 0}
         
        ></input>
      </div>
      <button type="submit" >
        + Add
      </button>
    </form>
  );
}
