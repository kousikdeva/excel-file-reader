import { SET_HEADING, SET_CONTENT } from './actionType'

const initialState = {
    heading: [],
    content: []
}

export const Reducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case SET_HEADING:
            state = {
                ...state,
                heading: payload
            }
            return state
        case SET_CONTENT:
            state = {
                ...state,
                content: payload
            }
            return state
        default:
            return state
    }
}