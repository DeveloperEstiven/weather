import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpApi from 'i18next-http-backend'
import { supportedLanguages } from './utils/languages'
// import 'swiper/css/bundle'
import 'antd/dist/antd.min.css'
import 'flag-icon-css/css/flag-icons.min.css'
import './styles/styles.scss'
// import 'swiper/css'

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: supportedLanguages,
    fallbackLng: 'en',
    detection: {
      order: ['path', 'cookie', 'htmlTag'],
      caches: ['cookie'],
    },
    backend: { loadPath: '/assets/locales/{{lng}}/translation.json' },
  })

ReactDOM.render(<App />, document.getElementById('root'))
