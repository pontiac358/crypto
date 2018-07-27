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



export const calculate = (values, cb = () => {}, type, setResultToInput = () => {}, noAddResultList = false) => async (dispatch, getState) => {
    let coinFrom,
        coinTo,
        amountFrom,
        amountTo,
        changeInputName

    if((type === 'amountTo' && values.amountTo) || (type === 'amountFrom' && !values.amountFrom)){
        coinTo = getState().cryptoСurrencies[values.coinFrom]
        coinFrom = getState().cryptoСurrencies[values.coinTo]
        amountFrom = values.amountTo
        amountTo = values.amountFrom
        changeInputName = 'amountFrom'
    }else{
        coinFrom = getState().cryptoСurrencies[values.coinFrom]
        coinTo = getState().cryptoСurrencies[values.coinTo]
        amountFrom = values.amountFrom
        amountTo = values.amountTo
        changeInputName = 'amountTo'
    }



    if(!noAddResultList){
        dispatch({type: ADD_RESULT_LIST_START})
    }

    try {

        const result = await convertApi(coinFrom.id, coinTo.symbol)

        cb()

        dispatch({
            type: ADD_RESULT_LIST_SUCCESS,
            payload: getResult(result.data, coinTo, amountFrom, amountTo, setResultToInput, noAddResultList, changeInputName)
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