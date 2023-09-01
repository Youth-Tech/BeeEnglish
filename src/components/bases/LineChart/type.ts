export interface LineChartData {
    id: string | number;
    label: string;
    x: number;
    y: number;
}
export interface LineChartProps {
    /**
     * Data of the line chart
     * Example: {id:0,label: 'Mon', x: 0, y: 0},
                {id:1,label: 'Tues', x: 1, y: 4},
                {id:2,label: 'Wed', x: 2, y: 30},
                {id:3,label: 'Thur', x: 3, y: 15},
     */
    data: Array<LineChartData>
    /**
     * Width of the line chart
     */
    width: number
    /**
     * Height of the line chart
     */
    height: number
    /**
     * Number of decimal places of the Y axis
     */
    precision?: number
    /**
     * Vertical lines of the line chart
     */
    haveVerticalGuides?: boolean
    /**
     * Horizontal lines of the line chart
     */
    haveHorizontalGuides?: boolean
    /**
    * Enables X axis of the line chart
    */
    haveXAxis?: boolean
    /**
     * Enables Y axis of the line chart
     */
    haveYAxis?: boolean
    /**
     * Stroke width of every lines and axis in the chart
     */
    axisStrokeWidth?: number
    /**
     * Stroke color of every lines and axis in the chart
     */
    axisStrokeColor?: string
    /**
     * Dots between lines in the line chart
     */
    haveDots?: boolean
    /**
     * Color of dots
     */
    dotsColor?: string
    /**
     * Stroke color of dots
     */
    dotsStrokeColor?: string
    /**
     * Stroke width of dots
     */
    dotsStrokeWidth?: number
    /**
     * Radius of dots
     */
    rDots?: number
    /**
     * Color for the labels
     */
    labelColor?: string
    /**
     * Font size for the label
     */
    labelFontSize?: number
    /**
     * Font family for the label
     */
    labelFontFamily?: string
    /**
     * Color of the line
     */
    lineColor: string
    /**
     * Width of the line
     */
    lineWidth?: number

    onItemClick?: (item: LineChartData) => void
}


