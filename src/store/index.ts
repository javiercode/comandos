
import thunk from 'redux-thunk';
import AuthReducer from "./login/reducer";
import { configureStore,combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer,createTransform } from 'redux-persist'
import storage from 'redux-persist/lib/storage/session'
import { encryptTransform } from 'redux-persist-transform-encrypt';

const persistConfig = {
  key: 'root',
  storage,
  transforms:[
    encryptTransform({
      secretKey: process.env.REACT_APP_KEY || "sdf786s9d9-8-5451-47asfda",
      onError: function (error) {
        // Handle the error.
      },
    }),
  ]
}

// const store = configureStore({
//   reducer: {
//     AuthReducer: AuthReducer,
//   },
// })
const rootReducer = combineReducers({ 
  AuthReducer: AuthReducer,
  // stateReconciler: hardSet
})


const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})

export const persistor = persistStore(store)
// export store;