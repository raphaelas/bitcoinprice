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
   fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=1', {
     method: 'GET',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'X-CMC_PRO_API_KEY': 'b295ec78-ec7d-4be4-8ff3-46d7d8d62cb7'
     }
   })
   .then((response) => response.json())
   .then((responseJson) => { 
     responseJson = responseJson.data;
     const topCoin = responseJson[0];
     this.setState({
      price1: parseFloat(topCoin.quote.USD.price).toFixed(2),
      symbol1: topCoin.symbol,
    });
     fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=2&limit=1&convert=BTC', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CMC_PRO_API_KEY': 'b295ec78-ec7d-4be4-8ff3-46d7d8d62cb7'
      }
    }).then((response) => response.json())
    .then((responseJson) => { 
      responseJson = responseJson.data;
      const secondCoin = responseJson[0];
      this.setState({
        price2InBitcoin: parseFloat(secondCoin.quote.BTC.price).toFixed(8),
        symbol2: secondCoin.symbol
      });
    })
    .catch((error) => { 
      console.error(error);
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
