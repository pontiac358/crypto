import React from 'react'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const Select = props => {
    const { list } = props

    return (
        <div>
            {
                list.data && list.data.map((item, i)=> {
                    return (
                        <div key={i}>{ item }</div>
                    )
                 })
            }

            {
                list.loading && (<div>loading...</div>)
            }
        </div>
    )
}


export default Select