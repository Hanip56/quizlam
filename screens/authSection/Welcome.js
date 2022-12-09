import {
  View,
  Text,
  Image,
  ImageBackground,
  BackHandler,
  StatusBar,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, FONTS, images, SIZES } from '../../constants';
import { CustomBtn } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, reset, setToken } from '../../redux/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';

const Welcome = ({ navigation }) => {
  const [success, setSuccess] = useState(false);
  const [stateScreen, setStateScreen] = useState('');
  const dispatch = useDispatch();
  const { user, isSuccess, isError, message } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () =>
      BackHandler.exitApp()
    );

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', () =>
        BackHandler.exitApp()
      );
  }, []);

  useEffect(() => {
    dispatch(reset());
    const getToken = async () => {
      const token = await AsyncStorage.getItem('@quizlam_token');
      const varScreen = await AsyncStorage.getItem('@quizlam_stateScreen');
      if (!token) {
        setSuccess(true);
        return;
      }
      if (varScreen) {
        setStateScreen(varScreen);
      }
      dispatch(setToken(token));
      dispatch(getProfile(token));
    };
    getToken();
  }, []);

  useEffect(() => {
    if (success) {
      SplashScreen.hide();
      dispatch(reset());
    }
  }, [success]);

  useEffect(() => {
    if (isSuccess) {
      setSuccess(true);
      if (stateScreen) {
        navigation.replace(stateScreen);
      } else {
        navigation.replace('Dashboard');
      }
      dispatch(reset());
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      SplashScreen.hide();
    }
  });

  return (
    <ImageBackground
      source={images.welcomeBg}
      resizeMode="stretch"
      style={{ flex: 1, padding: SIZES.padding }}
    >
      <StatusBar animated={true} hidden={true} />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: SIZES.radius,
        }}
      >
        <Text style={{ ...FONTS.h2 }}>Selamat datang di </Text>
        <Text style={{ ...FONTS.h2, color: COLORS.primary2 }}>Quizlam</Text>
      </View>
      <Text style={{ ...FONTS.body5, textAlign: 'center' }}>
        Pelajari pengetahuan-pengetahuan tentang islam dengan menjawab kuis
      </Text>
      <View
        style={{
          flex: 1,
          width: SIZES.width - SIZES.padding * 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          source={images.quizlamLogo}
          resizeMode="contain"
          style={{ width: '60%', height: '60%' }}
        />
      </View>
      <View>
        <CustomBtn
          label="Sign In"
          onPress={() => navigation.navigate('signIn')}
        />
        <CustomBtn
          label="Sign Up"
          containerStyle={{ marginTop: SIZES.padding }}
          onPress={() => navigation.navigate('signUp')}
        />
      </View>
    </ImageBackground>
  );
};

export default Welcome;
