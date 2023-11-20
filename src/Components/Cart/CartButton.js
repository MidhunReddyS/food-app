import Style from "./CartButton.module.css"
import CartIcon from "./CartIcon";
import CartContext from "../Storage/CartContext";
import { useContext, useEffect, useState } from "react";

export default function CartButton(props){
    const ctx = useContext(CartContext)
    const [bump, setBump] = useState(false)
    useEffect(() => {
        if(ctx.items.length === 0){
            return
        }
        setBump(true);

        const timer = setTimeout(() => {setBump(false);},300);

        return () => {clearTimeout(timer);}

    }, [ctx.items])
    const incart = ctx.items.reduce((curNumber,item) => {return curNumber + item.amount}, 0);
    return (
        <div className={bump ? Style.bump:""}>
        <button className={Style.button} onClick={props.onClick}>
            <CartIcon className={Style.icon}/>
            <p >Your Cart</p>
            <p className={Style.badge}>{incart}</p>
        </button>
        </div>
    );
}