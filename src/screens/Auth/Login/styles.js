import { StyleSheet } from 'react-native';
import { hp, wp } from '@utils';

const createStyles = theme => {
  const styles = StyleSheet.create({
    mainContainer: {
      flexGrow: 1,
      backgroundColor: theme.color.primaryColor,
    },
    statusBar: {
      backgroundColor: theme.color.primaryColor,
    },
    headerBackgroundColor: theme.color.primaryColor,
    innerContainer: {
      marginHorizontal: wp(4),
    },
    logoStyle: {
      height: wp(10),
      width: wp(40),
      alignSelf: 'center',
      marginVertical: hp(1),
    },
    subText: {
      alignSelf: 'center',
      marginBottom: hp(6),
    },
    loginBtn: {
      marginTop: hp(6),
    },
    eyeColor: theme.color.iconColor,
    eyeSize: hp(2.5),
  });
  return styles;
};
export default createStyles;
