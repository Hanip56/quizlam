import { View, Text, SafeAreaView, Image } from 'react-native';
import React, { useEffect } from 'react';
import { COLORS, FONTS, images, SIZES } from '../../constants';
import { CustomBtn, CustomCardLogo } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { reset, updateUser } from '../../redux/authSlice';

const Finish = ({ navigation, route }) => {
  const { time, point } = route.params;
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  let m = Math.floor(time / 60);
  let s = time % 60;
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;
  const elTime = `${m}:${s}`;

  useEffect(() => {
    dispatch(
      updateUser({
        xpPoint: user.xpPoint + point,
      })
    );

    return () => {
      dispatch(reset());
    };
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: SIZES.padding,
        paddingHorizontal: SIZES.padding,
        justifyContent: 'space-between',
      }}
    >
      <Text
        style={{
          ...FONTS.h1,
          textAlign: 'center',
          color: COLORS.primary3,
          marginBottom: SIZES.padding,
        }}
      >
        QUIZ SELESAI
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <CustomCardLogo
          source={images.point}
          title={`+${point}`}
          subTitle="Xp poin"
          containerStyle={{
            borderWidth: 1,
            borderColor: COLORS.primary3,
            margin: SIZES.radius,
            width: '40%',
            borderRadius: SIZES.radius,
            paddingVertical: SIZES.radius,
          }}
        />
        <CustomCardLogo
          source={images.daily}
          title="Time"
          subTitle={elTime}
          containerStyle={{
            borderWidth: 1,
            borderColor: COLORS.primary3,
            margin: SIZES.radius,
            width: '40%',
            borderRadius: SIZES.radius,
            paddingVertical: SIZES.radius,
          }}
        />
      </View>

      <CustomBtn
        label="Lanjutkan"
        onPress={() => navigation.navigate('Dashboard')}
      />
    </SafeAreaView>
  );
};

export default Finish;
