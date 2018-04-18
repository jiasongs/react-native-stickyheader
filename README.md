# react-native-stickyheader
[![](https://img.shields.io/npm/dm/react-native-stickyheader.svg?style=flat-square)](https://www.npmjs.com/package/react-native-stickyheader)

# 介绍

此组件实现类似React Native ScrollView组件的吸顶效果。
使用原生驱动动画，支持FlatList,SectionList,ListView等有`onScroll`方法的组件。

## 效果

| iOS | Android |
| --- | ------- |
| ![](./example/demo_ios.gif) | ![](./example/demo_android.gif) |

# Example

```js
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
  Animated,
  ScrollView
} from 'react-native';


import StickyHeader from 'react-native-stickyheader';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { scrollY: new Animated.Value(0) }
    this.data = []
    for (let index = 0; index < 100; index++) {
      this.data.push(index)
    }
  }

  _renderItem = (info) => {
    return (
      <View
        style={{ height: 50, backgroundColor: '#ffffff' }}>
        <Text>{info.item}</Text>
      </View>
    )
  }
  _keyExtractor = (item, index) => {
    return index
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={{ height: 64, backgroundColor: '#973444' }}></View>
        <Animated.ScrollView
          onScroll={Animated.event([{
            nativeEvent: { contentOffset: { y: this.state.scrollY, } }
          }], { useNativeDriver: true })}
          scrollEventThrottle={1}
        >
          <Text>文字</Text>
          <Text>文字</Text>
          <Text>文字</Text>
          <Text>文字</Text>
          <StickyHeader
            stickyHeaderY={60} // 滑动到多少悬浮
            stickyScrollY={this.state.scrollY}
          >
            <View style={{ height: 60, backgroundColor: 'red' }} />
          </StickyHeader>
          <FlatList
            ref={flatList => this._flatList = flatList}
            data={this.data}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </Animated.ScrollView>
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



```
**Note:** `scrollEventThrottle={1}`此属性必须设置且为1,因为要保证有足够的偏移量回调。


# react-native-stickyheader 的原理

待整理


## Installation

```
$ npm install react-native-stickyheader --save
```


## Usage (API)

此组件有以下属性：

| Property | Type | Required | Description |
| -------- | ---- | -------- | ----------- |
| `stickyHeaderY` | `number` | NO | 滑动到多少悬浮  |
| `stickyScrollY` | `any` | Yes | 动画的ScrollY回调 |

## 更新
### 1.1.0

- 支持安卓 

### 1.0.3

- bug修改

### 1.0.0

- 吸顶效果

### 1.1.2

- 简化组件

## Contributing

此组件受到ScrollView组件启发而成。如果觉得好用,请点一个star,有bug的话请提issue，我会尽快解决。

