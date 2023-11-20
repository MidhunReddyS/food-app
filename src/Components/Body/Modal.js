import Card from "../UI/Card";
import Style from "./Modal.module.css"

export default function Modal(props){
    return (
        <div className={Style.backdrop}>
            <Card className={Style.modal}>
                {props.children}
                </Card> 
        </div>
    );
}