import { View } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { SIZES } from '../constants';

const FormModal = ({
  placeholder,
  onChangeText,
  containerStyle,
  numberOfLines,
  backgroundColor = '#00000015',
  value,
  defaultValue,
}) => {
  return (
    <View
      style={{
        backgroundColor,
        borderRadius: SIZES.radius,
        paddingHorizontal: SIZES.base,
        marginVertical: SIZES.base,
        ...containerStyle,
      }}
    >
      <TextInput
        multiline={true}
        numberOfLines={numberOfLines}
        onChangeText={onChangeText}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
      />
    </View>
  );
};

export default FormModal;
