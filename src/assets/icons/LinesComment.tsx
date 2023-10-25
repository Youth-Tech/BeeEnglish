import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

const LinesComment = (props: SvgProps) => (
    <Svg
        width={37}
        height={30}
        viewBox="0 0 37 37"
        fill="none"
        {...props}
    >
        <Path
            d="M1 1C1 30.4643 20.8333 34 36 34"
            stroke="#E5E5E5"
            strokeWidth={2}
            strokeLinecap="round"
        />
    </Svg>
);
export default React.memo(LinesComment)
