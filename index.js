import {Navigation} from 'react-native-navigation';
import bottomTabs, {setRoot, registerNav} from './src/screens/Navigations';
import {AsyncStorage} from 'react-native';
import messaging from '@react-native-firebase/messaging'

console.disableYellowBox = true;

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log("BRM: ", remoteMessage)
})

registerNav();
Navigation.events().registerAppLaunchedListener(async () => {
  const token = await AsyncStorage.getItem('latestUser');
  console.log('lastest user ==>', token);
  token == null ? setRoot() : setRoot();
});