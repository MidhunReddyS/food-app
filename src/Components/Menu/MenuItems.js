import Forms from "./Forms";
import Style from "./MenuItem.module.css"

export default function MenuItems(props){ 
    return (
        <li className={Style.meal}>
            <div >
                <h3>{props.dish}</h3>
                <p className={Style.description}>{props.discription}</p> 
                <p className={Style.price}>${props.price}</p>
            </div>
            <Forms name = {props.dish} price = {props.price} ></Forms>
        </li>
    );
}