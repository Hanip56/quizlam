import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { FormControl } from '../../components';
import Feather from 'react-native-vector-icons/Feather';
import AuthLayout from './AuthLayout';
import { COLORS, FONTS, SIZES } from '../../constants';
import { color } from 'react-native-reanimated';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login, reset } from '../../redux/authSlice';

const SignIn = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [errorUsername, setErrorUsername] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector((state) => state.user);
  const { isError, message, isSuccess, isLoading } = user;
  const dispatch = useDispatch();

  const [showPass, setShowPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  useEffect(() => {
    if (username) {
      setErrorUsername('');
    }

    return () => {
      dispatch(reset());
    };
  }, [username]);

  useEffect(() => {
    if (password) {
      setErrorPassword('');
    }
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      });
      dispatch(reset());
    }
  }, [isSuccess]);

  const handleSignIn = () => {
    dispatch(reset());
    if (!username) {
      setErrorUsername('Nama harus diisi');
    }
    if (!password) {
      setErrorPassword('Password harus diisi');
      return;
    }

    dispatch(login({ user: { username, password }, rememberMe }));
  };

  return (
    <AuthLayout
      title="Selamat datang"
      titleBold="Kembali"
      description="Tolong Sign in untuk masuk"
      labelBtn={isLoading ? 'Loading...' : 'Sign In'}
      onBackBtn={() => navigation.goBack()}
      onPressBtn={handleSignIn}
    >
      <KeyboardAwareScrollView style={{ flex: 1, marginTop: SIZES.padding }}>
        {/* Error container */}
        {isError && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: SIZES.padding,
              backgroundColor: COLORS.secondary2,
              marginBottom: SIZES.base,
            }}
          >
            <Text style={{ ...FONTS.body4, color: 'red', textAlign: 'center' }}>
              {message}
            </Text>
          </View>
        )}

        <FormControl
          label="Username"
          placeholder="Masukan username anda"
          autoComplete="username"
          onChange={(e) => setUsername(e)}
          appendComponent={
            <View
              style={{
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Feather name="check-circle" size={20} color="green" />
            </View>
          }
          errorMsg={errorUsername}
        />
        <FormControl
          label="Password"
          placeholder="Masukan password anda"
          autoComplete="password"
          secureTextEntry={!showPass}
          onChange={(e) => setPassword(e)}
          appendComponent={
            <View
              style={{
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Feather
                name={showPass ? 'eye-off' : 'eye'}
                size={20}
                onPress={() => setShowPass((prev) => !prev)}
              />
            </View>
          }
          containerStyle={{ marginTop: SIZES.padding }}
          errorMsg={errorPassword}
        />
        {/* remember me && create account */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: SIZES.padding,
          }}
        >
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => setRememberMe((prev) => !prev)}
          >
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: COLORS.primary2,
                marginRight: SIZES.base,
              }}
            >
              {rememberMe && (
                <Feather name="check" size={20} color={COLORS.white} />
              )}
            </View>
            <Text>ingat saya</Text>
          </Pressable>

          <Pressable onPress={() => navigation.replace('signUp')}>
            <Text style={{ color: COLORS.primary2 }}>/ buat akun</Text>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
    </AuthLayout>
  );
};

export default SignIn;
