import { StyleSheet } from 'react-native';
import { hp, wp } from '@utils';

const createStyles = theme => {
  const styles = StyleSheet.create({
    mainContainer: {
      backgroundColor: theme.color.primaryColor,
    },
    innerContainer: {
      flexGrow: 1,
      marginHorizontal: wp(4),
    },
    logoStyle: {
      height: wp(10),
      width: wp(40),
      alignSelf: 'center',
      marginVertical: hp(1),
    },
    arrowColor: theme.color.iconColor,
    arrowSize: hp(3),
    subText: {
      alignSelf: 'center',
      marginVertical: hp(4),
      fontSize: theme.size.large,
    },
    createBtn: {
      marginVertical: hp(6),
    },
  });
  return styles;
};
export default createStyles;
