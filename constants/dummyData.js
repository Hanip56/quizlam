const maleCharIcons = [
  {
    id: 0,
    icon: require('../assets/images/rgIconQuizApp.png'),
  },
];
const femaleCharIcons = [
  {
    id: 0,
    icon: require('../assets/images/ugIconQuizApp.png'),
  },
];

const userData = {
  id: 123456789,
  username: 'Kingkilaban11',
  dateJoin: '1 November 2022',
  achievement: [],
  profilePicture: require('../assets/images/rgIconQuizApp.png'),
  lastSubject: 'Mustholah Hadits',
  totalXp: 2100,
  rankPosition: 11,
};

const quizList = [
  {
    id: 0,
    subject: 'Mustholah Hadits',
    description: '10 questions',
  },
  {
    id: 1,
    subject: 'Tarikh',
    description: '10 questions',
  },
  {
    id: 3,
    subject: 'Fiqih',
    description: '10 questions',
  },
];

const dailyQuiz = {
  id: 15,
  subject: 'Fiqih',
  description: '10 Mixed questions',
};

const questions = [];

const rangkingList = [
  {
    id: 0,
    ranking: 1,
    profilePicture: require('../assets/images/rgIconQuizApp.png'),
    point: '2000',
    name: 'Kingkilaban',
  },
  {
    id: 1,
    ranking: 2,
    profilePicture: require('../assets/images/ugIconQuizApp.png'),
    point: '1500',
    name: 'leaf',
  },
  {
    id: 2,
    ranking: 3,
    profilePicture: require('../assets/images/ugIconQuizApp.png'),
    point: '1200',
    name: 'rock',
  },
  {
    id: 3,
    ranking: 3,
    profilePicture: require('../assets/images/ugIconQuizApp.png'),
    point: '1200',
    name: 'rock',
  },
  {
    id: 4,
    ranking: 3,
    profilePicture: require('../assets/images/ugIconQuizApp.png'),
    point: '1200',
    name: 'rock',
  },
  {
    id: 5,
    ranking: 3,
    profilePicture: require('../assets/images/ugIconQuizApp.png'),
    point: '1200',
    name: 'rock',
  },
  {
    id: 6,
    ranking: 3,
    profilePicture: require('../assets/images/ugIconQuizApp.png'),
    point: '1200',
    name: 'rock',
  },
  {
    id: 7,
    ranking: 3,
    profilePicture: require('../assets/images/ugIconQuizApp.png'),
    point: '1200',
    name: 'rock',
  },
  {
    id: 8,
    ranking: 3,
    profilePicture: require('../assets/images/ugIconQuizApp.png'),
    point: '1200',
    name: 'rock',
  },
  {
    id: 9,
    ranking: 3,
    profilePicture: require('../assets/images/ugIconQuizApp.png'),
    point: '1200',
    name: 'rock',
  },
  {
    id: 10,
    ranking: 3,
    profilePicture: require('../assets/images/ugIconQuizApp.png'),
    point: '1200',
    name: 'rock',
  },
];

const statistic = [
  {
    id: 0,
    logo: require('../assets/images/point.png'),
    title: 2300,
    subtitle: 'Xp point',
  },
  {
    id: 1,
    logo: require('../assets/images/trophy.png'),
    title: 13,
    subtitle: 'Rangking',
  },
  {
    id: 2,
    logo: require('../assets/images/medal.png'),
    title: 33,
    subtitle: 'Achievement',
  },
];

const achievement = [
  {
    id: 0,
    logo: require('../assets/images/point.png'),
    title: 'Teladan',
    description: 'Get 2000 Xp point',
    achieved: false,
  },
];

// const mustholahQuiz = [
//   {
//     id: 0,
//     matpel: 'Mustholah Hadits',
//     difficulty: 'easy',
//     question: 'Apa manfaat ilmu Mustholah Hadits?',
//     correct_answer:
//       'Bisa membedakan hadits yang shahih dari hadits-hadits yang lemah',
//     incorrect_answer: [
//       'Mengetahui tata cara beribadah',
//       'Bisa membagi waris sesuai dengan kaidah',
//       'Mengetahui makna-makna dalam bahasa arab',
//     ],
//   },
//   {
//     id: 1,
//     matpel: 'Mustholah Hadits',
//     difficulty: 'easy',
//     question: 'Apa itu Hadits?',
//     correct_answer:
//       'Apa-apa yang datang dari Nabi SAW yang berupa perkataan, perbuatan atau ketetapan',
//     incorrect_answer: [
//       'Sejarah perkembangan islam',
//       'Tata cara sholat',
//       "Apa-apa yang dinukil dari nabi SAW, atau yang lainnya dari sahabat atau tabi'in, hingga orang setelah mereka",
//     ],
//   },
//   {
//     id: 2,
//     matpel: 'Mustholah Hadits',
//     difficulty: 'easy',
//     question: 'Apa yang disebut Al-Muhaddits?',
//     correct_answer: 'Orang yang menyibukan diri dengan ilmu hadits',
//     incorrect_answer: [
//       'Orang yang menyibukan diri dengan tarikh',
//       'Orang yang menyukai hadits',
//       'Orang yang tidak menyukai hadits',
//     ],
//   },
// ];
const mustholahQuiz = [
  {
    id: 0,
    matpel: 'Mustholah Hadits',
    difficulty: 'easy',
    question: 'apa artinya al humajah',
    correct_answer: 'pengumpat',
    incorrect_answer: [
      'waktu shubuh',
      'kuda perang yang berlari kencang',
      'manusia',
    ],
  },
  {
    id: 1,
    matpel: 'Mustholah Hadits',
    difficulty: 'easy',
    question: 'apa artinya al fill',
    correct_answer: 'Gajah',
    incorrect_answer: ['Rusa', 'Manusia', 'Gejolak api'],
  },
  {
    id: 2,
    matpel: 'Mustholah Hadits',
    difficulty: 'easy',
    question: 'Apa arti Al Qoriah',
    correct_answer: 'Hari kiamat',
    incorrect_answer: ['Hari kebebasan', 'Gua', 'Gajah'],
  },
];

export default {
  maleCharIcons,
  femaleCharIcons,
  userData,
  quizList,
  dailyQuiz,
  rangkingList,
  statistic,
  mustholahQuiz,
  achievement,
};
