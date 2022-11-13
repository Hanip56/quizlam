import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { URL } from '../constants';

const API_URL = `${URL.BASE_URL}/api/user`;

const register = async (data) => {
  const res = await axios.post(API_URL + '/register', data.user);

  if (res.data && data.rememberMe) {
    await AsyncStorage.setItem('@quizlam_token', res.data.token);
  }

  return res.data;
};

const login = async (data) => {
  const res = await axios.post(API_URL + '/login', data.user);

  if (res.data && data.rememberMe) {
    await AsyncStorage.setItem('@quizlam_token', res.data.token);
  }

  return res.data;
};

const updateUser = async (data) => {
  const res = await axios.put(API_URL + '/' + data.id, data.data, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });

  return res.data;
};

const getUser = async (token) => {
  const res = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

const AuthService = {
  register,
  updateUser,
  getUser,
  login,
};

export default AuthService;
