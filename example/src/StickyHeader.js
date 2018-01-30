'use strict';
//import liraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Animated,
  StyleSheet
} from 'react-native';

// create a component
export default class StickyHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stickyLayoutY: 0,
      stickyHeaderHeight: 0,
    };
    this.scrollY = new Animated.Value(0)
  }
  componentDidMount() {
    this._updateAnimatedAttachNativeEvent();
  }
  componentDidUpdate() {
    this._updateAnimatedAttachNativeEvent();
  }
  componentWillUnmount() {
    this._deleteAnimatedAttachNativeEvent()
  }
  _deleteAnimatedAttachNativeEvent() {
    if (this._scrollAnimatedValueAttachment) {
      this._scrollAnimatedValueAttachment.detach();
    }
  }
  _updateAnimatedAttachNativeEvent() {
    if (this._scrollAnimatedValueAttachment) {
      this._scrollAnimatedValueAttachment.detach();
    }
    if (Object.keys(this.props.stickyHeaderParent).length > 0) {
      this._scrollAnimatedValueAttachment = Animated.attachNativeEvent(
        this.props.stickyHeaderParent,
        'onScroll',
        [{ nativeEvent: { contentOffset: { y: this.scrollY, } } }],
      );
    }
  }
  _onLayout(event) {
    this.setState({
      stickyLayoutY: event.nativeEvent.layout.y,
      stickyHeaderHeight: event.nativeEvent.layout.height,
    });
  }
  render() {
    const { stickyLayoutY, stickyHeaderHeight, } = this.state;
    const { stickyHeaderValue, stickyHeaderY, stickyHeaderParent } = this.props
    const inputRange = [-1, 0];
    const outputRange = [0, 0];
    let y = stickyHeaderY != -1 ? stickyHeaderY : stickyLayoutY;
    inputRange.push(y);
    outputRange.push(0);
    inputRange.push(y + 1);
    outputRange.push(1);
    const translateY = this.scrollY.interpolate({
      inputRange,
      outputRange,
    });
    return (
      <Animated.View
        collapsable={false}
        onLayout={this._onLayout.bind(this)}
        style={[
          this.props.style,
          styles.container,
          { transform: [{ translateY }] }
        ]
        }
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    zIndex: 20
  },
});

StickyHeader.propTypes = {
  stickyHeaderParent: PropTypes.object.isRequired,
  stickyHeaderY: PropTypes.number
}
StickyHeader.defaultProps = {
  stickyHeaderParent: {},
  stickyHeaderY: 0
}
//make this component available to the app

