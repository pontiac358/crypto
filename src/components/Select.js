import React from 'react'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const Select = props => {
    const { input, options, inputProps } = props

    return (
        <div>
            <TextField
                select
                label="Select"
                margin="normal"
                { ...input }
                { ...inputProps }
            >
                { options && options.map((option, i)=>{
                    return <MenuItem key={ option.id } value={ option.id }>{ option.name }</MenuItem>
                })}
            </TextField>
        </div>
    )
}


export default Select