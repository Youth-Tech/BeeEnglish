import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { RootStackParamList } from './routes'
import { HomeScreen, ProfileUserScreen } from '@screens'
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
      initialRouteName={"PROFILE_SCREEN"}
      screenOptions={screenOptions}
      tabBar={(props) => <CustomBottomNavigation {...props} />}
    >
      <Tab.Screen name="HOME_SCREEN" component={HomeScreen} />
      <Tab.Screen name="LEARNING_SCREEN" component={HomeScreen} />
      <Tab.Screen name="GAME_SCREEN" component={HomeScreen} />
      <Tab.Screen name="PROFILE_SCREEN" component={ProfileUserScreen} />
    </Tab.Navigator>
  )
}
