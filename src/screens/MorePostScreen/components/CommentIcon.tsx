import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
const CommentIcon = (props: SvgProps) => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M12 21C13.78 21 15.5201 20.4722 17.0001 19.4832C18.4802 18.4943 19.6337 17.0887 20.3149 15.4442C20.9961 13.7996 21.1743 11.99 20.8271 10.2442C20.4798 8.49836 19.6226 6.89472 18.364 5.63604C17.1053 4.37737 15.5016 3.5202 13.7558 3.17294C12.01 2.82567 10.2004 3.0039 8.55585 3.68509C6.91131 4.36628 5.50571 5.51983 4.51677 6.99987C3.52784 8.47991 3 10.22 3 12C3 13.488 3.36 14.89 4 16.127L3 21L7.873 20C9.109 20.639 10.513 21 12 21Z"
      stroke="#171725"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)
export default CommentIcon
