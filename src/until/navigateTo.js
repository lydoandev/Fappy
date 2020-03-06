import { Navigation } from 'react-native-navigation'

export default function navigateTo(props, compId, page, topBar) {
  console.log("Voo daay n  nx", page);
  
  Navigation.push(compId, {
    component: {
      name: page,
      passProps: {
        ...props
      },
      options: {
        topBar
      }
    }
  });
}