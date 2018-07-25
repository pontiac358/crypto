import * as R from 'ramda'
import {
    FETCH_ALL_SUCCESS
} from '../actionTypes'

const InitialState = {};

export default (state = InitialState, {type, payload}) => {
    switch (type) {
        case FETCH_ALL_SUCCESS:
            return { ...payload }

        default:
            return state
    }
}