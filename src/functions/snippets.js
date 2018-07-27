import * as R from 'ramda'


export function getResult(data, coinTo, amountFrom, amountTo, setResultToInput, noAddResultList, changeInputName){

    const result = data.quotes[coinTo.symbol].price * amountFrom
    const payload = {
        from: amountFrom,
        to: result,
        changeInputName
    }

    setResultToInput(payload)

    return !noAddResultList && `${amountFrom} ${data.symbol} === ${result} ${coinTo.symbol}`
}
