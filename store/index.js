// import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit"
// import { rootReducer } from "./reducers"


// export const store = configureStore({
//     reducer : rootReducer,
//     middleware: getDefaultMiddleware(),
//     devTools: process.env.NODE_ENV !== "production"
// })




import { configureStore } from "@reduxjs/toolkit"
import { rootReducer } from "./reducers"

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

const persistConfig = {
    key: 'root',
    whitelist: ['users', 'admins'],
    storage,
    stateReconciler: autoMergeLevel2
}


export const store = configureStore({
    reducer : persistReducer(persistConfig, rootReducer),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
    devTools: process.env.NODE_ENV !== "production"
})

export const persistor = persistStore(store)
