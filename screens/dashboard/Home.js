import { View, Text, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, FONTS, images, SIZES, URL } from '../../constants';
import { CustomCard } from '../../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import axios from 'axios';
import url from '../../constants/url';

const Home = ({ navigation }) => {
  const { user, isLoading, isSuccess } = useSelector((state) => state.user);

  const [subjectList, setSubjectList] = useState([]);

  useEffect(() => {
    const getSubjectList = async () => {
      const res = await axios.get(
        `${url.BASE_URL}/api/group-code?author=636ba49f29255aa181c5aec1`
      );

      if (res.data) {
        setSubjectList(res.data);
      }
    };
    getSubjectList();
  }, []);

  console.log({ isLoading, isSuccess });

  return (
    <SafeAreaView style={{ flex: 1, paddingBottom: 0 }}>
      <ScrollView
        style={{
          paddingHorizontal: SIZES.padding,
          paddingBottom: SIZES.padding,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* header */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: SIZES.padding,
          }}
        >
          <View>
            <Text style={{ ...FONTS.h3 }}>👋 Halo {user?.username}</Text>
            <Text style={{ ...FONTS.body5 }}>
              Senang bisa melihatmu kembali !
            </Text>
          </View>
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: COLORS.primary2,
              borderRadius: 25,
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

        {/* kilas profil */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: COLORS.additionalColor4,
            height: 80,
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius,
            paddingHorizontal: SIZES.padding,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}
          >
            <Image
              source={images.point}
              resizeMode="contain"
              style={{ width: 40, height: 40, marginRight: SIZES.base }}
            />
            <View>
              <Text style={{ ...FONTS.h3, color: COLORS.white }}>
                {user?.xpPoint}
              </Text>
              <Text style={{ ...FONTS.body5, color: COLORS.white }}>
                Xp point
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}
          >
            <Image
              source={images.trophy}
              resizeMode="contain"
              style={{ width: 40, height: 40, marginRight: SIZES.base }}
            />
            <View>
              <Text style={{ ...FONTS.h3, color: COLORS.white }}>
                {user?.rangking ? user?.rangking : '-'}
              </Text>
              <Text style={{ ...FONTS.body5, color: COLORS.white }}>Rank</Text>
            </View>
          </View>
        </View>

        <View style={{ marginTop: SIZES.padding }}>
          <Text style={{ ...FONTS.h5 }}>
            ✍️ Jangan lewatkan hari tanpa kuis
          </Text>
          <CustomCard
            bgColor={COLORS.primary}
            arrowColor={COLORS.bg}
            title="Kuis harian"
            subtitle="Total 10 pertanyaan"
            onPress={() =>
              navigation.navigate('questioning', {
                groupCodeId: `/daily`,
              })
            }
          >
            <Image
              source={images.daily}
              resizeMode="contain"
              style={{ width: 40, height: 40, marginRight: SIZES.radius }}
            />
          </CustomCard>
        </View>
        <View style={{ marginTop: SIZES.padding }}>
          <Text style={{ ...FONTS.h5 }}>✍️ Lanjutkan belajar</Text>
          {subjectList?.map((subject) => (
            <CustomCard
              key={subject._id}
              bgColor={COLORS.additionalColor2}
              arrowColor={COLORS.bg}
              title={subject.name}
              subtitle="Total 10 pertanyaan"
              onPress={() =>
                navigation.navigate('questioning', {
                  groupCodeId: `/group/${subject._id}`,
                })
              }
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  marginRight: SIZES.radius,
                  backgroundColor: COLORS.bg,
                  borderRadius: SIZES.radius,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ ...FONTS.body2 }}>
                  {subject.name?.slice(0, 1)}
                </Text>
              </View>
            </CustomCard>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
