import * as React from 'react'
import Svg, {
  SvgProps,
  Mask,
  Path,
  G,
  ClipPath,
  Defs,
  Rect,
} from 'react-native-svg'
export const VietNamFlag = (props: SvgProps) => (
  <Svg width={45} height={34} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Mask
        id="b"
        width={45}
        height={34}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'luminance',
        }}
      >
        <Path fill="#fff" d="M.004 0h44.992v34H.004V0Z" />
      </Mask>
      <G fillRule="evenodd" clipRule="evenodd" mask="url(#b)">
        <Path fill="#DA251D" d="M-2.81 0h50.62v34H-2.81V0Z" />
        <Path
          fill="#FF0"
          d="m28.67 25.3-5.906-4.429-5.867 4.47 2.176-7.279-5.867-4.495 7.257-.067 2.255-7.265 2.287 7.245 7.257.007-5.834 4.542 2.235 7.278.006-.006Z"
        />
      </G>
    </G>
    <Defs>
      <ClipPath id="a">
        <Rect width={45} height={34} fill="#fff" rx={5} />
      </ClipPath>
    </Defs>
  </Svg>
)
