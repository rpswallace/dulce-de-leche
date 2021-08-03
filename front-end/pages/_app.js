import { useEffect } from 'react'
import TagManager from 'react-gtm-module'
import ReactGA from 'react-ga'
import { AnimatePresence } from 'framer-motion'

import 'bootstrap/dist/css/bootstrap.min.css'
// Global CSS
import '../assets/css/main.scss'

// Tag Manager (define the GTM ID)
const tagManagerArgs = {
  gtmId: '',
}

// Google Analytics ID
const gaID = ''

function MyApp({ Component, pageProps, router }) {
  useEffect(() => {
    if (tagManagerArgs.gtmId) {
      TagManager.initialize(tagManagerArgs)
    }

    if (gaID) {
      ReactGA.initialize(gaID)
      ReactGA.pageview(window.location.pathname + window.location.search)
    }
  }, [])

  return (
    <AnimatePresence exitBeforeEnter>
      <Component {...pageProps} key={router.route} />
    </AnimatePresence>
  )
}

export default MyApp
