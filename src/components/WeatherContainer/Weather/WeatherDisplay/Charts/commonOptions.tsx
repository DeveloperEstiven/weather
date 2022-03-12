import { LegendProps } from '@nivo/legends'
import { ScaleSpec } from '@nivo/scales'
import { ThemeType } from '../../../../../styles/theme/theme'
import { DataChart } from '../../../../../utils/chartData/types'
import { UnitType } from '../FilterHourlyForecast/FilterHourlyForecast'

type Curve =
  | 'monotoneX'
  | 'linear'
  | 'basis'
  | 'cardinal'
  | 'catmullRom'
  | 'monotoneY'
  | 'natural'
  | 'step'
  | 'stepAfter'
  | 'stepBefore'
  | undefined
type EnableSlices = false | 'x' | 'y' | undefined

const customAxisLeft = (unitChar: UnitType) => ({
  format: (value: number) => (unitChar === 'hPa' ? `${value.toFixed(0)} ${unitChar}` : `${value} ${unitChar}`),
})

const getTheme = (theme: ThemeType) => ({
  textColor: theme.colors.text,
  fontSize: 13,
  axis: {
    domain: {
      line: {
        stroke: theme.colors.text,
        strokeWidth: 1,
      },
    },

    ticks: {
      line: {
        stroke: theme.colors.text,
        strokeWidth: 1,
      },
      text: {
        fontSize: 11,
        fill: theme.colors.text,
      },
    },
  },
  legends: {
    text: {
      fontSize: 13,
      fill: theme.colors.text,
    },
  },
  tooltip: {
    container: {
      background: theme.colors.backgroundPrimary,
      color: theme.colors.text,
      fontSize: 13,
    },
  },
  crosshair: {
    line: {
      stroke: theme.colors.text,
    },
  },
})

export const commonProperties = (data: DataChart, unitChar: UnitType, theme: ThemeType, legendTranslateY: number) => {
  return {
    data,
    animate: true,
    yFormat: '>-1.1~f',
    axisTop: null,
    axisRight: null,
    enableGridX: false,
    enableGridY: false,
    colors: [theme.colors.temperatureLine, theme.colors.feelsLikeLine],
    enablePoints: true,
    enablePointLabel: false,
    pointLabelYOffset: -15,
    useMesh: true,
    legends: [
      {
        anchor: 'bottom',
        direction: 'row',
        justify: false,
        translateX: 15,
        translateY: legendTranslateY,
        itemWidth: 100,
        itemHeight: 20,
        itemsSpacing: 14,
        symbolSize: 15,
        symbolShape: 'square',
        itemDirection: 'left-to-right',
      },
    ] as LegendProps[],
    curve: 'monotoneX' as Curve,
    enableSlices: 'x' as EnableSlices,
    yScale: {
      type: 'linear',
      min: 'auto',
      max: 'auto',
      stacked: false,
      reverse: false,
    } as ScaleSpec | undefined,
    motionConfig: 'slow',
    theme: getTheme(theme),
    axisLeft: customAxisLeft(unitChar),
  }
}
