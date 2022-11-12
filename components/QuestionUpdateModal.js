import axios from 'axios';
import { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';
import { COLORS, FONTS, SIZES, URL } from '../constants';
import FormModal from './FormModal';

const QuestionUpdateModal = ({
  showModal,
  setShowModal,
  item,
  setQuestionList,
}) => {
  const [message, setMessage] = useState('');
  const [pertanyaan, setPertanyaan] = useState('');
  const [jawabanBenar, setJawabanBenar] = useState('');
  const [jawabanSalah, setJawabanSalah] = useState('');
  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    setPertanyaan(item?.question);
    setJawabanBenar(item?.correctAnswer);
    setJawabanSalah(item?.incorrectAnswer);
  }, [item]);

  let jawabanSalah1;
  let jawabanSalah2;
  let jawabanSalah3;

  if (item?.incorrectAnswer) {
    jawabanSalah1 = item.incorrectAnswer[0];
    jawabanSalah2 = item.incorrectAnswer[1];
    jawabanSalah3 = item.incorrectAnswer[2];
  }

  console.log({ pertanyaan, jawabanBenar, jawabanSalah });

  const handleEditPertanyaan = async () => {
    if (!pertanyaan || !jawabanBenar || jawabanSalah?.length < 3) {
      setMessage('Harap isi semua kolom');
      return;
    }

    try {
      const res = await axios.put(
        `${URL.BASE_URL}/api/questions/${item?._id}`,
        {
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

      setQuestionList((prev) =>
        prev.map((question) =>
          question?._id === item?._id ? res.data : question
        )
      );
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

  return (
    <Modal isVisible={showModal ? true : false} backdropColor="#00000080">
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
            Edit pertanyaan
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
            defaultValue={item?.question}
          />
          <FormModal
            placeholder="Jawaban benar"
            backgroundColor={COLORS.transparent2}
            onChangeText={(text) => setJawabanBenar(text)}
            defaultValue={item?.correctAnswer}
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
            defaultValue={jawabanSalah1}
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
            defaultValue={jawabanSalah2}
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
            defaultValue={jawabanSalah3}
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
              onPress={handleEditPertanyaan}
            >
              <Text
                style={{
                  ...FONTS.h4,
                  textAlign: 'center',
                  color: COLORS.white,
                }}
              >
                Edit
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default QuestionUpdateModal;
