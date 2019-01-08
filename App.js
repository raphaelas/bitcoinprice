import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      symbol1: '',
      price1: 0,
      symbol2: '',
      price2InBitcoin: 0
    };
    this.getBtcPrice()
  }

  getBtcPrice() {
   fetch('https://api.coinmarketcap.com/v1/ticker/?limit=2', {
     method: 'GET',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     }
   })
   .then((response) => JSON.parse(response._bodyText))
   .then((responseJson) => { 
     const topCoin = responseJson[0];
     const secondCoin = responseJson[1];
      this.setState({
        price1: parseFloat(topCoin.price_usd).toFixed(2),
        symbol1: topCoin.symbol,
        price2InBitcoin: secondCoin.price_btc,
        symbol2: secondCoin.symbol
      });
   })
   .catch((error) => { 
     console.error(error);
   });
 
 }

  render() {
    return (
      <View style={styles.container}>
        <Button title="Refresh" on onPress={() => this.getBtcPrice()}>Get Price</Button>
        <Text>{this.state.symbol1} -> USD</Text>
        <Text style={styles.spaceBelowAfterPrice}>${this.state.price1}</Text>
        <Text>{this.state.symbol2} -> BTC</Text>
        <Text style={styles.priceText}>{this.state.price2InBitcoin}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceText: {
    fontSize: 18
  },
  spaceBelowAfterPrice: {
    fontSize: 18,
    marginBottom: 20
  }
});
