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
  Dimensions,
  SectionList,
} from 'react-native';

import StickyRendererComponent from 'react-native-stickyheader'

export default class App extends Component {
  constructor(props) {
    super(props);

  }

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
    StickyRendererComponent.cellStickyRendererRef = this._flatList
    StickyRendererComponent.cellStickyRendererKey = 3
  }
  _keyExtractor = (item, index) => {
    return index
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
          CellRendererComponent={StickyRendererComponent}
          scrollEventThrottle={1}
          data={data}
          keyExtractor={this._keyExtractor}
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
