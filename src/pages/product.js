import React from 'react';

import {Text} from 'react-native';
import {WebView} from 'react-native-webview';

const Product = ({navigation}) => (
  // <Text>{navigation.state.params.product.description}</Text>
  <WebView
    source={{uri: navigation.state.params.product.url}} // a primeira { } é pra referir que o çodigo será JS, e a segunda { } pra usar um objeto dentro
  />
);

Product.navigationOptions = ({navigation}) => ({
  title: navigation.state.params.product.title,
});

export default Product;
