import Header from "./Components/Body/Header";
import Intro from "./Components/Body/Intro";
import Menu from "./Components/Menu/Menu";
import { useState, useEffect} from "react";
import CartContextProvider from "./Components/Storage/CartContextprovider";
import Cart from "./Components/Cart/Cart";
import useHttp from "./Hooks/useHttp";
import Card from "./Components/UI/Card";
import "./app.css";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

function App() {
  const [popcart, setPopCart] = useState(false);
  const {error, isLoading, fetchData} = useHttp();
  const [meals, setMeals] = useState([]);
  
  useEffect(() => {
    function dataHandler(data){
      const menuItems = []
      for(var id in data){
        menuItems.push({id:id, name : data[id].name, description:data[id].description, price:data[id].price})
      }
      setMeals(menuItems);
    }
    fetchData({link:"https://react-f9541-default-rtdb.firebaseio.com/Menu.json"},dataHandler);

  },[fetchData])
  console.log(error);


  return (
    <CartContextProvider>
      {popcart && (
        <Cart
          onClose={() => {
            setPopCart(false);
          }}
        />
      )}
      <Header
        onClick={() => {
          setPopCart(true);
        }}
      ></Header>
      <Intro></Intro>
      {error ? <Card className="error">{error}</Card>:
      !isLoading ? <Menu Menu={meals}></Menu>: <Card className="loading">Loading data...</Card>}
    </CartContextProvider>
  );
}

export default App;
