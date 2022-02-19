import '../styles/globals.css'

import 'suneditor/dist/css/suneditor.min.css'

import 'react-datepicker/dist/react-datepicker.css'
import 'react-toastify/dist/ReactToastify.css'

import { Provider } from 'react-redux'
import { createWrapper } from 'next-redux-wrapper'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '../store'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
}

const makestore = () => store;
const wrapper = createWrapper(makestore);
export default wrapper.withRedux(MyApp);