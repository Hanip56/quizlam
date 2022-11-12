import { View, Text } from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES } from '../constants';

const Loading = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View
        style={{
          width: 100,
          height: 100,
          borderWidth: 15,
          borderColor: COLORS.additionalColor4,
          borderRadius: 50,
          marginBottom: SIZES.padding,
        }}
      ></View>
      <Text style={{ ...FONTS.h4 }}>Loading...</Text>
    </View>
  );
};

export default Loading;
