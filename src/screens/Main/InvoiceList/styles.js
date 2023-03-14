import { StyleSheet } from 'react-native';
import { hp, wp } from '@utils';

const createStyles = theme => {
  const styles = StyleSheet.create({
    flatlistContainer: {
      flexGrow: 1,
      marginHorizontal: wp(4),
    },
    logoStyle: {
      height: wp(10),
      width: wp(40),
      alignSelf: 'center',
      marginVertical: hp(1),
    },
    plusColor: theme.color.iconColor,
    plusSize: hp(3),
    innerContainer: {
      marginVertical: hp(2),
      borderWidth: 1,
      borderColor: theme.color.borderColor,
      borderRadius: theme.borders.radius2,
      padding: wp(3),
    },
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    centerView: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    footerStyle: {
      height: hp(15),
    },
  });
  return styles;
};
export default createStyles;
