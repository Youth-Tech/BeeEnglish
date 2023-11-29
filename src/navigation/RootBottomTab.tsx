import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { RootStackParamList } from './routes'
import { CustomBottomNavigation } from '@components'
import { HomeScreen, LessonMap, ProfileUserScreen } from '@screens'

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
      initialRouteName={'HOME_SCREEN'}
      tabBar={(props) => <CustomBottomNavigation {...props} />}
    >
      <Tab.Screen name="HOME_SCREEN" component={HomeScreen} />
      <Tab.Screen name="LEARNING_SCREEN" component={LessonMap} />
      {/*<Tab.Screen name="GAME_SCREEN" component={TestScreen} />*/}
      <Tab.Screen name="PROFILE_SCREEN" component={ProfileUserScreen} />
    </Tab.Navigator>
  )
}
