import { Http } from '../requests'
import { mainActionTypes } from './actionTypes'
import environment from '../env'

export function getData(data) {
    return dispatch => {
      const url = `${environment.api_url}/search?q=${data && data.toLowerCase()}&index=tournament`
        Http.get(url)
        .then((response) => {
            const data = response.data[0].documents.slice(0, 10)
            dispatch({
                type: mainActionTypes.GET_DATA,
                payload: data,
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export function saveItem(id) {
    return dispatch => {
        dispatch({
            type: mainActionTypes.DELETE_ITEM,
            payload: id,
        })
    }
}

export function clearReducer() {
    return dispatch => {
        dispatch({
            type: mainActionTypes.CLEAR_REDUCER,
        })
    }
}

