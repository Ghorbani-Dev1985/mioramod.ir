export const FONT_NAMES = {
  regular: 'peyda-regular',
  thin: 'peyda-thin',
  extralight: 'peyda-extra-light',
  light: 'peyda-light',
  medium: 'peyda-medium',
  semibold: 'peyda-semiBold',
  bold: 'peyda-bold',
  extrabold: 'peyda-extra-bold',
  black: 'peyda-black',
} as const;

export const FONTS = {
  [FONT_NAMES.regular]: require('../../../assets/fonts/peyda-regular.ttf'),
  [FONT_NAMES.thin]: require('../../../assets/fonts/peyda-thin.ttf'),
  [FONT_NAMES.extralight]: require('../../../assets/fonts/extralight/peyda-extralight.ttf'),
  [FONT_NAMES.light]: require('../../../assets/fonts/peyda-light.ttf'),
  [FONT_NAMES.medium]: require('../../../assets/fonts/peyda-medium.ttf'),
  [FONT_NAMES.semibold]: require('../../../assets/fonts/peyda-semibold.ttf'),
  [FONT_NAMES.bold]: require('../../../assets/fonts/peyda-bold.ttf'),
  [FONT_NAMES.extrabold]: require('../../../assets/fonts/peyda-extrabold.ttf'),
  [FONT_NAMES.black]: require('../../../assets/fonts/peyda-black.ttf'),
} as const;
