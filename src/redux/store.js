import { combineReducers, configureStore } from "@reduxjs/toolkit"
import persistReducer from "redux-persist/es/persistReducer"
import thunk from "redux-thunk"
import persistStore from "redux-persist/es/persistStore"
import storage from "redux-persist/lib/storage";
import dataSlice from "./dataSlice";

const persistConfig = {
    key: 'root',
    storage
}

const rootReducer = combineReducers({
    auth: dataSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
})

export const persistor = persistStore(store)