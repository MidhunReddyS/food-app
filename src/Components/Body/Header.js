import React from "react";
import CartButton from "../Cart/CartButton";
import styles from"./Header.module.css";
import meals from "./meals.jpg"
export default function Header(props){
    return (
        <div>
            <header className={styles.header}>
                <h1>ReactMeals</h1>
                <CartButton onClick={props.onClick}></CartButton>
            </header>
            <div className={styles["main-image"]}>
                <img src={meals}></img>
            </div>
        </div>
    );
}