'use strict';
import React, { useMemo, useState, useCallback } from 'react';
import { StyleSheet, ViewPropTypes, Animated } from 'react-native';
import PropTypes from 'prop-types';

function StickyHeader(props) {
  const {
    stickyHeaderY,
    stickyScrollY,
    children,
    style,
    forwardedRef,
    onLayout,
    ...otherProps
  } = props;

  const [stickyLayoutY, setStickyLayoutY] = useState(0);

  const _onLayout = useCallback(
    (event) => {
      if (event && event.nativeEvent) {
        setStickyLayoutY(event.nativeEvent.layout.y);
      }
      onLayout && onLayout(event);
    },
    [onLayout],
  );

  const translateY = useMemo(() => {
    const y = stickyHeaderY !== -1 ? stickyHeaderY : stickyLayoutY;
    return stickyScrollY.interpolate({
      inputRange: [-1, 0, y, y + 1],
      outputRange: [0, 0, 0, 1],
    });
  }, [stickyHeaderY, stickyLayoutY, stickyScrollY]);

  return (
    <Animated.View
      ref={forwardedRef}
      onLayout={_onLayout}
      style={[style, styles.container, { transform: [{ translateY }] }]}
      {...otherProps}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 100,
  },
});

StickyHeader.propTypes = {
  style: ViewPropTypes.style,
  stickyHeaderY: PropTypes.number,
  stickyScrollY: PropTypes.any,
};

StickyHeader.defaultProps = {
  stickyHeaderY: -1,
  stickyScrollY: new Animated.Value(0),
};

const MemoStickyHeader = React.memo(StickyHeader);

const ForwardStickyHeader = React.forwardRef((props, ref) => (
  <MemoStickyHeader forwardedRef={ref} {...props} />
));

ForwardStickyHeader.displayName = 'StickyHeader';

export default ForwardStickyHeader;
