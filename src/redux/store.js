import { combineReducers, configureStore } from "@reduxjs/toolkit"
import persistReducer from "redux-persist/es/persistReducer"
import thunk from "redux-thunk"
import persistStore from "redux-persist/es/persistStore"
import storage from "redux-persist/lib/storage";
import dataSlice from "./dataSlice";
import detailUserSlice from "./detailUserSlice";
import detailEventSlice from "./detailEventSlice";
import detailResultSlice from "./detailResultSlice";

const persistConfig = {
    key: 'root',
    storage
}

const rootReducer = combineReducers({
    auth: dataSlice,
    userDetail: detailUserSlice,
    eventDetail: detailEventSlice,
    resultDetail: detailResultSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
})

export const persistor = persistStore(store)