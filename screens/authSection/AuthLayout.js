import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SIZES } from '../../constants';
import { CustomBtn } from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AuthLayout = ({
  title,
  titleBold,
  description,
  children,
  labelBtn,
  onPressBtn,
  onBackBtn,
  disabled,
  disableBackBtn,
}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: SIZES.padding,
        paddingHorizontal: SIZES.padding,
      }}
    >
      {/* header navigation */}
      {!disableBackBtn && (
        <View style={{ height: 30, alignSelf: 'flex-start' }}>
          <Ionicons name="arrow-back" size={25} onPress={onBackBtn} />
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: SIZES.radius,
        }}
      >
        <Text style={{ ...FONTS.h3 }}>{title} </Text>
        <Text style={{ ...FONTS.h3, color: COLORS.primary2 }}>{titleBold}</Text>
      </View>
      <Text style={{ ...FONTS.body5, textAlign: 'center' }}>{description}</Text>

      {/* content */}
      {children}
      <CustomBtn label={labelBtn} onPress={onPressBtn} disabled={disabled} />
    </SafeAreaView>
  );
};

export default AuthLayout;
