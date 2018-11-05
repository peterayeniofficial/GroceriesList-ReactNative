import React from "react";
import { Alert } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  List,
  ListItem,
  Body,
  Right,
  CheckBox,
  Fab,
  Icon
} from "native-base";

class ShoppingList extends React.Component {
  state = {
    products: [{ id: 1, name: "Bread" }, { id: 2, name: "Eggs" }]
  };

  _handleProductPress = product => {
    this.state.products.forEach(p => {
      if (product.id === p.id) {
        p.gotten = !p.gotten;
      }
      return p;
    });

    this.setState({ products: this.state.products });
  };

  _handleAddProductPress = () => {
    this.props.navigation.navigate("AddProduct", {
      addProduct: product => {
        this.setState({
          products: this.state.products.concat(product)
        });
      },
      deleteProduct: product => {
        this.setState({
          products: this.state.products.filter(p => p.id !== product.id)
        });
      },
      productsInList: this.state.products
    });
  };

  _handleClearPress = () => {
    Alert.alert("Clear All Items?", null, [
      { text: "Cancel" },
      { text: "Ok", onPress: () => this.setState({ products: [] }) }
    ]);
  };

  static navigationOptions = {
    title: "My Groceries List"
  };
  render() {
    return (
      <Container>
        <Content>
          <List>
            {this.state.products.map(p => {
              return (
                <ListItem
                  key={p.id}
                  onPress={() => this._handleProductPress(p)}
                >
                  <Body>
                    <Text>{p.name}</Text>
                  </Body>
                  <Right>
                    <CheckBox
                      checked={p.gotten}
                      onPress={() => this._handleProductPress(p)}
                    />
                  </Right>
                </ListItem>
              );
            })}
          </List>
        </Content>
        <Fab
          style={{ backgroundColor: "#5067FF" }}
          position="bottomRight"
          onPress={this._handleAddProductPress()}
        >
          <Icon name="add" />
        </Fab>
        <Fab
          style={{ backgroundColor: "red" }}
          position="bottomLeft"
          onPress={this._handleClearPress()}
        >
          <Icon android="md-remove" />
        </Fab>
      </Container>
    );
  }
}

export default ShoppingList;
