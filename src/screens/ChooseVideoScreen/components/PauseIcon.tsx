import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
const PauseIcon = (props: SvgProps) => (
  <Svg width={64} height={64} viewBox="0 0 64 64" fill="none" {...props}>
    <Path
      d="M21.3334 18.1865V45.8132C21.3334 47.9199 23.6534 49.1999 25.44 48.0532L47.1467 34.2399C48.8 33.1999 48.8 30.7999 47.1467 29.7332L25.44 15.9465C23.6534 14.7999 21.3334 16.0799 21.3334 18.1865Z"
      fill="#E5E5E5"
    />
  </Svg>
)
export default PauseIcon
