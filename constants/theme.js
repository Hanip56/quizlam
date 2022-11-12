import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const COLORS = {
  primary: '#55b286', // green
  secondary: '#55b28660', // green 60%
  primary2: '#f0745c', // orange
  secondary2: '#f0745c60', // orange 60%
  primary3: '#612d12', // brown
  secondary3: '#e4543b', // brown bold

  text: '#454754', // black
  bg: '#fefaf4',
  charsBgActive: '#bfc1d0',
  charsBgUnactive: '#bfc1d060',
  input: '#fef1e6',

  additionalColor: '#f7e5ce', // cream
  additionalColor1: '#ef755d', // red
  additionalColor2: '#57a7dc', // lightblue
  additionalColor3: '#8764ab', // purple
  additionalColor4: '#ec8841', // orange

  white: '#FFFFFF',
  black: '000000',

  transparent1: '#57a7dc20',
  transparent2: '#55b28620',
  transparent3: '#ef755d20',
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  largeTitle: 40,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  h5: 12,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  largeTitle: { fontFamily: 'Poppins-Black', fontSize: SIZES.largeTitle },
  h1: {
    fontFamily: 'Poppins-Black',
    fontSize: SIZES.h1,
    lineHeight: 36,
    color: '#454754',
  },
  h2: {
    fontFamily: 'Poppins-Bold',
    fontSize: SIZES.h2,
    lineHeight: 30,
    color: '#454754',
  },
  h3: {
    fontFamily: 'Poppins-Bold',
    fontSize: SIZES.h3,
    lineHeight: 22,
    color: '#454754',
  },
  h4: {
    fontFamily: 'Poppins-Bold',
    fontSize: SIZES.h4,
    lineHeight: 22,
    color: '#454754',
  },
  h5: {
    fontFamily: 'Poppins-Bold',
    fontSize: SIZES.h5,
    lineHeight: 22,
    color: '#454754',
  },
  body1: {
    fontFamily: 'Poppins-Regular',
    fontSize: SIZES.body1,
    lineHeight: 36,
    color: '#454754',
  },
  body2: {
    fontFamily: 'Poppins-Regular',
    fontSize: SIZES.body2,
    lineHeight: 30,
    color: '#454754',
  },
  body3: {
    fontFamily: 'Poppins-Regular',
    fontSize: SIZES.body3,
    lineHeight: 22,
    color: '#454754',
  },
  body4: {
    fontFamily: 'Poppins-Regular',
    fontSize: SIZES.body4,
    lineHeight: 22,
    color: '#454754',
  },
  body5: {
    fontFamily: 'Poppins-Regular',
    fontSize: SIZES.body5,
    lineHeight: 22,
    color: '#454754',
  },
};

const appTheme = {
  COLORS,
  SIZES,
  FONTS,
};

export default appTheme;
