import Snackbar from 'react-native-snackbar';
import { colors } from '@constants';

export default function (message, error, duration) {
  Snackbar.show({
    text: message,
    textColor: colors.white,
    duration: duration == 'long' ? Snackbar.LENGTH_LONG : Snackbar.LENGTH_SHORT,
    backgroundColor: error ? colors.red : colors.antiqueWhite,
  });
}
