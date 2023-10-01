import * as React from "react"
import Svg, {SvgProps, Path, ClipPath, Defs, G} from "react-native-svg"
import {colors, ColorsMode} from "@themes";

export interface Props extends SvgProps {
    fill?: ColorsMode | string;
    stroke?: ColorsMode | string;
    strokeWidth?: number;
    size?: number;
    width?: number;
    height?: number;
}

const myColors = colors.dark;

const initialState: Props = {
    fill: myColors.black,
    stroke: myColors.black,
    size: 24,
}
const LeftArrow = (props = initialState) => {
    return (
        <Svg
            width={props.size || props.width || 24}
            height={props.size || props.height || 24}
            fill="none"
            {...props}>
            <Path
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m15 18-6-6 6-6"
            />
        </Svg>
    )
}

const RightArrow = (props = initialState) => (
    <Svg
        width={props.size || props.width || 24}
        height={props.size || props.height || 24}
        fill="none"
        {...props}
    >
        <Path
            stroke={props.stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m9 18 6-6-6-6"
        />
    </Svg>
)


const Profile = (props = initialState) => (
    <Svg
        width={props.size || props.width || 24}
        height={props.size || props.height || 24}
        fill="none"
        {...props}
    >
        <G clipPath="url(#a)">
            <Path
                stroke={props.stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h24v24H0z"/>
            </ClipPath>
        </Defs>
    </Svg>
)


const Microphone = (props = initialState) => (
    <Svg
        width={props.size || props.width || 24}
        height={props.size || props.height || 20}
        fill="none"
        {...props}
    >
        <Path
            stroke={props.stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18.316 8.333V10c0 1.547-.71 3.03-1.976 4.124-1.266 1.094-2.982 1.709-4.772 1.709m0 0c-1.79 0-3.506-.615-4.771-1.709C5.53 13.03 4.82 11.547 4.82 10V8.333m6.748 7.5v3.333m-3.856 0h7.712M11.568.833c-.767 0-1.502.263-2.045.732-.542.47-.847 1.105-.847 1.768V10c0 .663.305 1.299.847 1.767.543.47 1.278.733 2.045.733.767 0 1.503-.264 2.045-.733.543-.468.847-1.104.847-1.767V3.333c0-.663-.305-1.299-.847-1.768-.542-.469-1.278-.732-2.045-.732Z"
        />
    </Svg>
)

const SendPaper = (props = initialState) => (
    <Svg
        width={props.size || props.width || 22}
        height={props.size || props.height || 22}
        fill="none"
        {...props}
    >
        <G clipPath="url(#a)">
            <Path
                stroke={props.stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.167 1.833 10.084 11.916M20.167 1.833l-6.416 18.333-3.667-8.25M20.167 1.833 1.834 8.25l8.25 3.666"
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h22v22H0z"/>
            </ClipPath>
        </Defs>
    </Svg>
)


const Setting = (props = initialState) => (
    <Svg
        width={props.size || props.width || 22}
        height={props.size || props.height || 22}
        fill="none"
        {...props}
    >
        <G
            stroke={props.stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            clipPath="url(#a)"
        >
            <Path d="M11 13.75a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5Z"/>
            <Path
                d="M17.783 13.75a1.513 1.513 0 0 0 .302 1.669l.055.055a1.832 1.832 0 0 1 0 2.594 1.834 1.834 0 0 1-2.594 0l-.055-.055a1.512 1.512 0 0 0-1.668-.303 1.512 1.512 0 0 0-.917 1.384v.156a1.833 1.833 0 1 1-3.667 0v-.082a1.513 1.513 0 0 0-.99-1.384 1.511 1.511 0 0 0-1.668.302l-.055.055a1.835 1.835 0 1 1-2.594-2.594l.055-.055a1.512 1.512 0 0 0 .302-1.668 1.512 1.512 0 0 0-1.384-.917H2.75a1.833 1.833 0 0 1 0-3.667h.083a1.512 1.512 0 0 0 1.384-.99 1.513 1.513 0 0 0-.302-1.668l-.055-.055a1.833 1.833 0 1 1 2.594-2.594l.055.055a1.513 1.513 0 0 0 1.668.302h.073a1.513 1.513 0 0 0 .917-1.384V2.75a1.833 1.833 0 1 1 3.667 0v.083a1.513 1.513 0 0 0 .916 1.384 1.512 1.512 0 0 0 1.669-.303l.055-.055a1.833 1.833 0 1 1 2.594 2.595l-.055.055a1.513 1.513 0 0 0-.303 1.668v.073a1.512 1.512 0 0 0 1.384.917h.156a1.833 1.833 0 0 1 0 3.667h-.082a1.511 1.511 0 0 0-1.384.916Z"/>
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h22v22H0z"/>
            </ClipPath>
        </Defs>
    </Svg>
)

const MenuHeading = (props = initialState) => (
    <Svg
        width={props.size || props.width || 24}
        height={props.size || props.height || 24}
        fill="none"
        {...props}
    >
        <Path
            stroke={props.stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12h14M3 6h18M3 18h18"
        />
    </Svg>
)


const Comment = (props = initialState) => (
    <Svg
        width={props.size || props.width || 20}
        height={props.size || props.height || 20}
        fill="none"
        {...props}
    >
        <Path
            stroke={props.stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.907 16.875c4.104 0 7.43-3.078 7.43-6.875s-3.326-6.875-7.43-6.875c-4.104 0-7.43 3.078-7.43 6.875 0 1.697.664 3.25 1.765 4.449.418.455.73 1.046.553 1.638-.149.496-.396.949-.72 1.335a4.855 4.855 0 0 0 .878.078 4.9 4.9 0 0 0 2.845-.906c.668.183 1.376.281 2.109.281Z"
        />
    </Svg>
)

const MuteAudio = (props = initialState) => (
    <Svg
        width={props.size || props.width || 24}
        height={props.size || props.width || 24}
        fill="none"
        {...props}
    >
        <Path
            fill={props.fill}
            d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM17.78 9.22a.75.75 0 1 0-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 0 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L20.56 12l1.72-1.72a.75.75 0 0 0-1.06-1.06l-1.72 1.72-1.72-1.72Z"
        />
    </Svg>
)

const WaveAudio = (props = initialState) => (
    <Svg
        width={props.size || props.width || 24}
        height={props.size || props.height || 24}
        fill="none"
        {...props}
    >
        <Path
            fill={props.fill}
            d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 1 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z"
        />
        <Path
            fill={props.fill}
            d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z"
        />
    </Svg>
)

const Bookmark = (props = initialState) => (
    <Svg
        width={props.size || props.width || 20}
        height={props.size || props.height || 20}
        fill="none"
        {...props}
    >
        <Path
            fill={props.fill}
            stroke={props.stroke}
            strokeWidth={0.3}
            d="M15.2 1H4.575c-.697.01-1.36.274-1.847.735a2.347 2.347 0 0 0-.748 1.73v14.078c-.002.282.085.557.25.793.166.236.402.422.68.534.264.116.56.155.848.114a1.51 1.51 0 0 0 .77-.346l4.977-4.084a.675.675 0 0 1 .4-.13c.146 0 .287.046.4.13l4.977 4.084c.215.182.483.301.771.342.288.042.583.004.848-.11a1.53 1.53 0 0 0 .68-.534c.165-.236.252-.511.25-.793V3.464a2.282 2.282 0 0 0-.193-.94 2.433 2.433 0 0 0-.568-.8 2.653 2.653 0 0 0-.858-.536A2.815 2.815 0 0 0 15.2 1Zm1.664 16.543a.546.546 0 0 1-.093.323.61.61 0 0 1-.27.22.608.608 0 0 1-.623-.086l-4.976-4.075a1.649 1.649 0 0 0-1.014-.344c-.372 0-.73.122-1.014.344L3.897 18a.608.608 0 0 1-.623.086.61.61 0 0 1-.27-.22.545.545 0 0 1-.093-.323V3.464c-.008-.416.163-.819.475-1.12.312-.3.74-.473 1.19-.482h10.623c.45.009.878.182 1.19.483.312.3.483.703.475 1.12v14.078Z"
        />
    </Svg>
)

const Player = (props = initialState) => (
    <Svg
        width={props.size || props.width || 20}
        height={props.size || props.height || 24}
        fill="none"
        {...props}
    >
        <Path
            fill="#1D1B3E"
            d="M0 1.944v20.112c0 1.534 1.689 2.465 2.99 1.63l15.802-10.055c1.203-.757 1.203-2.505 0-3.281L2.99.313C1.689-.52 0 .41 0 1.944Z"
        />
    </Svg>
)

const RePlay = (props = initialState) => (
    <Svg
        width={props.size || props.width || 24}
        height={props.size || props.height || 24}
        fill={props.fill}
        {...props}
    >
        <G clipPath="url(#a)">
            <Path
                fill="#1D1B3E"
                d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8Z"
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h24v24H0z"/>
            </ClipPath>
        </Defs>
    </Svg>
)

const DisLike = (props = initialState) => (
    <Svg
        width={props.size || props.width || 20}
        height={props.size || props.height || 20}
        fill={props.fill}
        {...props}
    >
        <Path
            fill="#1D1B3E"
            d="M17.356 12.96c.334-.43.495-.891.474-1.366a2.11 2.11 0 0 0-.443-1.184c.221-.558.307-1.435-.433-2.117-.542-.5-1.463-.723-2.739-.66-.896.04-1.646.21-1.677.216h-.004c-.17.031-.35.069-.535.11-.014-.22.024-.767.426-2 .478-1.466.45-2.588-.088-3.338-.566-.789-1.47-.85-1.736-.85a.853.853 0 0 0-.658.302c-.379.444-.334 1.264-.287 1.642-.45 1.219-1.711 4.206-2.779 5.036-.02.014-.037.03-.054.048a3.7 3.7 0 0 0-.669 1.012 1.397 1.397 0 0 0-.675-.172H3.4c-.784 0-1.419.644-1.419 1.432v5.593c0 .791.638 1.432 1.419 1.432h2.08c.304 0 .587-.097.819-.262l.8.096c.124.018 2.306.297 4.546.252.406.03.788.048 1.143.048a7.58 7.58 0 0 0 1.585-.145c1.044-.223 1.756-.67 2.118-1.328a2.124 2.124 0 0 0 .232-1.319c.678-.619.798-1.304.774-1.786a2.343 2.343 0 0 0-.14-.692ZM3.4 17.166a.5.5 0 0 1-.498-.502v-5.597a.5.5 0 0 1 .498-.502h2.08a.5.5 0 0 1 .498.502v5.593a.5.5 0 0 1-.498.503H3.4v.003Zm13.084-4.608a.466.466 0 0 0-.061.56c0 .004.14.245.157.575.023.451-.191.85-.641 1.191a.472.472 0 0 0-.157.53c0 .004.146.458-.092.888-.229.413-.737.71-1.508.875-.617.134-1.456.158-2.486.076h-.047c-2.193.048-4.41-.241-4.433-.245H7.21l-.344-.041c.02-.097.03-.2.03-.303v-5.597a1.47 1.47 0 0 0-.064-.427c.061-.23.232-.743.634-1.18 1.531-1.225 3.028-5.36 3.093-5.538a.44.44 0 0 0 .02-.23c-.057-.386-.037-.858.045-.999.18.003.668.055.961.465.348.485.335 1.352-.04 2.502-.573 1.752-.621 2.674-.168 3.08a.738.738 0 0 0 .744.135 9.55 9.55 0 0 1 .593-.12l.044-.011c1.047-.23 2.923-.372 3.574.227.553.51.16 1.184.116 1.256a.463.463 0 0 0 .082.6c.003.003.361.344.378.801.014.307-.13.62-.426.93Z"
        />
    </Svg>
)
const Like = (props = initialState) => (
    <Svg
        width={props.size || props.width || 20}
        height={props.size || props.height || 20}
        fill="none"
        {...props}
    >
        <Path
            fill={props.fill}
            d="M3.399 17.166a.5.5 0 0 1-.498-.502v-5.597a.5.5 0 0 1 .498-.502h2.08a.5.5 0 0 1 .498.502v5.593a.5.5 0 0 1-.498.503H3.4v.003ZM16.483 12.558a.466.466 0 0 0-.061.56c0 .004.14.245.157.575.023.451-.191.85-.641 1.191a.472.472 0 0 0-.157.53c0 .004.146.458-.092.888-.229.413-.737.71-1.508.875-.617.134-1.456.158-2.486.076h-.047c-2.193.048-4.41-.241-4.433-.245H7.21l-.344-.041c.02-.097.03-.2.03-.303v-5.597a1.47 1.47 0 0 0-.064-.427c.061-.23.232-.743.634-1.18 1.531-1.225 3.028-5.36 3.093-5.538a.44.44 0 0 0 .02-.23c-.057-.386-.037-.858.045-.999.18.003.668.055.961.465.348.485.335 1.352-.04 2.502-.573 1.752-.621 2.674-.168 3.08a.738.738 0 0 0 .744.135 9.55 9.55 0 0 1 .593-.12l.044-.011c1.047-.23 2.923-.372 3.574.227.553.51.16 1.184.116 1.256a.463.463 0 0 0 .082.6h.001c.027.027.358.357.377.796v.005c.014.307-.13.62-.426.93Z"
        />
        <Path
            fill={props.fill}
            fillRule="evenodd"
            d="M17.356 12.96c.334-.43.495-.891.474-1.366a2.11 2.11 0 0 0-.443-1.184c.221-.558.307-1.435-.433-2.117-.542-.5-1.463-.723-2.739-.66a10.61 10.61 0 0 0-1.677.216h-.004c-.17.031-.35.069-.535.11-.014-.22.024-.767.426-2 .478-1.466.45-2.588-.088-3.338-.566-.789-1.47-.85-1.736-.85a.853.853 0 0 0-.658.302c-.379.444-.334 1.264-.287 1.642-.45 1.219-1.711 4.206-2.779 5.036-.02.014-.037.03-.054.048a3.7 3.7 0 0 0-.669 1.012 1.397 1.397 0 0 0-.675-.172H3.4c-.784 0-1.419.644-1.419 1.432v5.593c0 .791.638 1.432 1.419 1.432h2.08c.304 0 .587-.097.819-.262l.8.096c.124.018 2.306.297 4.546.252.406.03.788.048 1.143.048a7.58 7.58 0 0 0 1.585-.145c1.044-.223 1.756-.67 2.118-1.328a2.124 2.124 0 0 0 .232-1.319c.678-.619.798-1.304.774-1.786a2.343 2.343 0 0 0-.14-.692ZM2.901 16.664a.5.5 0 0 0 .498.502v-.003h2.08a.5.5 0 0 0 .498-.503v-5.593a.5.5 0 0 0-.498-.502H3.4a.5.5 0 0 0-.498.502v5.597Zm13.52-3.545a.466.466 0 0 1 .062-.561c.297-.31.44-.623.426-.93v-.005c-.019-.439-.35-.77-.377-.795l-.001-.002a.463.463 0 0 1-.082-.599c.044-.072.437-.746-.116-1.256-.651-.599-2.527-.458-3.573-.227l-.045.01a9.55 9.55 0 0 0-.593.12.738.738 0 0 1-.744-.134c-.453-.406-.405-1.328.168-3.08.375-1.15.388-2.017.04-2.502-.293-.41-.78-.462-.961-.465-.082.141-.102.613-.044.998a.44.44 0 0 1-.021.23c-.065.18-1.562 4.314-3.093 5.539-.402.437-.573.95-.634 1.18.04.135.065.28.065.427v5.597c0 .103-.01.206-.031.303l.344.041h.004c.024.004 2.24.293 4.433.245h.047c1.03.082 1.87.058 2.486-.076.771-.165 1.28-.462 1.508-.875.238-.43.092-.884.092-.887a.472.472 0 0 1 .157-.53c.45-.341.664-.74.64-1.191-.016-.331-.156-.572-.156-.575Z"
            clipRule="evenodd"
        />
    </Svg>
)

const Cancel = (props = initialState) => (
    <Svg
        width={props.size || props.width || 23}
        height={props.size || props.height || 24}
        fill="none"
        {...props}
    >
        <Path
            fill={props.fill}
            fillRule="evenodd"
            d="M5.24 5.47a.697.697 0 0 1 1.016 0l5.24 5.47 5.24-5.47a.697.697 0 0 1 1.017 0c.28.293.28.767 0 1.06L12.513 12l5.24 5.47c.28.293.28.767 0 1.06a.697.697 0 0 1-1.016 0l-5.24-5.47-5.241 5.47a.697.697 0 0 1-1.016 0 .773.773 0 0 1 0-1.06L10.48 12 5.24 6.53a.773.773 0 0 1 0-1.06Z"
            clipRule="evenodd"
        />
    </Svg>
)

const SendComment = (props = initialState) => (
    <Svg
        width={props.size || props.width || 25}
        height={props.size || props.height || 25}
        fill="none"
        {...props}
    >
        <Path
            fill={props.fill}
            d="M11.979 12.5H5.644h6.335Zm-6.515.83-1.047 3.127c-.573 1.712-.86 2.569-.654 3.096.179.458.562.805 1.036.937.545.152 1.368-.218 3.015-.96l10.557-4.75c1.607-.723 2.41-1.085 2.659-1.587a1.563 1.563 0 0 0 0-1.385c-.248-.502-1.052-.864-2.66-1.588L7.797 5.462c-1.642-.739-2.463-1.108-3.007-.957a1.562 1.562 0 0 0-1.036.935c-.207.526.077 1.38.644 3.09l1.069 3.22c.097.293.146.44.165.59.017.133.017.268 0 .401-.02.15-.069.296-.167.59Z"
        />
        <Path
            stroke={props.stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={0.5}
            d="M11.979 12.5H5.644m-.18.83-1.047 3.127c-.573 1.712-.86 2.569-.654 3.096.179.458.562.805 1.036.937.545.152 1.368-.218 3.015-.96l10.557-4.75c1.607-.723 2.41-1.085 2.659-1.587a1.563 1.563 0 0 0 0-1.385c-.248-.502-1.052-.864-2.66-1.588L7.797 5.462c-1.642-.739-2.463-1.108-3.007-.957a1.562 1.562 0 0 0-1.036.935c-.207.526.077 1.38.644 3.09l1.069 3.22c.097.293.146.44.165.59.017.133.017.268 0 .401-.02.15-.069.296-.167.59Z"
        />
    </Svg>
)

const PenBrush = (props = initialState) => (
    <Svg
        width={props.size || props.width || 24}
        height={props.size || props.height || 24}
        fill="none"
        {...props}
    >
        <Path
            fill={props.fill}
            fillRule="evenodd"
            d="M20.6 1.5c-.376 0-.743.111-1.056.32l-5.079 3.385a18.747 18.747 0 0 0-3.472 2.987 10.04 10.04 0 0 1 4.815 4.815 18.752 18.752 0 0 0 2.987-3.472l3.386-5.079A1.902 1.902 0 0 0 20.6 1.5Zm-8.3 14.025c.657-.365 1.29-.769 1.896-1.207a8.026 8.026 0 0 0-4.513-4.513A18.75 18.75 0 0 0 8.476 11.7l-.279.5a5.26 5.26 0 0 1 3.602 3.602l.501-.278ZM6.75 13.5A3.75 3.75 0 0 0 3 17.25a1.5 1.5 0 0 1-1.6 1.497.75.75 0 0 0-.7 1.123 5.25 5.25 0 0 0 9.8-2.62 3.75 3.75 0 0 0-3.75-3.75Z"
            clipRule="evenodd"
        />
    </Svg>
)

const Password = (props = initialState) => (
    <Svg
        width={props.size || props.width || 24}
        height={props.size || props.height || 24}
        fill="none"
        {...props}
    >
        <G clipPath="url(#a)">
            <Path
                stroke={props.stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 11V7a5 5 0 1 1 10 0v4M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z"
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h24v24H0z"/>
            </ClipPath>
        </Defs>
    </Svg>
)

const Crown = (props = initialState) => (
    <Svg
        width={props.size || props.width || 21}
        height={props.size || props.height || 14}
        fill="none"
        {...props}
    >
        <Path
            fill={props.fill}
            d="M19.605 4.231a.55.55 0 0 1-.015.167l-1.259 4.934a.57.57 0 0 1-.552.425l-7.553.037H2.67a.57.57 0 0 1-.555-.425L.856 4.416a.549.549 0 0 1-.015-.171A1.182 1.182 0 0 1 0 3.122c0-.65.539-1.178 1.202-1.178.662 0 1.201.528 1.201 1.178 0 .365-.17.692-.438.909L3.54 5.587a2.164 2.164 0 0 0 3.224-.214l2.59-3.363a1.162 1.162 0 0 1-.353-.832c0-.65.54-1.178 1.202-1.178.663 0 1.202.528 1.202 1.178 0 .314-.128.6-.334.812l.002.002 2.572 3.373c.4.526 1.04.84 1.711.84.57 0 1.107-.217 1.51-.613l1.587-1.554a1.167 1.167 0 0 1-.449-.917c0-.649.539-1.177 1.202-1.177.662 0 1.201.528 1.201 1.178 0 .512-.336.947-.803 1.109Zm-1.397 7.32c0-.31-.256-.56-.572-.56h-14.8a.567.567 0 0 0-.573.56v1.346c0 .31.257.56.573.56h14.8a.567.567 0 0 0 .572-.56v-1.346Z"
        />
    </Svg>
)

const Notification = (props = initialState) => (
    <Svg
        width={props.size || props.width || 24}
        height={props.size || props.height || 24}
        fill="none"
        {...props}
    >
        <G clipPath="url(#a)">
            <Path
                stroke={props.stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.73 21a2 2 0 0 1-3.46 0M18 8A6 6 0 1 0 6 8c0 7-3 9-3 9h18s-3-2-3-9Z"
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h24v24H0z"/>
            </ClipPath>
        </Defs>
    </Svg>
)

const Agree = (props = initialState) => (
    <Svg
        width={props.size || props.width || 24}
        height={props.size || props.height || 18}
        fill="none"
        {...props}
    >
        <Path
            fill={props.fill}
            fillRule="evenodd"
            d="M23.417.527c.755.725.78 1.924.056 2.68L10.146 17.1a1.895 1.895 0 0 1-2.77-.038L.492 9.484a1.895 1.895 0 0 1 2.805-2.547l5.52 6.076L20.736.583a1.895 1.895 0 0 1 2.68-.056Z"
            clipRule="evenodd"
        />
    </Svg>
)

const Lock = (props = initialState) => (
    <Svg
        width={props.size || props.width || 24}
        height={props.size || props.height || 30}
        fill="none"
        {...props}
    >
        <Path
            fill={props.fill}
            fillRule="evenodd"
            d="M12 0C7.03 0 3 4.335 3 9.682V12h-.457c-1.326 0-2.47 1.07-2.519 2.394C-.158 19.455.401 30 12 30c11.576 0 12.156-10.556 11.977-15.605C23.93 13.07 22.787 12 21.46 12H21V9.682C21 4.335 16.97 0 12 0Zm6.428 12V9.682c0-3.82-2.878-6.916-6.428-6.916S5.571 5.862 5.571 9.682V12h12.857Zm-5.786 8.89a1.927 1.927 0 0 0 1.26-1.819c0-1.065-.847-1.928-1.894-1.928-1.046 0-1.895.863-1.895 1.928 0 .841.529 1.556 1.266 1.82v2.049a.631.631 0 1 0 1.263 0v-2.05Z"
            clipRule="evenodd"
        />
    </Svg>
)

const Logout = (props = initialState) => (
    <Svg
        width={props.size || props.width || 24}
        height={props.size || props.height || 24}
        fill="none"
        {...props}
    >
        <G clipPath="url(#a)">
            <Path
                stroke={props.stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m7 14 5-5m0 0-5-5m5 5H9"
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h24v24H0z"/>
            </ClipPath>
        </Defs>
    </Svg>
)

const StartOutLine = (props = initialState) => (
    <Svg
        width={props.size || props.width || 24}
        height={props.size || props.height || 24}
        fill="none"
        {...props}>
        <Path
            stroke={props.stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z"
        />
    </Svg>
)

const StartFill = (props = initialState) => (
    <Svg
        width={props.size || props.width || 21}
        height={props.size || props.height || 19}
        fill="none"
        {...props}
    >
        <G clipPath="url(#a)">
            <Path
                fill={props.fill}
                d="m11.17.96 2.299 4.232c.16.295.469.499.826.546l5.139.679c.9.119 1.259 1.124.608 1.7l-3.718 3.295a.943.943 0 0 0-.316.882l.878 4.652c.154.815-.787 1.436-1.592 1.051l-4.596-2.196a1.197 1.197 0 0 0-1.021 0L5.08 17.997c-.805.385-1.746-.236-1.592-1.051l.877-4.652a.942.942 0 0 0-.315-.882L.333 8.117C-.32 7.54.04 6.535.94 6.417l5.138-.68c.358-.046.667-.25.827-.545L9.204.96C9.606.22 10.768.22 11.17.96Z"
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h20.375v18.518H0z"/>
            </ClipPath>
        </Defs>
    </Svg>
)

const About = (props = initialState) => (
    <Svg
        width={props.size || props.width || 24}
        height={props.size || props.height || 24}
        fill="none"
        {...props}
    >
        <G clipPath="url(#a)">
            <Path
                stroke={props.stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3m.08 4h.01M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Z"
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h24v24H0z"/>
            </ClipPath>
        </Defs>
    </Svg>
)

const History = (props = initialState) => (
    <Svg
        width={props.size || props.width || 24}
        height={props.size || props.height || 24}
        fill="none"
        {...props}
    >
        <G clipPath="url(#a)">
            <Path
                fill={props.fill}
                d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18Zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12Z"
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h24v24H0z"/>
            </ClipPath>
        </Defs>
    </Svg>
)

const Dictionary = (props = initialState) => (
    <Svg
        width={props.size || props.width || 24}
        height={props.size || props.height || 24}
        fill="none"
        {...props}
    >
        <Path
            stroke={props.stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15Z"
        />
    </Svg>
)

const ShowPassword = (props = initialState) => (
    <Svg
        width={props.size || props.width || 17}
        height={props.size || props.height || 12}
        fill="none"
        {...props}
    >
        <Path
            fill={props.fill}
            d="M11.146 5.932c0 .715-.28 1.4-.778 1.906a2.633 2.633 0 0 1-1.876.79 2.633 2.633 0 0 1-1.877-.79 2.718 2.718 0 0 1-.777-1.906c0-.715.28-1.401.777-1.907a2.633 2.633 0 0 1 1.877-.79c.704 0 1.379.284 1.876.79.498.506.778 1.192.778 1.907Z"
        />
        <Path
            fill={props.fill}
            fillRule="evenodd"
            d="M0 5.932S3.184 0 8.492 0c5.307 0 8.491 5.932 8.491 5.932s-3.184 5.932-8.491 5.932C3.184 11.864 0 5.932 0 5.932Zm8.492 3.775c.985 0 1.93-.398 2.626-1.106a3.806 3.806 0 0 0 1.089-2.669 3.806 3.806 0 0 0-1.089-2.67 3.685 3.685 0 0 0-2.626-1.105c-.986 0-1.93.398-2.627 1.106a3.806 3.806 0 0 0-1.088 2.67c0 1 .39 1.96 1.088 2.668a3.685 3.685 0 0 0 2.627 1.106Z"
            clipRule="evenodd"
        />
    </Svg>
)

const HidePassword = (props = initialState) => (
    <Svg
        width={props.size || props.width || 17}
        height={props.size || props.height || 17}
        fill="none"
        {...props}
    >
        <Path
            fill={props.fill}
            d="m8.38 6.375 2.246 2.238V8.5A2.125 2.125 0 0 0 8.5 6.375h-.12Zm-3.046.567L6.432 8.04a1.951 1.951 0 0 0-.056.46A2.125 2.125 0 0 0 8.5 10.625c.155 0 .311-.021.46-.057l1.098 1.098a3.51 3.51 0 0 1-1.558.376A3.542 3.542 0 0 1 4.959 8.5c0-.56.142-1.084.375-1.558ZM1.417 3.025 3.032 4.64l.32.318A8.382 8.382 0 0 0 .708 8.5c1.225 3.11 4.25 5.313 7.792 5.313a8.342 8.342 0 0 0 3.102-.596l.305.298 2.068 2.068.9-.9L2.316 2.126m6.185 2.833A3.542 3.542 0 0 1 12.042 8.5c0 .453-.092.893-.255 1.29l2.076 2.075a8.39 8.39 0 0 0 2.43-3.365c-1.226-3.11-4.25-5.313-7.792-5.313-.992 0-1.941.178-2.834.496l1.537 1.523a3.576 3.576 0 0 1 1.297-.248Z"
        />
    </Svg>
)

const BackGame = (props = initialState) => (
    <Svg
        width={props.size || props.width || 24}
        height={props.size || props.height || 24}
        fill="none"
        {...props}
    >
        <Path
            fill={props.fill}
            d="M14.56 15c-.213 0-.397-.176-.433-.42-.317-2.117-2.11-5.813-6.658-6.029v2.717a.558.558 0 0 1-.065.262.469.469 0 0 1-.174.185.393.393 0 0 1-.456-.038L.184 6.294a.49.49 0 0 1-.135-.179.562.562 0 0 1 0-.46.49.49 0 0 1 .135-.179L6.774.094A.393.393 0 0 1 7.23.056a.47.47 0 0 1 .173.185c.042.079.065.17.065.262V3.26C10.28 3.58 15 5.902 15 14.497c0 .262-.175.48-.403.501a.41.41 0 0 1-.037.002Z"
        />
    </Svg>
)

export enum IconState {
    LeftArrow = "LeftArrow",
    RightArrow = "RightArrow",
    Profile = "Profile",
    Microphone = "Microphone",
    SendPaper = "SendPaper",
    Setting = "Setting",
    MenuHeading = "MenuHeading",
    Comment = "Comment",
    MuteAudio = "MuteAudio",
    WaveAudio = "WaveAudio",
    Bookmark = "Bookmark",
    Player = "Player",
    RePlay = "RePlay",
    DisLike = "DisLike",
    Like = "Like",
    Cancel = "Cancel",
    SendComment = "SendComment",
    PenBrush = "PenBrush",
    Password = "Password",
    Crown = "Crown",
    Notification = "Notification",
    Agree = "Agree",
    Lock = "Lock",
    StartFill = "StartFill",
    StartOutLine = "StartOutLine",
    Logout = "Logout",
    About = "About",
    History = "History",
    Dictionary = "Dictionary",
    ShowPassword = "ShowPassword",
    HidePassword = "HidePassword",
    BackGame = "BackGame",
}

const Icons = {
    LeftArrow: {
        state: "LeftArrow",
        icon: LeftArrow,
    },
    RightArrow: {
        state: "RightArrow",
        icon: RightArrow,
    },
    Profile: {
        state: "Profile",
        icon: Profile,
    },
    Microphone: {
        state: "Microphone",
        icon: Microphone,
    },
    SendPaper: {
        state: "SendPaper",
        icon: SendPaper,
    },
    Setting: {
        state: "Setting",
        icon: Setting,
    },
    MenuHeading: {
        state: "MenuHeading",
        icon: MenuHeading,
    },
    Comment: {
        state: "Comment",
        icon: Comment,
    },
    MuteAudio: {
        state: "MuteAudio",
        icon: MuteAudio,
    },
    WaveAudio: {
        state: "WaveAudio",
        icon: WaveAudio,
    },
    Bookmark: {
        state: "Bookmark",
        icon: Bookmark,
    },
    Player: {
        state: "Player",
        icon: Player,
    },
    RePlay: {
        state: "RePlay",
        icon: RePlay,
    },
    DisLike: {
        state: "DisLike",
        icon: DisLike,
    },
    Like: {
        state: "Like",
        icon: Like,
    },
    Cancel: {
        state: "Cancel",
        icon: Cancel,
    },
    SendComment: {
        state: "SendComment",
        icon: SendComment,
    },
    PenBrush: {
        state: "PenBrush",
        icon: PenBrush,
    },
    Password: {
        state: "Password",
        icon: Password,
    },
    Crown: {
        state: "Crown",
        icon: Crown,
    },
    Notification: {
        state: "Notification",
        icon: Notification,
    },
    Agree: {
        state: "Agree",
        icon: Agree,
    },
    Lock: {
        state: "Lock",
        icon: Lock,
    },
    StartFill: {
        state: "StartFill",
        icon: StartFill,
    },
    StartOutLine: {
        state: "StartOutLine",
        icon: StartOutLine,
    },
    Logout: {
        state: "Logout",
        icon: Logout,
    },
    About: {
        state: "About",
        icon: About,
    },
    History: {
        state: "History",
        icon: History,
    },
    Dictionary: {
        state: "Dictionary",
        icon: Dictionary,
    },
    ShowPassword: {
        state: "ShowPassword",
        icon: ShowPassword,
    },
    HidePassword: {
        state: "HidePassword",
        icon: HidePassword,
    },
    BackGame: {
        state: "BackGame",
        icon: BackGame,
    }
}

interface PropsIcon extends Props{
    state: keyof typeof IconState
}
export const IconSystem: React.FC<PropsIcon> = ({state, ...props}) => {
    const Icon = Icons[state].icon;
    return <Icon width={props.width} height={props.height} fill={props.fill} stroke={props.stroke} />
}

export {
    LeftArrow,
    RightArrow,
    Profile,
    Microphone,
    SendPaper,
    Setting,
    MenuHeading,
    Comment,
    MuteAudio,
    WaveAudio,
    Bookmark,
    Player,
    RePlay,
    DisLike,
    Like,
    Cancel,
    SendComment,
    PenBrush,
    Password,
    Crown,
    Notification,
    Agree,
    Lock,
    StartFill,
    StartOutLine,
    Logout,
    About,
    History,
    Dictionary,
    ShowPassword,
    HidePassword,
    BackGame
}


