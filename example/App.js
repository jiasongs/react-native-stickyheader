/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions
} from 'react-native';

import StickyRendererComponent from './src/StickyRendererComponent'
import StickyHeader from './src/StickyHeader'
export default class App extends Component {

  _renderItem(info) {
    if (info.index == 3) {
      return <View
        style={{ height: 50, backgroundColor: '#2578b5' }}>
        <Text>{info.item}</Text>
      </View>
    }
    return (
      <View
        style={{ height: 50, backgroundColor: '#ffffff' }}>
        <Text>{info.item}</Text>
      </View>
    )
  }
  componentDidMount() {
    // StickyRendererComponent.cellStickyRendererRef = this._flatList
    // StickyRendererComponent.cellStickyRendererKey = 3
  }
  render() {
    let data = []
    for (let index = 0; index < 100; index++) {
      data.push(index)
    }
    return (
      <View style={styles.container}>
        <View style={{ height: 64, backgroundColor: '#973444' }}></View>
        <FlatList
          ref={flatList => this._flatList = flatList}
          ListHeaderComponent={() => <StickyHeader
            style={{
              backgroundColor: 'blue'
            }}
            stickyHeaderParent={this._flatList}
            stickyHeaderY={0}
          >
            <View style={{ height: 200, backgroundColor: 'red' }}></View>
          </StickyHeader>}
          CellRendererComponent={StickyRendererComponent}
          collapsable={false}
          scrollEventThrottle={1}
          data={data}
          keyExtractor={(item, index) => item}
          renderItem={this._renderItem.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
});
