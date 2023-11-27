import React from 'react'
import { Circle, Polyline, Svg, Text } from 'react-native-svg'
import { LineChartProps } from './type'
import { fontFamily, useTheme } from '@themes'
import { handleColor } from '@components/utils'

export const LineChart: React.FC<LineChartProps> = React.memo((props) => {
  const { colors, font } = useTheme()
  const {
    data,
    width,
    height,
    precision = 0,
    haveVerticalGuides,
    haveHorizontalGuides,
    haveXAxis,
    haveYAxis,
    axisStrokeWidth = 0.5,
    axisStrokeColor = handleColor(colors, '#E5E5E5'),
    haveDots,
    dotsColor = handleColor(colors, '#FFC107'),
    dotsStrokeColor = handleColor(colors, '#FFFFFF'),
    dotsStrokeWidth = 2,
    rDots = 8,
    labelColor = handleColor(colors, '#171725'),
    labelFontSize = font.size.h5,
    labelFontFamily = fontFamily.semiBold,
    lineColor = handleColor(colors, '#FFEFAD'),
    lineWidth = 2,
    onItemClick,
  } = props
  const FONT_SIZE = labelFontSize

  const verticalGuides = data
    .reduce<Array<number>>((uniqueArr, currentValue) => {
      const hasData = uniqueArr.some((value) => value === currentValue.y)
      if (!hasData) {
        uniqueArr.push(currentValue.y)
      }
      return uniqueArr
    }, [])
    .sort((a, b) => (a > b ? 1 : -1))

  // const horizontalGuides = data.length - 1
  // const horizontalGuides = verticalGuides

  const maximumXFromData = Math.max(...data.map((e) => e.x))
  const maximumYFromData = Math.max(...data.map((e) => e.y))
  const digits =
    parseFloat(maximumYFromData.toString()).toFixed(precision).length + 1
  const padding = (FONT_SIZE + digits) * 3
  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2

  const Axis = ({ points }: any) => (
    <Polyline
      fill={'none'}
      points={points}
      stroke={axisStrokeColor}
      strokeWidth={axisStrokeWidth}
    />
  )

  const XAxis = () => (
    <Axis
      points={`${padding},${height - padding} ${width - padding},${
        height - padding
      }`}
    />
  )

  const YAxis = () => (
    <Axis points={`${padding},${padding} ${padding},${height - padding}`} />
  )

  const points = data
    .map((element) => {
      /**
       * map over each element in the data array and calculate where x and y values are for the SVG point
       */
      const x =
        (element.x !== 0 ? element.x / maximumXFromData : 0) * chartWidth +
        padding
      const y =
        chartHeight -
        (element.y !== 0 ? element.y / maximumYFromData : 0) * chartHeight +
        padding
      return `${x},${y}`
    })
    .join(' ')

  const HorizontalGuides = () => {
    const startX = padding
    const endX = width - padding
    // return new Array(verticalGuides.length).fill(0).map((_, index) => {
    return new Array(maximumYFromData).fill(0).map((_, index) => {
      // const ratio = (index + 1) / (horizontalGuides.length - 1 ?? 1)
      const ratio = (index + 1) / (maximumYFromData ?? 1)
      const yCoordinate = chartHeight - chartHeight * ratio + padding

      return (
        <React.Fragment key={index}>
          <Polyline
            fill={'none'}
            stroke={axisStrokeColor}
            strokeWidth={axisStrokeWidth}
            points={`${startX},${yCoordinate} ${endX},${yCoordinate}`}
          />
        </React.Fragment>
      )
    })
  }

  const VerticalGuides = () => {
    const startY = padding
    const endY = height - padding
    return new Array(verticalGuides.length - 1).fill(0).map((_, index) => {
      const ratio = (index + 1) / (verticalGuides.length - 1 ?? 1)
      const xCoordinate = padding + ratio * (width - padding * 2)
      return (
        <React.Fragment key={index}>
          <Polyline
            fill={'none'}
            stroke={axisStrokeColor}
            strokeWidth={axisStrokeWidth}
            points={`${xCoordinate},${startY} ${xCoordinate},${endY}`}
          />
        </React.Fragment>
      )
    })
  }
  const CustomDots = () => {
    return data.map((element) => {
      /**
       * map over each element in the data array and calculate where x and y values are for the SVG point
       */
      const x =
        (element.x !== 0 ? element.x / maximumXFromData : 0) * chartWidth +
        padding
      const y =
        chartHeight -
        (element.y !== 0 ? element.y / maximumYFromData : 0) * chartHeight +
        padding
      return (
        <Circle
          key={element.id}
          onPress={() => {
            onItemClick?.(element)
          }}
          fill={dotsColor}
          strokeWidth={dotsStrokeWidth}
          stroke={dotsStrokeColor}
          cx={x}
          cy={y}
          r={rDots}
        />
      )
    })
  }

  const LabelsXAxis = () => {
    const y = height - padding + FONT_SIZE * 2
    return data.map((element, index) => {
      const x =
        (element.x / maximumXFromData) * chartWidth + padding - FONT_SIZE / 2
      return (
        <Text
          x={x}
          y={y}
          key={index}
          fill={labelColor}
          fontSize={FONT_SIZE}
          fontFamily={labelFontFamily}
        >
          {element.label}
        </Text>
      )
    })
  }
  const LabelsYAxis = () => {
    // const PARTS = verticalGuides.length ?? 0

    return verticalGuides.map((item, index) => {
      const x = FONT_SIZE
      // const ratio = index / horizontalGuides.length
      // const ratio = index / (horizontalGuides.length - 1 ?? 1) ?? 0

      // const y = chartHeight - chartHeight * ratio + padding + FONT_SIZE / 2
      const y =
          chartHeight -
          (index !== 0 ? item / maximumYFromData : 0) * chartHeight +
          padding
      return (
        <Text
          x={x}
          y={y}
          key={index}
          fill={labelColor}
          fontSize={FONT_SIZE}
          fontFamily={labelFontFamily}
        >
          {/*{(maximumYFromData * (item / PARTS)).toFixed(precision)}*/}
          {item}
        </Text>
      )
    })
  }
  return (
    <Svg
      strokeWidth={5}
      fill={'none'}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
    >
      {haveXAxis && <XAxis />}
      {haveYAxis && <YAxis />}
      <LabelsXAxis />
      <LabelsYAxis />
      {haveVerticalGuides && <VerticalGuides />}
      {haveHorizontalGuides && <HorizontalGuides />}
      <Polyline
        fill={'none'}
        stroke={lineColor}
        strokeWidth={lineWidth}
        points={points}
        strokeLinecap="round"
      />
      {haveDots && <CustomDots />}
    </Svg>
  )
})
