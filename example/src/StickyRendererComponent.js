'use strict';
//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StickyHeader from './StickyHeader';
// create a component
class StickyRendererComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { layoutY: 0 }
  }
  _onLayout = (event) => {
    const { cellStickyRendererKey } = this.props.CellRendererComponent
    const { cellKey } = this.props;
    if (cellKey === cellStickyRendererKey) {
      this.setState({ layoutY: event.nativeEvent.layout.y })
    }
  }
  render() {
    const { cellStickyRendererKey, cellStickyRendererRef } = this.props.CellRendererComponent
    const { cellKey } = this.props;
    let view = (cellKey === cellStickyRendererKey) ?
      <StickyHeader
        style={{
          zIndex: 49,
        }}
        stickyHeaderParent={cellStickyRendererRef}
        stickyHeaderY={this.state.layoutY} >
        {this.props.children}
      </StickyHeader> :
      <View
        onLayout={this._onLayout}
        style={styles.container} >
        {this.props.children}
      </View>
    return (
      view
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//make this component available to the app
export default StickyRendererComponent;
