import { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { FormControl } from '../../components';
import Feather from 'react-native-vector-icons/Feather';
import AuthLayout from './AuthLayout';
import { COLORS, FONTS, SIZES } from '../../constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../../redux/authSlice';

const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorUsername, setErrorUsername] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { isError, message, isSuccess, isLoading } = user;

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
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
    if (confirmPassword) {
      setErrorConfirmPassword('');
    }
  }, [confirmPassword]);

  useEffect(() => {
    if (isSuccess) {
      navigation.replace('selectGender');
      dispatch(reset());
    }
  }, [isSuccess]);

  const handleSignUp = () => {
    dispatch(reset());
    if (!username) {
      setErrorUsername('Nama harus diisi');
    }
    if (!password) {
      setErrorPassword('Password harus diisi');
    }
    if (!confirmPassword) {
      setErrorConfirmPassword('Konfirmasi password harus diisi');
    }
    if (password !== confirmPassword) {
      setErrorConfirmPassword('Konfirmasi password tidak sesuai');
      return;
    }

    dispatch(register({ user: { username, password }, rememberMe }));
  };

  return (
    <AuthLayout
      title="Membuat"
      titleBold="Akun"
      description="Tolong Sign up untuk masuk"
      labelBtn={isLoading ? 'Loading' : 'Next'}
      onBackBtn={() => navigation.goBack()}
      onPressBtn={handleSignUp}
      disabled={isLoading}
    >
      <KeyboardAwareScrollView style={{ flex: 1, marginTop: SIZES.radius }}>
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
          onChange={(e) => setUsername(e)}
          appendComponent={
            <View
              style={{
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Feather
                name="check-circle"
                size={20}
                color={errorUsername ? 'gray' : 'green'}
              />
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
        <FormControl
          label="Konfirmasi Password"
          placeholder="konfirmasi password anda"
          autoComplete="password"
          secureTextEntry={!showConfirmPass}
          onChange={(e) => setConfirmPassword(e)}
          appendComponent={
            <View
              style={{
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Feather
                name={showConfirmPass ? 'eye-off' : 'eye'}
                size={20}
                onPress={() => setShowConfirmPass((prev) => !prev)}
              />
            </View>
          }
          containerStyle={{ marginTop: SIZES.padding }}
          errorMsg={errorConfirmPassword}
        />

        {/* remember me */}
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

          <Pressable onPress={() => navigation.replace('signIn')}>
            <Text style={{ color: COLORS.primary2 }}>/ Sign In</Text>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
    </AuthLayout>
  );
};

export default SignUp;
