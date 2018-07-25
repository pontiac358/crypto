import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import cryptoСurrencies from './cryptoСurrencies'
import resultList from './resultList'

export default combineReducers({
    resultList,
    cryptoСurrencies,
    form: formReducer,
    routing: routerReducer
})