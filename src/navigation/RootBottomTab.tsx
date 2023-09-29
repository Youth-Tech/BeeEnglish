import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { RootStackParamList } from './routes'
import { HomeScreen } from '@screens'

const Tab = createBottomTabNavigator<RootStackParamList>()

const screenOptions = {
  header: () => null,
  cardOverlayEnabled: true,
  headerShown: false,
}

export function RootBottomTab() {
  return (
    <Tab.Navigator
      initialRouteName="LEARNING_SCREEN"
      screenOptions={screenOptions}
    >
      <Tab.Screen name="HOME_SCREEN" component={HomeScreen} />
      <Tab.Screen name="LEARNING_SCREEN" component={HomeScreen} />
      <Tab.Screen name="GAME_SCREEN" component={HomeScreen} />
      <Tab.Screen name="PROFILE_SCREEN" component={HomeScreen} />
    </Tab.Navigator>
  )
}
