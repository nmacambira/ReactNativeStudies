import { StackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';

const RootNavigator = StackNavigator({
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerTitle: 'Home',
      },
    },
    Details: {
      screen: DetailsScreen,
      navigationOptions: {
        headerTitle: 'Details',
      },
    },
  });

export default RootNavigator;