import * as React from 'react'
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg'
import { memo } from 'react'

const EyeOnIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        d="M12 6.5a9.77 9.77 0 0 1 8.82 5.5A9.76 9.76 0 0 1 12 17.5 9.76 9.76 0 0 1 3.18 12 9.77 9.77 0 0 1 12 6.5Zm0-2C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5Zm0 5a2.5 2.5 0 0 1 0 5 2.5 2.5 0 0 1 0-5Zm0-2c-2.48 0-4.5 2.02-4.5 4.5s2.02 4.5 4.5 4.5 4.5-2.02 4.5-4.5-2.02-4.5-4.5-4.5Z"
        fill="#ACADB0"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export const EyeOn = memo(EyeOnIcon)
