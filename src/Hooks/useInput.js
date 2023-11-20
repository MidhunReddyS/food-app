import { useReducer } from "react";


const intialValue = {
    value:"",
    isTouched:false
}

function inputReducer(state, action){
    if(action.id === "change"){
        
       
        return{
            value: action.value,
            isTouched: state.isTouched
        }
    }
    else if(action.id === "blur"){
        return{
            value: state.value,
            isTouched: action.isTouched
        }
    }
    else if(action.id === "reset"){
        return{
            value: "",
            isTouched: false
        }
    }

    return intialValue
}

export default function useInput(type = "name"){

    const [valueState, dispatcher] = useReducer(inputReducer, intialValue);

    const input ={
        name: true,
        postal: valueState.value.trim().length === 5
    }
     
    const valueStateIsValid = valueState.value !== "" && input[type];
    const showError =  !valueStateIsValid && valueState.isTouched;
    


    function ChangeHandler(event){
        dispatcher({id:"change", value:event.target.value})
        
    };
    function blurHandler(){
        dispatcher({id:"blur", isTouched:true})
    };
    function reset(){
        dispatcher({id:"reset"})
    };

    const inputStyle = showError ? "invalid" : ""

    return ({value: valueState.value, inputStyle, showError, valueStateIsValid, ChangeHandler, blurHandler, reset});
}
