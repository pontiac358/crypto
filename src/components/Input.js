import React from 'react'
import TextField from '@material-ui/core/TextField';

const Input = props => {
    const { input, label, type, meta: { touched, error, warning } } = props;
    return (
        <div>
            <TextField
                label={ label }
                type={ type }
                margin="normal"
                { ...input }
            />
        </div>
    )
}


export default Input