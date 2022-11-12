import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { PickCharCard } from '../../components';
import AuthLayout from './AuthLayout';
import { images, SIZES, dummyData } from '../../constants';
import { useState } from 'react';

const SelectIcon = ({ navigation }) => {
  const [icon, setIcon] = useState(0);

  return (
    <AuthLayout
      title="Membuat"
      titleBold="Akun"
      description="Select your icon"
      onBackBtn={() => navigation.goBack()}
      labelBtn="Next"
      onPressBtn={() => navigation.navigate('Dashboard')}
    >
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.padding * 3,
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <PickCharCard
            containerStyle={{ marginHorizontal: SIZES.base }}
            icon={true}
            size={120}
          />
          {dummyData.maleCharIcons.map((el, idx) => (
            <PickCharCard
              key={el.id}
              source={el.icon}
              containerStyle={{ marginHorizontal: SIZES.base }}
              active={icon === el.id}
              onPress={() => setIcon(el.id)}
              size={120}
            />
          ))}
        </View>
      </KeyboardAwareScrollView>
    </AuthLayout>
  );
};

export default SelectIcon;
