import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { CustomBtn, FormControl } from '../../components';
import { COLORS, FONTS, images, SIZES, URL } from '../../constants';
import { resetUser } from '../../redux/authSlice';

const Setting = ({ navigation, route }) => {
  const { curUsername } = route.params;
  const [username, setUsername] = useState(curUsername);
  const [password, setPassword] = useState('123456');
  const [gender, setGender] = useState('');
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const onBackBtn = () => {
    navigation.goBack();
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('@quizlam_token');
    dispatch(resetUser());
    navigation.reset({
      index: 0,
      routes: [{ name: 'welcome' }],
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* header */}
      <View
        style={{
          alignSelf: 'flex-start',
          padding: SIZES.radius,
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          width: '100%',
        }}
      >
        <Ionicons name="arrow-back" size={25} onPress={onBackBtn} />
        <Text style={{ ...FONTS.h4, flex: 1, textAlign: 'center' }}>
          Pengaturan
        </Text>
        <View />
      </View>

      {/* settings container */}
      <KeyboardAwareScrollView
        style={{ marginTop: SIZES.padding, paddingHorizontal: SIZES.padding }}
      >
        <Text style={{ ...FONTS.h3, color: COLORS.black }}>Profilmu</Text>

        {/* profile picture */}
        <View
          style={{
            width: 130,
            height: 130,
            backgroundColor: COLORS.bg,
            borderColor: COLORS.primary2,
            borderWidth: 4,
            borderRadius: 80,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginVertical: SIZES.radius,
          }}
        >
          <View
            style={{
              width: '90%',
              height: '90%',
              backgroundColor: COLORS.primary2,
              borderRadius: 80,
              overflow: 'hidden',
            }}
          >
            <View
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              <Image
                source={{ uri: `${URL.BASE_URL}/${user?.profilePicture}` }}
                resizeMode="contain"
                style={{ width: '85%', height: '85%' }}
              />
            </View>
          </View>
        </View>
        {/* <Pressable style={{ alignSelf: 'center' }}>
          <Text style={{ ...FONTS.h3, color: COLORS.additionalColor2 }}>
            Ganti Avatar
          </Text>
        </Pressable> */}

        {/* form container */}
        <View style={{ marginTop: SIZES.padding }}>
          <FormControl
            label="username"
            onChange={(e) => setUsername(e)}
            value={username}
            editable={false}
          />
          <FormControl
            label="password"
            containerStyle={{ marginTop: SIZES.radius }}
            onChange={(e) => setPassword(e)}
            editable={false}
            secureTextEntry={true}
            value={password}
          />
        </View>

        <CustomBtn
          label="Logout"
          containerStyle={{
            marginTop: SIZES.padding,
            backgroundColor: COLORS.primary2,
          }}
          onPress={handleLogout}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Setting;
