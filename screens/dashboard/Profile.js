import { useState } from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { COLORS, dummyData, FONTS, images, SIZES, URL } from '../../constants';
import { convertDate } from '../../utils/date';

const Profile = ({ navigation }) => {
  const [statistic, setStatistic] = useState(true);
  const { user } = useSelector((state) => state.user);

  const statisticData = [
    {
      id: 0,
      logo: require('../../assets/images/point.png'),
      title: user?.xpPoint,
      subtitle: 'Xp point',
    },
    {
      id: 1,
      logo: require('../../assets/images/trophy.png'),
      title: user?.rangking ? user?.rangking : '-',
      subtitle: 'Rangking',
    },
    {
      id: 2,
      logo: require('../../assets/images/medal.png'),
      title: user?.achievement.length,
      subtitle: 'Achievement',
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, paddingHorizontal: SIZES.radius }}
      >
        {/* header */}
        <TouchableOpacity
          style={{ alignItems: 'flex-end', marginTop: SIZES.padding }}
          onPress={() =>
            navigation.navigate('setting', {
              curUsername: user?.username,
              curPassword: user?.password,
            })
          }
        >
          <Ionicons name="settings-outline" size={24} />
        </TouchableOpacity>

        <View style={{ alignItems: 'center', marginTop: SIZES.padding }}>
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
          {/* description */}
          <Text style={{ ...FONTS.h3, marginTop: SIZES.radius }}>
            {user?.username}
          </Text>
          <Text style={{ ...FONTS.body5, marginTop: SIZES.base }}>
            Bergabung pada
          </Text>
          <Text style={{ ...FONTS.body4, fontWeight: 'bold' }}>
            {convertDate(user?.createdAt)}
          </Text>
        </View>

        {/* statistic */}
        <View style={{ marginTop: SIZES.padding, alignItems: 'center' }}>
          {/* navigation */}
          <View
            style={{
              height: 50,
              backgroundColor: COLORS.white,
              width: '100%',
              borderRadius: SIZES.radius,
              flexDirection: 'row',
              overflow: 'hidden',
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: statistic ? COLORS.secondary2 : COLORS.white,
              }}
              onPress={() => setStatistic(true)}
            >
              <Text style={{ ...FONTS.body4, fontWeight: '700' }}>
                Statistic
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: statistic ? COLORS.white : COLORS.secondary2,
              }}
              onPress={() => setStatistic(false)}
            >
              <Text style={{ ...FONTS.body4, fontWeight: '700' }}>
                Achievement
              </Text>
            </TouchableOpacity>
          </View>

          {/* container */}
          <View
            style={{
              backgroundColor: COLORS.white,
              width: '100%',
              flexDirection: 'row',
              flexWrap: 'wrap',
              paddingHorizontal: SIZES.padding,
              marginVertical: SIZES.padding,
              borderRadius: SIZES.radius,
              paddingVertical: SIZES.radius,
            }}
          >
            {statistic
              ? statisticData.map((el, idx) => (
                  <View
                    key={idx}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      width: '50%',
                      marginVertical: SIZES.radius,
                    }}
                  >
                    <Image
                      source={el.logo}
                      resizeMode="contain"
                      style={{ width: 40, height: 40, marginRight: SIZES.base }}
                    />
                    <View>
                      <Text style={{ ...FONTS.h3 }}>{el.title}</Text>
                      <Text style={{ ...FONTS.body5 }}>{el.subtitle}</Text>
                    </View>
                  </View>
                ))
              : dummyData.achievement.map((el, idx) => (
                  <View
                    key={idx}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      width: '100%',
                      marginVertical: SIZES.radius,
                    }}
                  >
                    <Image
                      source={el.logo}
                      resizeMode="contain"
                      style={{
                        width: 40,
                        height: 40,
                        marginRight: SIZES.padding,
                      }}
                    />
                    <View style={{ flex: 1 }}>
                      <Text style={{ ...FONTS.h3 }}>{el.title}</Text>
                      <Text style={{ ...FONTS.body5 }}>{el.description}</Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#00000010',
                        padding: SIZES.radius,
                        paddingHorizontal: SIZES.padding,
                        borderRadius: SIZES.radius,
                      }}
                    >
                      <Text style={{ ...FONTS.h5, color: '#00000070' }}>
                        Claim
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
