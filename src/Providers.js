import React from 'react'
import { Provider } from 'react-redux'
import { SWRConfig } from 'swr'

import store from './store'
import I18n from './locales/i18n'

const Providers = ({ children, ...pageProps }) => {
  return (
    <Provider store={store}>
      <I18n lngDict={pageProps?.lngDict} locale={pageProps?.lng}>
        <SWRConfig>{children}</SWRConfig>
      </I18n>
    </Provider>
  )
}

export default Providers
