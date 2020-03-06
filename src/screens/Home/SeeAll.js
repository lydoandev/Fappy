import React, { Component } from 'react'
import { FlatList, View } from 'react-native'
import ItemDish from '../../components/Home/ItemDish'
import navigateTo from '../../until/navigateTo'
export default class SeeAll extends Component {
    navigateToDetail = item => {
        navigateTo({ item }, this.props.componentId, 'Detail');
    };
    render() {
        const { data } = this.props;
        return (
            <View style={{ margin: 15 }}>
                <FlatList
                    data={data}
                    horizontal={false}
                    renderItem={({ item }) => (
                        <ItemDish
                            item={item}
                            flex='row'
                            navigateToDetail={this.navigateToDetail}
                        />
                    )}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}

                />
            </View>
        )
    }
}
