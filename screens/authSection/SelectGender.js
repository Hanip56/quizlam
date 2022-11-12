import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { PickCharCard } from '../../components';
import AuthLayout from './AuthLayout';
import { images, SIZES } from '../../constants';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reset, updateUser } from '../../redux/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SelectGender = ({ navigation }) => {
  const [gender, setGender] = useState('male');
  const dispatch = useDispatch();
  const { user, token, isLoading, isSuccess } = useSelector(
    (state) => state.user
  );

  const handleGender = async () => {
    await AsyncStorage.removeItem('@quizlam_stateScreen');

    dispatch(
      updateUser({
        gender,
        profilePicture: gender === 'male' ? 'RG.png' : 'UG.png',
      })
    );
  };

  useEffect(() => {
    const setStateScreen = async () => {
      await AsyncStorage.setItem('@quizlam_stateScreen', 'selectGender');
    };
    setStateScreen();
  }, []);

  useEffect(() => {
    dispatch(reset());
    if (isSuccess) {
      navigation.replace('Dashboard');
    }

    return () => {
      dispatch(reset());
    };
  }, [isSuccess]);

  return (
    <AuthLayout
      title="Membuat"
      titleBold="Akun"
      description="Select your gender"
      onBackBtn={() => navigation.goBack()}
      labelBtn={isLoading ? 'Loading...' : 'Next'}
      onPressBtn={handleGender}
      disabled={isLoading}
      disableBackBtn={true}
    >
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.padding * 3,
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
          }}
        >
          <PickCharCard
            source={images.rg}
            containerStyle={{ marginHorizontal: SIZES.base }}
            active={gender === 'male'}
            onPress={() => setGender('male')}
            description="laki-laki"
            size={120}
          />
          <PickCharCard
            source={images.ug}
            containerStyle={{ marginHorizontal: SIZES.base }}
            active={gender === 'female'}
            onPress={() => setGender('female')}
            description="Perempuan"
            size={120}
          />
        </View>
      </KeyboardAwareScrollView>
    </AuthLayout>
  );
};

export default SelectGender;
