export type ThemeType = typeof lightTheme

export const lightTheme = {
  borderRadius: '2px',
  maxWidthContainer: '1000px',
  colors: {
    body: '#eddcd2',
    text: '#121212',
    backgroundMain: '#f8edeb',
    backgroundPrimary: '#c6ac8f',
    backgroundSecondary: '#b07d62',
    backgroundBadge: '#deab90',
    temperatureLine: '#ddbea9',
    feelsLikeLine: '#cb997e',
  },
}

export const darkTheme: ThemeType = {
  borderRadius: '2px',
  maxWidthContainer: '1000px',
  colors: {
    body: '#151b20',
    text: '#f5f5f5',
    backgroundMain: '#0e1317',
    backgroundPrimary: '#004e92',
    backgroundSecondary: '#5e60ce',
    backgroundBadge: '#414345',
    temperatureLine: '#6dd5ed',
    feelsLikeLine: '#a8ff78',
  },
}
