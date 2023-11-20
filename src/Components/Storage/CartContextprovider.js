import CartContext from "./CartContext";
import { useReducer } from "react";

const initial = {
    items :[],
    amount : 0,
}
function cartManager (state, action){
    if(action.id === "add"){
        
        if(state.items.findIndex((item) => {return (item.name === action.value.name)}) > -1){
            const updatedItem = [...state.items]
            updatedItem[state.items.findIndex((item) => {return (item.name === action.value.name)})].amount += 1;
            const updatedTotal = state.amount + action.value.price;
            return {
                items : updatedItem,
                amount : updatedTotal
            };
        }
        else{
            const updatedItem = [...state.items, action.value];
            const updatedTotal = state.amount + action.value.price;
            return {
                items : updatedItem,
                amount : updatedTotal
            };
        }
    }
    else if(action.id === "remove"){
        if(action.value.amount === 1){
            const updatedItem = state.items.filter((item) => {return (item.name !== action.value.name)});
        const updatedTotal = state.amount - action.value.price;
        return {
            items : updatedItem,
            amount : updatedTotal
        }
        }
        else{
            const updatedItem = [...state.items]
            updatedItem[state.items.findIndex((item) => {return (item.name === action.value.name)})].amount -=1;
            const updatedTotal = state.amount - action.value.price;
            return {
                items : updatedItem,
                amount : updatedTotal
            };
        } 
    }
    else if(action.id === "clear"){
        return initial;
    }

    
        return initial;
    
}

export default function CartContextProvider(props){

    const [cartState, cartDispacher] = useReducer(cartManager,initial)

    function addItemHandler(event){
        cartDispacher({value:event, id:"add"})

    }
    function removeItemHandler(event){ 
        cartDispacher({value:event, id:"remove"})

     }
     function clearCartHandler() { 
        cartDispacher({id:"clear"})
      }
     
    return(
        <CartContext.Provider value={
            { items : cartState.items,
                amount : cartState.amount,
                addItem: addItemHandler,
                removeItem: removeItemHandler,
                clearCart:clearCartHandler
            }
        }>{props.children}

        </CartContext.Provider>
    );
}