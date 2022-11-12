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
} from './screens';
import { COLORS } from './constants';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const App = () => {
  const Stack = createStackNavigator();

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: COLORS.bg,
    },
  };

  return (
    <Provider store={store}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="welcome" component={Welcome} />
          <Stack.Screen name="signIn" component={SignIn} />
          <Stack.Screen name="signUp" component={SignUp} />
          <Stack.Screen name="selectGender" component={SelectGender} />
          <Stack.Screen name="selectIcon" component={SelectIcon} />
          {/* Dashboard */}
          <Stack.Screen name="Dashboard" component={Dashboard} />
          {/*  Questioning */}
          <Stack.Screen name="setting" component={Setting} />
          <Stack.Screen name="questioning" component={Questioning} />
          <Stack.Screen name="finish" component={Finish} />
          <Stack.Screen name="Loading" component={Loading} />
          {/* other */}
          <Stack.Screen name="MakeQuiz" component={MakeQuiz} />
          <Stack.Screen name="MakeQuestion" component={MakeQuestion} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
