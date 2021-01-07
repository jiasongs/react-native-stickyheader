/* eslint-disable prettier/prettier */
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Animated } from 'react-native';

import StickyHeader from 'react-native-stickyheader';

function App() {
  const scrollY = useRef(new Animated.Value(0));
  const [data, setData] = useState([]);

  useEffect(() => {
    let array = [];
    for (let index = 0; index < 100; index++) {
      array.push(index);
    }
    setData(array);
  }, []);

  const renderItem = useCallback((info) => {
    return (
      <View style={{ height: 50, backgroundColor: '#ffffff' }}>
        <Text>{info.item}</Text>
      </View>
    );
  }, []);

  const keyExtractor = useCallback((item, index) => {
    return index + '';
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ height: 64, backgroundColor: '#973444' }} />
      <Animated.ScrollView
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { y: scrollY.current } },
            },
          ],
          { useNativeDriver: true },
        )}
        scrollEventThrottle={1}
      >
        <Text>文字</Text>
        <Text>文字</Text>
        <Text>文字</Text>
        <Text>文字</Text>
        <StickyHeader
          stickyHeaderY={60} // 滑动到多少悬浮
          stickyScrollY={scrollY.current}
        >
          <View style={{ height: 60, backgroundColor: '#d22222' }} />
        </StickyHeader>
        <FlatList
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
});

export default App;
