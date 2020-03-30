import { Navigation } from 'react-native-navigation'

export default function navigateTo(props, compId, page, topBar) {
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