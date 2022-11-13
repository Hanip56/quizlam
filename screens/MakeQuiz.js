import { Text } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { SIZES } from '../constants';

const MakeQuiz = () => {
  return (
    <ScrollView style={{ flex: 1, padding: SIZES.radius }}>
      <Text>MakeQuiz</Text>
    </ScrollView>
  );
};

export default MakeQuiz;
