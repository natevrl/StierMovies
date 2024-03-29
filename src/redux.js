import { configureStore, createSlice, combineReducers } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { persistReducer } from "redux-persist";

const persistConfig = {
    key: "root",
    storage
};

const favListSlice = createSlice({
    name: "favList",
    initialState: [],

    reducers:  {
        toggleFavBool: (state, action) => {

        },
        addToFavList: (state, action) => {
            if (!state.includes(action.payload))
                state.push(action.payload);
        },
        deleteToFavList: (state, action) => {
            const newl = state.filter((id) => id !== action.payload);
            return newl;
        },
    }
})

const isTriggeredSlice = createSlice({
    name: "isTriggered",
    initialState: false,

    reducers: {
        toggleReverse: (state, action) => {
            return state = !state;
        }
    }
})

const reducer = combineReducers({
    favList: favListSlice.reducer,
    isTriggered: isTriggeredSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, reducer);


export const myStore = configureStore({
    // handle the ".a non-serializable value was detected in the state" error
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

    reducer: persistedReducer,
})

export const { addToFavList, toggleFavBool, deleteToFavList } = favListSlice.actions;
export const { toggleReverse } = isTriggeredSlice.actions;