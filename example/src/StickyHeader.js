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
  _onLayout = (event) => {
    this.setState({
      stickyLayoutY: event.nativeEvent.layout.y,
      stickyHeaderHeight: event.nativeEvent.layout.height,
    });
  }
  render() {
    const { stickyLayoutY, stickyHeaderHeight, } = this.state;
    const { stickyHeaderValue, stickyHeaderY, stickyHeaderParent } = this.props
    let y = stickyHeaderY != -1 ? stickyHeaderY : stickyLayoutY;
    const translateY = this.scrollY.interpolate({
      inputRange: [-1, 0, y, y + 1],
      outputRange: [0, 0, 0, 1],
    });
    return (
      <Animated.View
        onLayout={this._onLayout}
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

