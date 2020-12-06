import { StyleSheet } from 'react-native';
import theme from './theme';

 export const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingTop: theme.SIZES.BASE * 0.3,
      paddingHorizontal: theme.SIZES.BASE,
      backgroundColor: theme.COLORS.WHITE,
    },
    social: {
      width: theme.SIZES.BASE * 3.5,
      height: theme.SIZES.BASE * 3.5,
      borderRadius: theme.SIZES.BASE * 1.75,
      justifyContent: 'center',
    },
    errorColor:{
      color:"red"
    }
  });