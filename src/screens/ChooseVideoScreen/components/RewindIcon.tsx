import * as React from 'react'
import Svg, { G, Path, Defs, ClipPath, Rect, SvgProps } from 'react-native-svg'
const RewindIcon = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <G clipPath="url(#clip0_956_5282)">
      <Path
        d="M12 5V1L7 6L12 11V7C15.31 7 18 9.69 18 13C18 16.31 15.31 19 12 19C8.69 19 6 16.31 6 13H4C4 17.42 7.58 21 12 21C16.42 21 20 17.42 20 13C20 8.58 16.42 5 12 5Z"
        fill="black"
        fillOpacity={0.54}
      />
    </G>
    <Defs>
      <ClipPath id="clip0_956_5282">
        <Rect width={24} height={24} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default RewindIcon
