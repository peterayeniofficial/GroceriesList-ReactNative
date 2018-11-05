import React from "react";
import { StackNavigator } from "react-navigation";
import ShoppingList from "./components/ShoppingList";
import AddProduct from "./components/AddProduct";

const Navigator = StackNavigator({
  ShoppingList: { screen: ShoppingList },
  AddProduct: { screen: AddProduct }
});

export default class App extends React.Component {
  render() {
    return <Navigator />;
  }
}
