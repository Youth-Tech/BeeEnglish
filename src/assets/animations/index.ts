import { SpringConfig } from 'react-native-reanimated/lib/typescript/reanimated2/animation/springUtils'

export const withSpringConfig: SpringConfig = {
  mass: 1,
  damping: 10,
  stiffness: 50,
  overshootClamping: false,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 2,
}

export const riveAnimation = {}
