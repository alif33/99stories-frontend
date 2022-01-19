import '../styles/globals.css'
import 'slick-carousel/slick/slick.css'
import 'suneditor/dist/css/suneditor.min.css'
import 'slick-carousel/slick/slick-theme.css'
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