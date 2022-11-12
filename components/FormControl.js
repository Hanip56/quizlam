import { View, Text, TextInput } from 'react-native';

import { FONTS, SIZES, COLORS } from '../constants';

const FormInput = ({
  containerStyle,
  label,
  placeholder,
  inputStyle,
  prependComponent,
  appendComponent,
  onChange,
  secureTextEntry,
  keyboardType = 'default',
  autoComplete = 'off',
  autoCapitalize = 'none',
  errorMsg = '',
  value,
  editable,
  selectTextOnFocus,
}) => {
  return (
    <View
      style={{
        ...containerStyle,
      }}
    >
      {/* Label & Error msg */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ ...FONTS.body4 }}>{label}</Text>
        <Text style={{ ...FONTS.body5, color: COLORS.additionalColor1 }}>
          {errorMsg}
        </Text>
      </View>

      {/* Text input */}
      <View
        style={{
          flexDirection: 'row',
          height: 55,
          paddingHorizontal: SIZES.padding,
          marginTop: SIZES.base,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.input,
        }}
      >
        {prependComponent}

        <TextInput
          style={{
            flex: 1,
            ...inputStyle,
          }}
          placeholder={placeholder}
          placeholderTextColor={COLORS.gray}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoComplete={autoComplete}
          autoCapitalize={autoCapitalize}
          onChangeText={(text) => onChange(text)}
          value={value}
          editable={editable}
          selectTextOnFocus={selectTextOnFocus}
        />

        {appendComponent}
      </View>
    </View>
  );
};

export default FormInput;
