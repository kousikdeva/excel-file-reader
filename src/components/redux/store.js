import { combineReducers, legacy_createStore as createStore } from "@reduxjs/toolkit"
import { Reducer } from "./reducer"

const reducers = combineReducers({ Reducer })
const store = createStore(
    reducers,
    {}
)

export default store