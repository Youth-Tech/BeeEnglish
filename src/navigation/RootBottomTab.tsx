import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { RootStackParamList } from './routes'
import { HomeScreen } from '@screens'
import { CustomBottomNavigation } from '@components'

const Tab = createBottomTabNavigator<RootStackParamList>()

const screenOptions = {
  header: () => null,
  cardOverlayEnabled: true,
  headerShown: false,
}
export function RootBottomTab() {
  return (
    <Tab.Navigator
    
      screenOptions={screenOptions}
      tabBar={(props) => <CustomBottomNavigation {...props} />}
    >
      <Tab.Screen name="HOME_SCREEN" component={HomeScreen} />
      <Tab.Screen name="LEARNING_SCREEN" component={HomeScreen} />
      <Tab.Screen name="GAME_SCREEN" component={HomeScreen} />
      <Tab.Screen name="PROFILE_SCREEN" component={HomeScreen} />
    </Tab.Navigator>
  )
}
