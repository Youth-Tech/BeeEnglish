import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const RightArrowIcon = (props: SvgProps) => (
  <Svg width={12} height={12} viewBox="0 0 12 12" fill="none" {...props}>
    <Path
      d="M2.5 6H9.5M9.5 6L6 2.5M9.5 6L6 9.5"
      stroke="#171725"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default RightArrowIcon;
