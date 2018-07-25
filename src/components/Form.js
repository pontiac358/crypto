import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import Select from '../components/Select'
import Input from '../components/Input'
import Button from '../components/Button'

import { calculate } from '../actions'

import { withStyles } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';


const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

const required = value => (value ? undefined : 'Required')


let Form = props => {
    const { handleSubmit, cryptoСurrencies, classes, amountFrom, amountTo, valid } = props

    return (
        <form className={classes.root} autoComplete="off" onSubmit={ handleSubmit }>
            <FormControl className={classes.formControl}>
                <Field
                    name="amountFrom"
                    component={ Input }
                    type="number"
                    label='From'
                    value={ amountFrom }
                    validate={[required]}
                />
            </FormControl>
            <FormControl className={classes.formControl}>
                <Field
                    name="coinFrom"
                    component={ Select }
                    options={ cryptoСurrencies }
                    inputProps={{
                        helperText:"Please select  crypto currency"
                    }}
                    validate={[required]}

                />
            </FormControl>
            <FormControl className={classes.formControl}>
                <Field
                    name="amountTo"
                    component={ Input }
                    type="number"
                    label='To'
                    value={ amountTo }
                    validate={[required]}
                />
            </FormControl>
            <FormControl className={classes.formControl}>
                <Field
                    name="coinTo"
                    component={ Select }
                    type="text"
                    options={ cryptoСurrencies }
                    inputProps={{
                        helperText:"Please select  crypto currency"
                    }}
                    validate={[required]}
                />
            </FormControl>

            <FormControl className={classes.formControl}>
                <div className="buttom__wrap">
                    <Button type="submit" disabled={ !valid } label='Сalculate'/>
                </div>
            </FormControl>
        </form>
    )
}


Form = reduxForm({
    // a unique name for the form
    form: 'colculate',
})(connect(null, { calculate })(Form))

export default withStyles(styles)(Form);