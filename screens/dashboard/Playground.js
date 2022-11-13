import { View, Text, TouchableOpacity, Alert, Share } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, FONTS, SIZES, URL } from '../../constants';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import { customAlphabet } from 'nanoid/non-secure';
import { useSelector } from 'react-redux';
import { CustomCard } from '../../components';

const Playground = ({ navigation }) => {
  const [stateScreen, setStateScreen] = useState(true);
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [yourQuizList, setYourQuizList] = useState([]);
  const { user, token } = useSelector((state) => state.user);

  const [nameQuiz, setNamaQuiz] = useState('');
  const [errorNamaQuiz, setErrorNamaQuiz] = useState('');
  const [errorBuatQuiz, setErrorBuatQuiz] = useState('');

  const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 6);

  const handleBuatQuiz = () => {
    setShowModal(true);
  };

  const handleMake = async () => {
    if (!nameQuiz) {
      setErrorNamaQuiz('Nama quiz harus diisi');
      return;
    }
    let result;

    try {
      const res = await axios.post(
        `${URL.BASE_URL}/api/group-code`,
        {
          author: user?._id,
          name: nameQuiz,
          code: nanoid(6),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      result = res.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      setErrorBuatQuiz(message);
      return;
    }

    setShowModal(false);
    setYourQuizList((prev) => [...prev, result]);
    navigation.navigate('MakeQuestion', { groupCode: result });
  };

  const handleMasuk = async () => {
    try {
      const res = await axios.get(`${URL.BASE_URL}/api/questions/code/${code}`);

      //   here
      navigation.navigate('questioning', {
        groupCodeId: `/group/${res.data}`,
      });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      setMessage(message);
    }
  };

  const handleCopyCode = async (code) => {
    // Clipboard.setString(code);

    try {
      const result = await Share.share({
        message: code,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const handleEdit = (item) => {
    navigation.navigate('MakeQuestion', { groupCode: item });
  };

  const deleteFunc = async (id) => {
    try {
      const res = await axios.delete(`${URL.BASE_URL}/api/group-code/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setYourQuizList((prev) =>
        prev.filter((question) => question._id !== res.data)
      );
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      setMessage(message);
      return;
    }
  };

  const handleDelete = async (id) => {
    Alert.alert('Hapus quiz?', 'quiz ini akan terhapus', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'Ok', onPress: () => deleteFunc(id) },
    ]);
  };

  useEffect(() => {
    const fetchYourQuiz = async () => {
      try {
        const res = await axios.get(
          `${URL.BASE_URL}/api/group-code?author=${user?._id}`
        );

        //   here
        setYourQuizList(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchYourQuiz();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, padding: SIZES.radius }}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ ...FONTS.h3 }}>Main Bersama Teman</Text>
      </View>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          marginTop: SIZES.padding,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: stateScreen ? COLORS.primary2 : COLORS.secondary2,
            paddingVertical: SIZES.base,
            paddingHorizontal: SIZES.padding,
            borderRadius: SIZES.radius,
            marginRight: SIZES.base,
          }}
          onPress={() => setStateScreen(true)}
        >
          <Text
            style={{
              ...FONTS.h5,
              color: COLORS.white,
            }}
          >
            Masukan Kode
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: stateScreen ? COLORS.secondary2 : COLORS.primary2,
            paddingVertical: SIZES.base,
            paddingHorizontal: SIZES.padding,
            borderRadius: SIZES.radius,
            marginLeft: SIZES.base,
          }}
          onPress={() => setStateScreen(false)}
        >
          <Text
            style={{
              ...FONTS.h5,
              color: COLORS.white,
            }}
          >
            Quiz kamu
          </Text>
        </TouchableOpacity>
      </View>

      {/* container */}
      {stateScreen && (
        <View
          style={{
            backgroundColor: COLORS.additionalColor,
            padding: SIZES.radius,
            paddingBottom: SIZES.padding,
            marginTop: SIZES.padding * 2,
            borderRadius: SIZES.radius,
          }}
        >
          {message && (
            <View style={{ marginVertical: SIZES.radius }}>
              <Text style={{ textAlign: 'center', color: 'red' }}>
                {message}
              </Text>
            </View>
          )}
          <View
            style={{
              backgroundColor: COLORS.white,
              height: 50,
              width: '100%',
              borderRadius: SIZES.radius,
            }}
          >
            <TextInput
              placeholder="Masukan kode quiz"
              style={{ paddingLeft: SIZES.radius }}
              onChangeText={(text) => setCode(text)}
              onChange={() => setMessage('')}
            />
          </View>
          <View style={{ alignItems: 'center', marginTop: SIZES.padding }}>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.primary2,
                width: 160,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: SIZES.padding,
                paddingVertical: SIZES.base,
                borderRadius: SIZES.base,
              }}
              onPress={handleMasuk}
            >
              <Text style={{ ...FONTS.h5, color: COLORS.white }}>Masuk</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {!stateScreen && (
        <View
          style={{
            paddingBottom: SIZES.padding,
            marginTop: SIZES.padding * 2,
            borderRadius: SIZES.radius,
          }}
        >
          <Modal isVisible={showModal} backdropColor="#00000070">
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  backgroundColor: COLORS.white,
                  borderRadius: SIZES.radius,
                  width: '100%',
                  padding: SIZES.radius,
                  justifyContent: 'space-between',
                }}
              >
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text style={{ ...FONTS.h4 }}>Nama quiz</Text>
                    <Text style={{ ...FONTS.body5, color: 'red' }}>
                      {errorNamaQuiz}
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: '#00000015',
                      borderRadius: SIZES.radius,
                      paddingHorizontal: SIZES.base,
                      marginVertical: SIZES.base,
                    }}
                  >
                    <TextInput
                      onChangeText={(text) => {
                        setNamaQuiz(text);
                        setErrorNamaQuiz('');
                      }}
                      placeholder="Masukan nama quiz"
                    />
                  </View>
                </View>

                {/* error buat quiz */}
                {errorBuatQuiz && (
                  <View
                    style={{
                      width: '100%',
                      paddingVertical: SIZES.radius,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: COLORS.transparent3,
                      marginTop: SIZES.base,
                    }}
                  >
                    <Text style={{ ...FONTS.h4, color: 'red' }}>
                      {errorBuatQuiz}
                    </Text>
                  </View>
                )}

                {/* button container */}
                <View
                  style={{
                    marginTop: SIZES.padding * 2,
                    flexDirection: 'row',
                  }}
                >
                  <TouchableOpacity
                    onPress={() => setShowModal(false)}
                    style={{
                      flex: 1,
                      paddingVertical: SIZES.base,
                      borderRadius: SIZES.radius,
                      backgroundColor: COLORS.additionalColor1,
                      marginRight: SIZES.base,
                    }}
                  >
                    <Text
                      style={{
                        ...FONTS.h4,
                        color: COLORS.white,
                        textAlign: 'center',
                      }}
                    >
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleMake}
                    style={{
                      flex: 1,
                      paddingVertical: SIZES.base,
                      borderRadius: SIZES.radius,
                      backgroundColor: COLORS.additionalColor2,
                      marginLeft: SIZES.base,
                    }}
                  >
                    <Text
                      style={{
                        ...FONTS.h4,
                        color: COLORS.white,
                        textAlign: 'center',
                      }}
                    >
                      Buat
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <View style={{ justifyContent: 'center' }}>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.additionalColor2,
                padding: SIZES.radius,
                borderRadius: SIZES.radius,
                flexDirection: 'row',
                justifyContent: 'center',
              }}
              onPress={handleBuatQuiz}
            >
              <Text style={{ ...FONTS.h3, color: COLORS.white }}>
                Buat quiz
              </Text>
              <Ionicons
                name="add"
                size={24}
                color={COLORS.white}
                style={{ marginLeft: SIZES.padding }}
              />
            </TouchableOpacity>
          </View>

          <Text style={{ marginTop: SIZES.radius, ...FONTS.h4 }}>
            Quiz kamu
          </Text>

          <FlatList
            data={yourQuizList}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{ paddingBottom: 160 }}
            renderItem={({ item, index }) => (
              <>
                <CustomCard
                  title={item.name}
                  subtitle={`Code : ${item.code}`}
                  bgColor={COLORS.primary}
                  arrow={false}
                  disabled={true}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: COLORS.primary,
                    justifyContent: 'flex-end',
                    padding: SIZES.radius,
                    marginTop: -SIZES.padding,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: COLORS.text,
                      width: 35,
                      height: 35,
                      borderRadius: SIZES.base,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => handleCopyCode(item.code)}
                  >
                    <Ionicons name="copy-sharp" size={16} color={COLORS.bg} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: COLORS.text,
                      width: 35,
                      height: 35,
                      marginLeft: SIZES.base,
                      borderRadius: SIZES.base,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => handleEdit(item)}
                  >
                    <Ionicons name="create" size={20} color={COLORS.bg} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: COLORS.text,
                      width: 35,
                      height: 35,
                      marginLeft: SIZES.base,
                      borderRadius: SIZES.base,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => handleDelete(item._id)}
                  >
                    <Ionicons name="trash" size={16} color={COLORS.bg} />
                  </TouchableOpacity>
                </View>
              </>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Playground;
