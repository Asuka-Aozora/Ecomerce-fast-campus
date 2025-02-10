import { combineReducers } from "redux"
import { userReducer } from "./user"
import { counterReducer } from "./counter"
import { cartReducer } from "./cart";
import { legacy_createStore } from 'redux'

export const reducers = combineReducers({
    user: userReducer,
    counter: counterReducer,
    cart: cartReducer
});

export const globalStore = legacy_createStore(reducers)
