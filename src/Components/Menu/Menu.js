import Card from "../UI/Card";
import MenuItems from "./MenuItems";
import Styles from "./Menu.module.css"

export default function Menu(props) {
  return (
    <Card className = {Styles.meals}>
      <ul>
        {props.Menu.map((items) => (
          <MenuItems
            key={items.id}
            dish={items.name}
            discription={items.description}
            price={items.price}
          />
        ))}
      </ul>
    </Card>
  );
}
