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
  _onLayout(event) {
    const { cellStickyRendererKey } = this.props.CellRendererComponent
    const { cellKey } = this.props;
    if (cellKey === cellStickyRendererKey) {
      this.setState({ layoutY: event.nativeEvent.layout.y })
    }
  }
  render() {
    const { cellStickyRendererKey, cellStickyRendererRef } = this.props.CellRendererComponent
    const { cellKey } = this.props;
    let obj = {}
    if (cellKey === cellStickyRendererKey) {
      obj = { zIndex: 20 }
    }
    return (
      <View
        onLayout={this._onLayout.bind(this)}
        style={[styles.container, obj]}>
        {
          cellKey === cellStickyRendererKey ? (
            <StickyHeader
              style={{
                backgroundColor: 'blue'
              }}
              stickyHeaderParent={cellStickyRendererRef}
              stickyHeaderY={this.state.layoutY}
            >
              {this.props.children}
            </StickyHeader>)
            :
            this.props.children
        }
      </View>
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
