export const FONT_NAMES = {
  regular: 'peyda-regular',
  thin: 'peyda-thin',
  extralight: 'peyda-extralight',
  light: 'peyda-light',
  medium: 'peyda-medium',
  semibold: 'peyda-semibold',
  bold: 'peyda-bold',
  extrabold: 'peyda-extrabold',
  black: 'peyda-black',
} as const;

export const FONTS = {
  [FONT_NAMES.regular]: require('../../../assets/fonts/peyda-regular.ttf'),
  [FONT_NAMES.thin]: require('../../../assets/fonts/peyda-thin.ttf'),
  [FONT_NAMES.extralight]: require('../../../assets/fonts/peyda-extraLight.ttf'),
  [FONT_NAMES.light]: require('../../../assets/fonts/peyda-light.ttf'),
  [FONT_NAMES.medium]: require('../../../assets/fonts/peyda-medium.ttf'),
  [FONT_NAMES.semibold]: require('../../../assets/fonts/peyda-semiBold.ttf'),
  [FONT_NAMES.bold]: require('../../../assets/fonts/peyda-bold.ttf'),
  [FONT_NAMES.extrabold]: require('../../../assets/fonts/peyda-extraBold.ttf'),
  [FONT_NAMES.black]: require('../../../assets/fonts/peyda-black.ttf'),
} as const;
