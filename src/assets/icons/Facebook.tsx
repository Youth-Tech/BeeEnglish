import * as React from "react";
import Svg, { Rect, Path, SvgProps } from "react-native-svg";
export const Facebook = (props: SvgProps) => (
    <Svg
        width={29}
        height={30}
        viewBox="0 0 29 30"
        fill="none"
        {...props}
    >
        <Rect width={28.62} height={28.62} rx={14.31} fill="#1877F2" />
        <Path
            d="M19.7373 18.4928L20.3882 14.1521H16.3163V11.3362C16.3163 10.1473 16.884 8.98971 18.7077 8.98971H20.5601V5.29347C19.4731 5.11382 18.3747 5.01574 17.2737 5C13.9188 5 11.7281 7.07933 11.7281 10.8425V14.1514H8V18.4928H11.7281V28.9871C13.2483 29.2295 14.7961 29.2295 16.3163 28.9871V18.4928H19.7373Z"
            fill="white"
        />
    </Svg>
);

