import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
const BackButton = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M15 18L9 12L15 6"
      stroke={props.stroke}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)
export default BackButton
