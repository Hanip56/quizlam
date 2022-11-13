import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Text,
  ImageBackground,
  SafeAreaView,
  View,
  Image,
  FlatList,
} from 'react-native';
import { COLORS, FONTS, images, SIZES, dummyData, URL } from '../../constants';

const Leaderboard = () => {
  const [userRangked, setUserRangked] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${URL.BASE_URL}/api/user/rangking`);

      if (res.data) {
        setUserRangked(res.data);
      }
    };
    fetchUser();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        style={{ flex: 1 }}
        source={images.leaderboardBg}
        resizeMode="cover"
      >
        <View
          style={{
            height: 140,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            padding: SIZES.padding,
          }}
        >
          <View style={{}}>
            <Text style={{ ...FONTS.h5 }}>Your rank</Text>
            <Text
              style={{ textAlign: 'center', ...FONTS.h3, color: COLORS.white }}
            >
              -
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.bg,
            borderTopRightRadius: SIZES.padding * 2,
            borderTopLeftRadius: SIZES.padding * 2,
          }}
        >
          {/* header */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: COLORS.secondary2,
              paddingVertical: SIZES.radius,
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ ...FONTS.body4 }}>Rangking</Text>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ ...FONTS.body4 }}>Point</Text>
            </View>
          </View>

          {/* list */}
          <FlatList
            data={userRangked}
            keyExtractor={(item) => item._id}
            ItemSeparatorComponent={
              <View
                style={{
                  justifyContent: 'center',
                  width: '100%',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    backgroundColor: COLORS.additionalColor,
                    width: '90%',
                    height: 2,
                  }}
                />
              </View>
            }
            renderItem={({ item, index }) => (
              <View
                style={{ flexDirection: 'row', paddingVertical: SIZES.radius }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 2.3,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      textAlign: 'center',
                      ...FONTS.body4,
                      width: 55,
                    }}
                  >
                    {index + 1}
                  </Text>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      backgroundColor: COLORS.primary2,
                      borderRadius: 25,
                      overflow: 'hidden',
                      marginRight: SIZES.padding,
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
                        source={{
                          uri: `${URL.BASE_URL}/${item?.profilePicture}`,
                        }}
                        resizeMode="contain"
                        style={{ width: '85%', height: '85%' }}
                      />
                    </View>
                  </View>
                  <Text style={{ ...FONTS.body4, flex: 1 }}>
                    {item.username}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}
                >
                  <Text style={{ ...FONTS.body4 }}>{item.xpPoint}</Text>
                </View>
              </View>
            )}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Leaderboard;
