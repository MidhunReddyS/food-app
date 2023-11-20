import Style from "./CartItems.module.css"
import { useContext, useState } from "react";
import CartContext from "../Storage/CartContext";

export default function CartItem(props){
    const ctx = useContext(CartContext);

    const [amount, setAmount] =useState(props.amount)

    function addHandler(){
        setAmount((previous) => previous + 1 ) ;
        ctx.addItem({
            name: props.name,
            price: props.price
        })
    }
    function subHandler(){
        setAmount((previous) => previous - 1 ) ;
            ctx.removeItem({
                name: props.name,
                price: props.price,
                amount: amount       
        })
    }
    return (
        <li className={Style['cart-item']}>
            <div>
                <h2>{props.name}</h2>
                <div className={Style.summary}>
                    <p className={Style.price}>${Math.round(props.price * props.amount)}</p>
                    <p className={Style.amount} >x {amount}</p>
                </div>
            </div>
            <div className={Style.actions}>
                <button onClick={addHandler}>+</button>
                <button onClick={subHandler}>-</button>
            </div>
        </li>
    );
}