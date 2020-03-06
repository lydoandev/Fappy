import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ItemDish from './ItemDish';

export default class ListDish extends Component {
  render() {
    const { data, navigateToDetail, flex, horizontal} = this.props;
    const dishes = data.slice(0, 5);
    return (
      <FlatList
        data={dishes}
        horizontal={horizontal}
        renderItem={({ item }) => (
          <ItemDish
            item={item}
            flex={flex}
            navigateToDetail={navigateToDetail}
          />
        )}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    );
  }
}

const styles = StyleSheet.create({
  listDishes: {
    marginVertical: 15,
  },
  titleContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
  },
});