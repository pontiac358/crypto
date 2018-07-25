import * as R from 'ramda'


export function getResult(data, coinTo, from, to, setResultToInput){
    const amountFrom = from

    const result = data.quotes[coinTo.symbol].price * amountFrom
    const payload = {
        from: amountFrom,
        to: result
    }

    setResultToInput(payload)

    return `${amountFrom} ${data.symbol} === ${result} ${coinTo.symbol}`
}
