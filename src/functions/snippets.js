import * as R from 'ramda'


export function getResult(data, coinTo, values){
    const amountFrom = values.amountFrom

    const result = data.quotes[coinTo.symbol].price * amountFrom

    return `${amountFrom} ${data.symbol} === ${result} ${coinTo.symbol}`
}
