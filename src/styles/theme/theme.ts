export type ThemeType = typeof lightTheme // This is the type definition for my theme object.

export const lightTheme = {
  borderRadius: '2px',
  colors: {
    body: '#EAEAEA',
    text: '#121212',
    backgroundMain: '#fff',
    backgroundPrimary: '#ffa751',
    backgroundSecondary: '#ffe259',
    backgroundBadge: '#FFE000',
    temperatureLine: '#FFE000',
    feelsLikeLine: '#F2C94C',
  },
}

export const darkTheme: ThemeType = {
  borderRadius: '2px',
  colors: {
    body: '#151b20',
    text: '#f5f5f5',
    backgroundMain: '#0e1317',
    backgroundPrimary: '#004e92',
    backgroundSecondary: '#334d50',
    backgroundBadge: '#414345',
    temperatureLine: '#6dd5ed',
    feelsLikeLine: '#a8ff78',
  },
}
