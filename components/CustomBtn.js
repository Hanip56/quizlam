import { View, Text } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS, FONTS, SIZES } from '../constants';

const CustomBtn = ({
  label,
  containerStyle,
  labelStyle,
  onPress,
  disabled,
}) => {
  return (
    <TouchableOpacity
      style={{
        width: '100%',
        padding: SIZES.radius,
        backgroundColor: COLORS.primary,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        ...containerStyle,
      }}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={{
          ...FONTS.h3,
          color: COLORS.white,
          ...labelStyle,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomBtn;
