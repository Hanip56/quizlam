import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { COLORS, FONTS, images, SIZES, URL } from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import { FormModal, QuestionUpdateModal } from '../components';
import { useSelector } from 'react-redux';
import axios from 'axios';

const MakeQuestion = ({ route, navigation }) => {
  const { groupCode } = route.params;
  const [questionList, setQuestionList] = useState([]);
  const [pertanyaan, setPertanyaan] = useState('');
  const [jawabanBenar, setJawabanBenar] = useState('');
  const [jawabanSalah, setJawabanSalah] = useState([]);

  const [message, setMessage] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(undefined);
  const { user, token } = useSelector((state) => state.user);

  const handleTambahPertanyaan = async () => {
    if (!pertanyaan || !jawabanBenar || jawabanSalah.length < 3) {
      setMessage('Harap isi semua kolom');
      return;
    }

    try {
      const res = await axios.post(
        `${URL.BASE_URL}/api/questions`,
        {
          author: user?._id,
          groupCode: groupCode?._id,
          question: pertanyaan,
          correctAnswer: jawabanBenar,
          incorrectAnswer: jawabanSalah,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQuestionList((prev) => [...prev, res.data]);
      setShowModal(false);
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

  const deleteFunc = async () => {
    try {
      const res = await axios.delete(
        `${URL.BASE_URL}/api/group-code/${groupCode?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('fired');
      // setYourQuizList((prev) =>
      //   prev.filter((question) => question._id !== res.data)
      // );
      navigation.goBack();
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

  const handleDelete = async () => {
    Alert.alert('Hapus quiz?', 'quiz ini akan terhapus', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'Ok', onPress: () => deleteFunc() },
    ]);
  };

  useEffect(() => {
    const fetchQuestionList = async () => {
      try {
        const res = await axios.get(
          `${URL.BASE_URL}/api/questions/group/${groupCode?._id}`
        );

        //   here
        setQuestionList(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuestionList();
  }, []);

  const handleClickedQuestion = (question) => {
    setShowModalUpdate(question);
  };

  return (
    <View style={{ flex: 1 }}>
      <Modal isVisible={showModal} backdropColor="#00000080">
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <ScrollView
            style={{
              backgroundColor: COLORS.white,
              width: '100%',
              padding: SIZES.radius,
              borderRadius: SIZES.radius,
            }}
          >
            <Text style={{ ...FONTS.h3, marginBottom: SIZES.radius }}>
              Tambah pertanyaan
            </Text>
            {message && (
              <View
                style={{
                  width: '100%',
                  paddingVertical: SIZES.base,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: SIZES.base,
                }}
              >
                <Text style={{ ...FONTS.body5, color: 'red' }}>{message}</Text>
              </View>
            )}
            <FormModal
              placeholder="Pertanyaan"
              numberOfLines={3}
              backgroundColor={COLORS.transparent1}
              onChangeText={(text) => setPertanyaan(text)}
            />
            <FormModal
              placeholder="Jawaban benar"
              backgroundColor={COLORS.transparent2}
              onChangeText={(text) => setJawabanBenar(text)}
            />
            <FormModal
              placeholder="Jawaban salah"
              onChangeText={(text) =>
                setJawabanSalah((prev) => {
                  const newArr = [...prev];
                  newArr[0] = text;
                  return newArr;
                })
              }
            />
            <FormModal
              placeholder="Jawaban salah"
              onChangeText={(text) =>
                setJawabanSalah((prev) => {
                  const newArr = [...prev];
                  newArr[1] = text;
                  return newArr;
                })
              }
            />
            <FormModal
              placeholder="Jawaban salah"
              onChangeText={(text) =>
                setJawabanSalah((prev) => {
                  const newArr = [...prev];
                  newArr[2] = text;
                  return newArr;
                })
              }
            />

            <View style={{ flexDirection: 'row', marginTop: SIZES.padding }}>
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.additionalColor4,
                  paddingVertical: SIZES.base,
                  borderRadius: SIZES.radius,
                  flex: 1,
                  marginRight: SIZES.base,
                }}
                onPress={() => setShowModal(false)}
              >
                <Text
                  style={{
                    ...FONTS.h4,
                    textAlign: 'center',
                    color: COLORS.white,
                  }}
                >
                  batal
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.additionalColor2,
                  paddingVertical: SIZES.base,
                  borderRadius: SIZES.radius,
                  flex: 1,
                  marginLeft: SIZES.base,
                }}
                onPress={handleTambahPertanyaan}
              >
                <Text
                  style={{
                    ...FONTS.h4,
                    textAlign: 'center',
                    color: COLORS.white,
                  }}
                >
                  tambah
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>

      <QuestionUpdateModal
        item={showModalUpdate}
        setShowModal={setShowModalUpdate}
        showModal={showModalUpdate}
        setQuestionList={setQuestionList}
      />
      <ImageBackground
        source={images.leaderboardBg}
        style={{
          height: 140,
          width: SIZES.width,
          padding: SIZES.padding,
        }}
        imageStyle={{
          resizeMode: 'cover',
          borderBottomLeftRadius: SIZES.padding * 2,
          borderBottomRightRadius: SIZES.padding * 2,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ ...FONTS.h2, color: COLORS.white }}>
            {groupCode?.name}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.text,
              width: 40,
              height: 40,
              marginLeft: SIZES.base,
              borderRadius: SIZES.radius,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={handleDelete}
          >
            <Ionicons name="trash" size={20} color={COLORS.bg} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ ...FONTS.body5, color: COLORS.white }}>Code : </Text>
          <Text
            style={{
              ...FONTS.body4,
              color: COLORS.white,
              alignSelf: 'flex-start',
            }}
          >
            {groupCode?.code}
          </Text>
        </View>
      </ImageBackground>
      <TouchableOpacity
        style={{
          paddingVertical: SIZES.base,
          paddingHorizontal: SIZES.padding,
          marginTop: -SIZES.padding,
          backgroundColor: COLORS.additionalColor2,
          alignSelf: 'center',
          borderRadius: SIZES.radius,
          flexDirection: 'row',
        }}
        onPress={() => setShowModal(true)}
      >
        <Text style={{ ...FONTS.h4, color: COLORS.white }}>
          Tambah pertanyaan
        </Text>
        <Ionicons
          name="add"
          size={24}
          style={{ marginLeft: SIZES.radius }}
          color={COLORS.white}
        />
      </TouchableOpacity>

      <View style={{ padding: SIZES.padding }}>
        <Text style={{ ...FONTS.h3 }}>Pertanyaan</Text>
      </View>

      <FlatList
        data={questionList}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.transparent1,
              padding: SIZES.radius,
              paddingHorizontal: SIZES.padding,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            onPress={() => handleClickedQuestion(item)}
          >
            <Text style={{ ...FONTS.h4 }}>{item.question}</Text>
            <Ionicons name="arrow-forward" size={16} />
          </TouchableOpacity>
        )}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding,
        }}
        ItemSeparatorComponent={<View style={{ height: SIZES.radius }} />}
      />
    </View>
  );
};

export default MakeQuestion;
