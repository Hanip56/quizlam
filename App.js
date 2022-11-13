import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import AppContainer from './screens/AppContainer';
import NetInfo from '@react-native-community/netinfo';

const App = () => {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
    });
    // Unsubscribe;
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default App;
