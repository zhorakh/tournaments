import {
    mainActionTypes,
} from "../actions/actionTypes"
import { initialStates } from "./initialState"

export default function reducer(state = initialStates.tournaments, action) {
    switch (action.type) {
        case mainActionTypes.GET_DATA: {
            return {
                ...state,
                tournaments: action.payload,
            }
        }
        case mainActionTypes.DELETE_ITEM: {
            return {
                ...state,
                tournaments: state.tournaments.filter(({ id }) => id !== action.payload),
              }
        }
        case mainActionTypes.CLEAR_REDUCER: {
            return {
                tournaments: []
            }
        }
        default:
            return state
    }
}
