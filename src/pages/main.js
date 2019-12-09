import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';

import api from '../services/api';

export default class Main extends Component {
  static navigationOptions = {
    title: 'JSHunt',
  };

  state = {
    productInfo: [],
    docs: [],
    page: 1,
  };

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async (page = 1) => {
    const response = await api.get(`/products?page=${page}`);

    const {docs, ...productInfo} = response.data;

    this.setState({docs: [...this.state.docs, ...docs], productInfo, page});

    console.log(docs);
  };

  loadMore = () => {
    const {page, productInfo} = this.state;

    if (page === productInfo.pages) {
      return;
    }

    const pageNumber = page + 1;

    this.loadProducts(pageNumber);
  };

  renderItem = ({item}) => (
    <View style={styles.productContainer}>
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <TouchableOpacity
        style={styles.productButton}
        onPress={() => {
          this.props.navigation.navigate('Product', {product: item});
        }}>
        <Text style={styles.productButtonText}>Acessar</Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        {/* <Text>Página main</Text> */}
        {/* ao substituir as "{ }" na arrow function por "( )",
        {
          return <Text>{product.title}</Text>
        }
        é como se já estivesse dando o "return" direto
        aí nao precisa explicitar o return
        (
          <Text>{product.title}</Text>
        )
        e sendo uma única linha dentro, nem precisa dos ( )
        mas o prettier coloca, ao salvar
         */}
        {/* {this.state.docs.map(product => (
          <Text key={product._id}>{product.title}</Text>
        ))} */}
        {/*
        Vamos utilizar o FlatList para trabalhar com a lista dos produtos
        que tem uma performance melhor que utilizar o map */}
        <FlatList
          contentContainerStyle={styles.list}
          data={this.state.docs}
          keyExtractor={item => item._id} // funciona equivalente ao key do map
          renderItem={this.renderItem} // funçao para renderizar cada item da lista
          onEndReached={this.loadMore} // função que será chamada ao se atingir o final da lista
          onEndReachedThreshold={0.1} // percentual restante da lista para ser ativado o onEndReached, neste caso, 10%
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, //faz com que estas definicoes, como o backgroundColor ocupe a tela toda
    backgroundColor: '#fafafa',
  },
  list: {
    padding: 20,
  },
  productContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  productDescription: {
    fontSize: 16,
    color: '#999',
    marginTop: 5,
    lineHeight: 24,
  },
  productButton: {
    height: 42,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#DA552F',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  productButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#DA552F',
  },
});
