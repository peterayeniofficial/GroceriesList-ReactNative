import React from "react";
import { AsyncStorage } from "react-native";
import {
  List,
  ListItem,
  Body,
  Text,
  Container,
  Fab,
  Content,
  Right
} from "native-base";
import prompt from "react-native-prompt-android";

export default class AddProduct extends React.Component {

    static navigationOptions = {
        title: 'Add a product'
    }
  constructor(props) {
    super(props);
    this.state = {
      allProducts: [
        { id: 1, name: "Bread" },
        { id: 2, name: "Salt" },
        { id: 3, name: "Sugar" },
        { id: 4, name: "Milk" }
      ],
      productsInList: []
    };
  }

  async addNewProduct(name) {
    const newProductList = this.state.allProducts.concat({
      name: name,
      id: Math.floor(Math.random() * 100000)
    });

    await AsyncStorage.setItem("@allProducts", JSON.stringify(newProductList));

    this.setState({
      allProducts: newProductList
    });
  }

  async componentWillMount() {
    const savedProducts = await AsyncStorage.getItem("@allProducts");
    if (savedProducts) {
      this.setState({
        allProducts: JSON.parse(savedProducts)
      });
    }

    this.setState({
      productsInList: this.props.navigation.state.params.productsInList
    });
  }

  async _handleRemovePress(product) {
      this.setState({
        allProducts: this.state.allProducts.filter(p => p.id !== product.id)
      })
      await AsyncStorage.setItem(
          '@allProducts',
          JSON.stringify(this.state.allProducts.filter(p => p.id !== product.id))
      )
  }

  _handleAddProductPress = () => {
    prompt(
      "Enter product name",
      "",
      [
        { text: "Cancel", style: "Cancel" },
        { text: "Ok", onPress: this.addNewProduct() }
      ],
      {
        type: "plain-text"
      }
    );
  };

  _handleProductPress = (product) => {
      const productIndex = this.state.productsInList.findIndex(p => p.id === product.id)

      if (productIndex > -1) {
        this.setState({
            productsInList: this.state.productsInList.filter(p => p.id !=== product.id)
        })
        this.props.navigation.state.params.deleProduct(product)
      } else {
          this.setState({
              productsInList: this.state.productsInList.concat(product)
          })
          this.props.navigation.state.params.AddProduct(product)
      }
  }

  render() {
    return (
      <Container>
        <Content>
          <List>
            {this.state.allProducts.map(product => {
              const productsIsInList = this.productsInList.find(
                p => p.id === product.id
              );
              return (
                <ListItem
                  key={product.id}
                  onPress={() => this._handleProductPress(product)}
                >
                  <Body>
                    <Text style={{ color: productsIsInList ? "#bbb" : "#000" }}>
                      {product.name}
                    </Text>
                    {productsIsInList && (
                      <Text note>{"Already in shopping list"}</Text>
                    )}
                  </Body>
                  <Right>
                    <Icon
                      ios="ios-remove-circle"
                      android="md-remove-circle"
                      style={{ color: "red" }}
                      onPress={() => this._handleRemovePress(product)}
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
          onPress={this._handleAddProductPress}
        >
          <Icon name="add" />
        </Fab>
      </Container>
    );
  }
}
