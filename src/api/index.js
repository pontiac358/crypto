import request from 'superagent'

export const fetchAllApi = async () =>{
    const {body} = await request.get(
        'https://api.coinmarketcap.com/v2/ticker/'
    )

    return body
}

export const convertApi = async (id, convert) =>{
    const {body} = await request.get(
        `https://api.coinmarketcap.com/v2/ticker/${id}/?convert=${convert}`
    )

    return body
}


