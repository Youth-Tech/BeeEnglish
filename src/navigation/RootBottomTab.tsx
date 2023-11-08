import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { RootStackParamList } from './routes'
import { CustomBottomNavigation } from '@components'
import { HomeScreen, LessonMap, ProfileUserScreen, TestScreen } from '@screens'

const Tab = createBottomTabNavigator<RootStackParamList>()

const screenOptions = {
  header: () => null,
  cardOverlayEnabled: true,
  headerShown: false,
}

export function RootBottomTab() {
  return (
    <Tab.Navigator
      initialRouteName={'PROFILE_SCREEN'}
      screenOptions={screenOptions}
      tabBar={(props) => <CustomBottomNavigation {...props} />}
    >
      <Tab.Screen name="HOME_SCREEN" component={HomeScreen} />
      <Tab.Screen name="LEARNING_SCREEN" component={LessonMap} />
      <Tab.Screen name="GAME_SCREEN" component={TestScreen} />
      <Tab.Screen name="PROFILE_SCREEN" component={ProfileUserScreen} />
    </Tab.Navigator>
  )
}
