import { View, Text, Image } from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES } from '../constants';

const CustomCardLogo = ({ source, title, subTitle, containerStyle }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
        ...containerStyle,
      }}
    >
      <Image
        source={source}
        resizeMode="contain"
        style={{ width: 40, height: 40, marginRight: SIZES.base }}
      />
      <View>
        <Text style={{ ...FONTS.h3 }}>{title}</Text>
        <Text style={{ ...FONTS.body5 }}>{subTitle}</Text>
      </View>
    </View>
  );
};

export default CustomCardLogo;
