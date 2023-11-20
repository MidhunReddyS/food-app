import classes from "./SubmitForm.module.css";
import useInput from "../../Hooks/useInput";
import useHttp from "../../Hooks/useHttp";
import { useContext } from "react";
import CartContext from "../Storage/CartContext";

export default function SubumitForm(props){

  const {fetchData: postData} = useHttp();
  const ctx = useContext(CartContext)

    const {value : nameValue, inputStyle: nameStyle, valueStateIsValid:nameIsValid, showError:nameshowError, ChangeHandler: nameChangeHandler, blurHandler: nameblurHandler, reset: namereset} = useInput();
    const {value : streetValue, inputStyle: streetStyle, valueStateIsValid:streetIsValid, showError:streetshowError, ChangeHandler: streetChangeHandler, blurHandler: streetblurHandler, reset: streetreset} = useInput();
    const {value : postalValue, inputStyle: postalStyle, valueStateIsValid:postalIsValid, showError:postalshowError, ChangeHandler: postalChangeHandler, blurHandler: postalblurHandler, reset: postalreset} = useInput("postal");
    const {value : cityValue, inputStyle: cityStyle, valueStateIsValid:cityIsValid, showError:cityshowError, ChangeHandler: cityChangeHandler, blurHandler: cityblurHandler, reset: cityreset} = useInput();

    const formValid = nameIsValid && streetIsValid && postalIsValid && cityIsValid;
    function confirmHandler(event) { 
        event.preventDefault();

        const inputData = {
          name: nameValue,
          street: streetValue,
          postal: postalValue,
          city: cityValue
        }

        postData({link:"https://react-f9541-default-rtdb.firebaseio.com/order.json", method: "POST", Headers:{'Content-Type': 'application/json',}, 
        body: {userData: inputData, orderdItems:ctx.items}
      },(data) => {console.log(data)});

      ctx.clearCart();
      props.onClose();

        namereset();
        streetreset();
        postalreset();
        cityreset();
     }

    return(
        <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${classes[nameStyle]}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' value={nameValue} onChange={nameChangeHandler} onBlur={nameblurHandler}/>
        {nameshowError && <p>please enter a valid name</p>}
      </div>
      <div className={`${classes.control} ${classes[streetStyle]}`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' value={streetValue} onChange={streetChangeHandler} onBlur={streetblurHandler}/>
        {streetshowError && <p>please enter a valid street</p>}
      </div>
      <div className={`${classes.control} ${classes[postalStyle]}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' value={postalValue} onChange={postalChangeHandler} onBlur={postalblurHandler}/>
        {postalshowError && <p>please enter a valid postal code of 5 letters</p>}
      </div>
      <div className={`${classes.control} ${classes[cityStyle]}`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' value={cityValue} onChange={cityChangeHandler} onBlur={cityblurHandler}/>
        {cityshowError && <p>please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCacelOrder}>
          Cancel
        </button>
        <button type="submit" disabled = {!formValid} className={classes.submit}>Confirm</button>
      </div>
    </form>
    );
}