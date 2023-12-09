import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
const NextIcon = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M9 18L15 12L9 6"
      stroke={props.stroke}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)
export default NextIcon
