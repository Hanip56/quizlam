import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
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
