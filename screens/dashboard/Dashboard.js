import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Leaderboard, Profile, Playground } from '../../screens';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNetInfo } from '@react-native-community/netinfo';

const Dashboard = () => {
  const netinfo = useNetInfo();
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Leaderboard') {
            iconName = focused ? 'trophy' : 'trophy';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person';
          } else if (route.name === 'Playground') {
            iconName = focused
              ? 'people-circle-outline'
              : 'people-circle-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={24} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          paddingHorizontal: 16,
          backgroundColor: '#fefcfa',
        },
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Playground" component={Playground} />
      <Tab.Screen name="Leaderboard" component={Leaderboard} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default Dashboard;
