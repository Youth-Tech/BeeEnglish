import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect, SvgProps } from "react-native-svg";
const StarIcon = (props: SvgProps) => (
  <Svg width={24} height={22} viewBox="0 0 24 22" fill="none" {...props}>
    <G clipPath="url(#clip0_899_4258)">
      <Path
        d="M13.1589 1.13096L15.8658 6.11619C16.054 6.46291 16.418 6.70316 16.839 6.75868L22.8921 7.55815C23.9524 7.6983 24.3754 8.88227 23.6084 9.56161L19.2285 13.442C18.9241 13.7119 18.7849 14.1009 18.857 14.4818L19.8908 19.9611C20.072 20.9208 18.9636 21.6525 18.0155 21.1997L12.6017 18.6129C12.2252 18.4332 11.7752 18.4332 11.3987 18.6129L5.98492 21.1997C5.03674 21.6529 3.92835 20.9208 4.10958 19.9611L5.14337 14.4818C5.21546 14.1009 5.07628 13.7119 4.7719 13.442L0.391929 9.56161C-0.37503 8.88181 0.0479991 7.69784 1.10832 7.55815L7.16139 6.75868C7.58242 6.70316 7.94637 6.46291 8.13461 6.11619L10.8415 1.13096C11.3151 0.257777 12.6848 0.257777 13.1589 1.13096Z"
        fill="#92929D"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_899_4258">
        <Rect width={24} height={21.8138} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default StarIcon;
