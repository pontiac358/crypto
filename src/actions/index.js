import * as R from 'ramda'

import {
    FETCH_ALL_START,
    FETCH_ALL_SUCCESS,
    FETCH_ALL_FAILURE,

    FETCH_RESULT_LIST_START,
    FETCH_RESULT_LIST_SUCCESS,
    FETCH_RESULT_LIST_FAILURE,

    ADD_RESULT_LIST_START,
    ADD_RESULT_LIST_SUCCESS,
    ADD_RESULT_LIST_FAILURE
} from '../actionTypes';

import {
    fetchAllApi,
    convertApi
} from "../api";

import {
    getResult
} from "../functions/snippets";

export const fetchAll = () => async dispatch => {
    dispatch({type: FETCH_ALL_START})

    try {
        const all = await fetchAllApi()
        dispatch({
            type: FETCH_ALL_SUCCESS,
            payload: all.data
        })
    } catch (err) {
        dispatch({
            type: FETCH_ALL_FAILURE,
            payload: err,
            error: true
        })
    }
}

export const fetchResultList = () => async dispatch => {
    dispatch({type: FETCH_RESULT_LIST_START})

    try {
        dispatch({
            type: FETCH_RESULT_LIST_SUCCESS,
        })
    } catch (err) {
        dispatch({
            type: FETCH_RESULT_LIST_FAILURE,
            payload: err,
            error: true
        })
    }
}



export const calculate = values => async (dispatch, getState) => {
    const coinFrom = getState().cryptoСurrencies[values.coinFrom]
    const coinTo = getState().cryptoСurrencies[values.coinTo]
    const amountFrom = values.amountFrom


    dispatch({type: ADD_RESULT_LIST_START})

    try {
        const result = await convertApi(coinFrom.id, coinTo.symbol)

        dispatch({
            type: ADD_RESULT_LIST_SUCCESS,
            payload: getResult(result.data, coinTo, values)
        })
    } catch (err) {
        console.log(err)
        dispatch({
            type: ADD_RESULT_LIST_FAILURE,
            payload: err,
            error: true
        })
    }
}