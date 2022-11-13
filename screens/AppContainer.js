import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import {
  Dashboard,
  Finish,
  Loading,
  Questioning,
  SelectGender,
  SelectIcon,
  Setting,
  SignIn,
  SignUp,
  Welcome,
  MakeQuiz,
  MakeQuestion,
} from '../screens';
import { COLORS, FONTS, SIZES } from '../constants';
import { Text, View } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';

const AppContainer = () => {
  const Stack = createStackNavigator();
  const netinfo = useNetInfo();

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: COLORS.bg,
    },
  };

  return (
    <>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            options={{ headerLeft: () => null }}
            name="welcome"
            component={Welcome}
          />
          <Stack.Screen name="signIn" component={SignIn} />
          <Stack.Screen name="signUp" component={SignUp} />
          <Stack.Screen name="selectGender" component={SelectGender} />
          <Stack.Screen name="selectIcon" component={SelectIcon} />
          {/* Dashboard */}
          <Stack.Screen
            options={{ headerLeft: null }}
            name="Dashboard"
            component={Dashboard}
          />
          {/*  Questioning */}
          <Stack.Screen name="setting" component={Setting} />
          <Stack.Screen
            options={{ headerLeft: () => null }}
            name="questioning"
            component={Questioning}
          />
          <Stack.Screen name="finish" component={Finish} />
          <Stack.Screen name="Loading" component={Loading} />
          {/* other */}
          <Stack.Screen name="MakeQuiz" component={MakeQuiz} />
          <Stack.Screen name="MakeQuestion" component={MakeQuestion} />
        </Stack.Navigator>
      </NavigationContainer>
      {!netinfo.isConnected && (
        <View
          style={{
            position: 'absolute',
            bottom: 60,
            backgroundColor: COLORS.white,
            paddingVertical: SIZES.base,
            paddingHorizontal: SIZES.padding,
            alignSelf: 'center',
            borderRadius: SIZES.base,
            borderWidth: 1,
          }}
        >
          <Text style={{ ...FONTS.body5 }}>Kamu Offline</Text>
        </View>
      )}
    </>
  );
};

export default AppContainer;
