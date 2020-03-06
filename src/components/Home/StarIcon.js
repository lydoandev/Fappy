import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class StarIcon extends Component {
  render() {
    const { star } = this.props;
    console.log("Star nef", star);
    

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon
          name="star"
          size={15}
          style={{ paddingRight: 2 }}
          color={star < 1 ? '#ababab' : '#ffd11a'}
        />
        <Icon
          name="star"
          size={15}
          style={styles.star_icon}
          color={star < 2 ? '#ababab' : '#ffd11a'}
        />
        <Icon
          name="star"
          size={15}
          style={styles.star_icon}
          color={star < 3 ? '#ababab' : '#ffd11a'}
        />
        <Icon
          name="star"
          size={15}
          style={styles.star_icon}
          color={star < 4 ? '#ababab' : '#ffd11a'}
        />
        <Icon
          name="star"
          size={15}
          style={styles.star_icon}
          color={star < 5 ? '#ababab' : '#ffd11a'}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  star_icon: {
    paddingHorizontal: 2,
  },
});