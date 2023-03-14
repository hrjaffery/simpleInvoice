import { borders, colors, fontsSize } from '@constants';

const DEFAULT_DARK_COLOR_THEME = {
  primaryColor: colors.white,
  primaryText: colors.black,
  secondaryText: colors.white,
  errorText: colors.red,
  placeholderText: colors.lightSilver,
  borderColor: colors.lightSilver,
  primaryButton: colors.palatinateBlue,
  disableButton: colors.lightSilver,
  buttonText: colors.white,
  snackbarError: colors.red,
  snackbarSuccess: colors.green,
  iconColor: colors.black,
  headerColor: colors.antiqueWhite,
  disabledInput: colors.offWhiteGray,
};

const FONT_SET = {
  size: {
    xsmall: fontsSize.xsmall,
    small: fontsSize.small,
    medium: fontsSize.medium,
    large: fontsSize.large,
    xlarge: fontsSize.xlarge,
  },
  family: {},
};

const BORDER_RADIUS = {
  radius1: borders.radius1,
  radius2: borders.radius2,
  radius3: borders.radius3,
  radius4: borders.radius4,
};

export const DEFAULT_DARK_THEME_ID = 'default-dark';

export const DEFAULT_DARK_THEME = {
  id: DEFAULT_DARK_THEME_ID,
  color: DEFAULT_DARK_COLOR_THEME,
  size: FONT_SET.size,
  borders: BORDER_RADIUS,
  family: FONT_SET.family,
};
