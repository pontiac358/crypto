import * as R from 'ramda'
import {
    FETCH_RESULT_LIST_SUCCESS,
    ADD_RESULT_LIST_SUCCESS,
    ADD_RESULT_LIST_START
} from '../actionTypes'

const InitialState = {
    loading: false,
    data:[]
};

export default (state = InitialState, {type, payload}) => {
    switch (type) {
        case FETCH_RESULT_LIST_SUCCESS:
            return { ...state }
        case ADD_RESULT_LIST_START:
            return R.merge(state, {
                loading: true,
            })
        case ADD_RESULT_LIST_SUCCESS:
            return R.merge(state, {
                loading: false,
                data: [...state.data, payload]
            })

        default:
            return state
    }
}