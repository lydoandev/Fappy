import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import StarIcon from './StarIcon';

export const Star = props => {
  const { star } = props;
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <StarIcon star={star}></StarIcon>
      <Icon style={{ marginLeft: 10 }} name='tag' color='#ff6666'></Icon>
    </View>
  );
};