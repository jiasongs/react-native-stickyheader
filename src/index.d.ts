import * as React from 'react';
import { StyleProp, ViewStyle, ViewProps } from 'react-native';

export interface StickyHeaderProps extends ViewProps {
  style?: StyleProp<ViewStyle>;
  stickyHeaderY?: number;
  stickyScrollY: any;
}

const StickyHeader: React.ComponentClass<StickyHeaderProps>;

export default StickyHeader;
