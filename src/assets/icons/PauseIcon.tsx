import * as React from 'react'
import Svg, { G, Path, Defs, ClipPath, Rect, SvgProps } from 'react-native-svg'
const PauseIcon = (props: SvgProps) => (
  <Svg
    width={props.width || 16}
    height={props.height || 16}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <G clipPath="url(#clip0_2658_4209)">
      <Path
        d="M0 2C0 1.46957 0.210714 0.960859 0.585786 0.585786C0.960859 0.210714 1.46957 0 2 0L14 0C14.5304 0 15.0391 0.210714 15.4142 0.585786C15.7893 0.960859 16 1.46957 16 2V14C16 14.5304 15.7893 15.0391 15.4142 15.4142C15.0391 15.7893 14.5304 16 14 16H2C1.46957 16 0.960859 15.7893 0.585786 15.4142C0.210714 15.0391 0 14.5304 0 14V2Z"
        fill={props.fill}
      />
    </G>
    <Defs>
      <ClipPath id="clip0_2658_4209">
        <Rect width={16} height={16} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default PauseIcon
