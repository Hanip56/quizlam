import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES } from '../constants';
import Feather from 'react-native-vector-icons/Feather';

const PickCharCard = ({
  active,
  source,
  containerStyle,
  onPress,
  description,
  size,
  icon,
}) => {
  return (
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      <View
        style={{
          width: size,
          height: size,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.bg,
          borderColor: COLORS.charsBgActive,
          borderWidth: active ? 2 : 0,
          borderRadius: SIZES.base,
          ...containerStyle,
        }}
      >
        <Pressable
          style={{
            width: '92%',
            height: '92%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.charsBgActive,
            borderRadius: SIZES.base,
          }}
          onPress={onPress}
        >
          {icon && <Feather name="camera" size={32} />}
          {source && (
            <Image
              source={source}
              resizeMode="contain"
              style={{ width: '60%', height: '60%' }}
            />
          )}
        </Pressable>
      </View>
      <Text style={{ ...FONTS.body4, marginTop: SIZES.radius }}>
        {description}
      </Text>
    </View>
  );
};

export default PickCharCard;
