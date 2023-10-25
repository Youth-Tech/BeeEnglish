import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
export const Translate = (props: SvgProps) => (
    <Svg
        width={20}
        height={20}
        fill="none"
        {...props}
    >
        <Path
            fill={props.color || "#E5E5E5"}
            d="M5.681 8.393 5.138 10H3.75l2.327-6.25h1.606L10 10H8.541l-.544-1.607H5.681Zm2.043-.92-.849-2.528h-.061l-.849 2.527h1.759Z"
        />
        <Path
            fill={props.color || "#E5E5E5"}
            d="M0 2.5A2.5 2.5 0 0 1 2.5 0h8.75a2.5 2.5 0 0 1 2.5 2.5v3.75h3.75a2.5 2.5 0 0 1 2.5 2.5v8.75a2.5 2.5 0 0 1-2.5 2.5H8.75a2.5 2.5 0 0 1-2.5-2.5v-3.75H2.5a2.5 2.5 0 0 1-2.5-2.5V2.5Zm2.5-1.25A1.25 1.25 0 0 0 1.25 2.5v8.75A1.25 1.25 0 0 0 2.5 12.5h8.75a1.25 1.25 0 0 0 1.25-1.25V2.5a1.25 1.25 0 0 0-1.25-1.25H2.5Zm8.922 12.494c.242.376.503.729.788 1.057-.935.719-2.091 1.251-3.46 1.615.223.271.564.794.694 1.084 1.406-.449 2.6-1.055 3.607-1.867.972.83 2.174 1.456 3.663 1.84.166-.318.517-.842.786-1.113-1.406-.316-2.571-.867-3.525-1.605.851-.934 1.527-2.064 2.026-3.446H17.5V10h-3.75v1.309h.956c-.397 1.055-.925 1.932-1.59 2.662a7.587 7.587 0 0 1-.518-.615c-.353.226-.757.36-1.176.388Z"
        />
    </Svg>
)