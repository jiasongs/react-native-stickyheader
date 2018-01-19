# react-native-stickyheader
[![](https://img.shields.io/npm/dm/react-native-stickyheader.svg?style=flat-square)](https://www.npmjs.com/package/react-native-stickyheader)

# 介绍

此组件实现类似React Native ScrollView组件的吸顶效果。
使用原生驱动动画，支持FlatList,SectionList,ListView等有`onScroll`方法的组件。

## 效果

| iOS | Android |
| --- | ------- |
<!-- | ![](./demo.ios.0.17.2.gif) | ![](./demo.android.0.17.2.gif) | -->

# Example

```js
import StickyHeader from 'react-native-stickyheader';

render() {
  return (
   
  );
}
```
**Note:** `scrollEventThrottle={1}`此属性必须设置且为1,因为要保证有足够的偏移量回调。


# react-native-stickyheader 的原理




## Installation

```
$ npm install react-native-stickyheader --save
```


## Usage (API)

此组件有以下属性：

| Property | Type | Required | Description |
| -------- | ---- | -------- | ----------- |
| `style` | `object` | No | 组件的样式，默认为空 |
| `stickyHeaderParent` | `object` | Yes | FlatList等组件的ref |
| `stickyHeaderY` | `number` | NO | header悬浮的位置，只支持竖直效果，默认为`0`，`如果为ScrollView组件请设置为-1` |

## 更新

### 1.0.0

- 吸顶效果

## Contributing

此组件受到ScrollView组件启发而成。如果觉得好用,请点一个star,有bug的话请提issue，我会尽快解决。

