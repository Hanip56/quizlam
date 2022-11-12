import {
  View,
  Text,
  ImageBackground,
  Alert,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, FONTS, images, SIZES, URL } from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { Loading } from '../../components';

const Questioning = ({ navigation, route }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(undefined);
  const [correct, setCorrect] = useState(undefined);
  const [time, setTime] = useState(0);
  const [point, setPoint] = useState(0);
  const [allAnswer, setAllAnswer] = useState([]);

  const [loading, setLoading] = useState(false);
  const { groupCodeId } = route.params;

  // get question and set timer
  useEffect(() => {
    const getGroupedQuestions = async () => {
      setLoading(true);
      const res = await axios.get(
        `${URL.BASE_URL}/api/questions/${groupCodeId}`
      );

      if (res.data) {
        setQuestions(res.data?.sort(() => Math.random() - 0.5));
        setLoading(false);
      }
    };
    getGroupedQuestions();
    const intervalTime = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(intervalTime);
    };
  }, []);

  const handleClick = (idx, answer) => {
    setSelectedAnswer(idx);
    const isCorrect = answer === questions[currentQuestion]?.correctAnswer;
    if (isCorrect) {
      setPoint((prev) => prev + 10);
    }
    setCorrect(isCorrect);
  };

  const handleGoBack = () =>
    Alert.alert('Apa kamu yakin ?', 'semua progress akan terhapus', [
      {
        text: 'Batal',
      },
      { text: 'Ok', onPress: () => navigation.goBack() },
    ]);

  const handleNext = () => {
    setCurrentQuestion((prev) => prev + 1);
    setSelectedAnswer(undefined);
  };

  const handleDone = () => {
    navigation.replace('finish', { time, point });
  };

  useEffect(() => {
    if (questions.length > 0) {
      let allAnswer = [
        questions[currentQuestion]?.correctAnswer,
        ...questions[currentQuestion]?.incorrectAnswer,
      ];
      setAllAnswer(allAnswer.sort(() => Math.random() - 0.5));
    }
  }, [questions, currentQuestion]);

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground style={{ flex: 1 }} source={images.questionsBg}>
        <ScrollView>
          {/* header */}
          <View
            style={{
              flexDirection: 'row',
              padding: SIZES.padding,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity onPress={handleGoBack}>
              <Ionicons name="chevron-back" size={24} />
            </TouchableOpacity>
            <Text style={{ ...FONTS.h3 }}>
              {questions[currentQuestion]?.subject}
            </Text>
            <TouchableOpacity>
              <Text style={{ ...FONTS.body4, color: COLORS.primary2 }}>
                Skip
              </Text>
            </TouchableOpacity>
          </View>

          {/* progress bar */}
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: SIZES.padding,
            }}
          >
            {/* bar */}
            <View
              style={{
                width: '100%',
                backgroundColor: COLORS.secondary2,
                height: 10,
                borderRadius: 5,
                overflow: 'hidden',
              }}
            >
              <View
                style={{
                  width: `${(100 / questions?.length) * currentQuestion}%`,
                  height: '100%',
                  alignSelf: 'flex-start',
                  backgroundColor: COLORS.primary,
                }}
              />
            </View>
            {/* total */}
            <View
              style={{
                marginVertical: SIZES.base,
                alignSelf: 'flex-start',
                flexDirection: 'row',
              }}
            >
              <Text
                style={{
                  ...FONTS.body3,
                  color: COLORS.primary,
                  marginHorizontal: 1,
                  lineHeight: 20,
                }}
              >
                {currentQuestion + 1}
              </Text>
              <Text style={{ ...FONTS.body5, color: COLORS.primary2 }}>
                /{questions?.length}
              </Text>
            </View>
          </View>

          {/* question container */}
          <View style={{ paddingHorizontal: SIZES.padding }}>
            <Text style={{ ...FONTS.h2 }}>
              {questions[currentQuestion]?.question}
            </Text>
            {/* answer container */}
            <View>
              {allAnswer?.map((answer, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={{
                    backgroundColor:
                      selectedAnswer === idx
                        ? correct
                          ? COLORS.primary
                          : COLORS.additionalColor1
                        : COLORS.additionalColor4,
                    marginTop: SIZES.padding,
                    padding: SIZES.radius,
                    paddingHorizontal: SIZES.padding,
                    borderRadius: SIZES.radius,
                  }}
                  onPress={() => handleClick(idx, answer)}
                  disabled={selectedAnswer !== undefined}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        ...FONTS.body4,
                        color: COLORS.bg,
                      }}
                    >
                      {answer}
                    </Text>
                    <Ionicons
                      name={
                        selectedAnswer === idx
                          ? correct
                            ? 'checkmark'
                            : 'close'
                          : 'chevron-forward'
                      }
                      size={24}
                      color={COLORS.bg}
                    />
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* button Container */}
            {selectedAnswer !== undefined && (
              <View
                style={{
                  marginTop: SIZES.padding,
                  marginBottom: SIZES.padding,
                }}
              >
                <TouchableOpacity
                  style={{
                    padding: SIZES.radius,
                    paddingHorizontal: SIZES.padding,
                    backgroundColor: COLORS.primary,
                    borderRadius: SIZES.radius,
                    alignSelf: 'flex-end',
                  }}
                  onPress={
                    currentQuestion < questions?.length - 1
                      ? handleNext
                      : handleDone
                  }
                >
                  <Text
                    style={{
                      ...FONTS.h4,
                      color: COLORS.bg,
                    }}
                  >
                    {currentQuestion < questions?.length - 1
                      ? 'selanjutnya'
                      : 'selesai'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Questioning;
