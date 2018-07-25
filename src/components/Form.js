import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import Select from '../components/Select'
import Input from '../components/Input'
import Button from '../components/Button'

import { calculate } from '../actions'

import { withStyles } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';
import {browserHistory} from "react-router";
import {objToArray} from "../selectors";
import queryString from 'query-string'
import debounce from 'debounce'



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


class Form extends Component {
    constructor(props) {
        super(props)
    }


    componentDidMount() {
        const values = queryString.parse(this.props.location.search)
        this.props.change('coinFrom', parseInt(values.from))
        this.props.change('coinTo', parseInt(values.to))
    }

    render() {
        const { handleSubmit, cryptoСurrencies, classes, valid, calculate, change } = this.props


        const changeHistory = (values) => {
            const coinFrom = cryptoСurrencies[values.coinFrom]
            const coinTo = cryptoСurrencies[values.coinTo]
            browserHistory.push(`?from=${coinFrom.id}&to=${coinTo.id}`);
        }

        const setResultToInput = (payload, type) => {
            type === 'amountFrom' ?
                change('amountTo', payload.to) :
                change('amountFrom', payload.to)
        }

        const calculateHandle = (values, type) => {
            calculate(values, () => changeHistory(values), type, (payload) => setResultToInput(payload, type))
        }

        const submitForm = type => {
            setTimeout(handleSubmit(params => calculateHandle(params, type)))
        }


        return (
            <form className={classes.root} autoComplete="off" onSubmit={ handleSubmit((params)=>calculateHandle(params, 'amountFrom')) }>
                <FormControl className={classes.formControl}>
                    <Field
                        name="amountFrom"
                        component={ Input }
                        type="number"
                        label='From'
                        validate={[required]}
                        onChange={debounce(() => submitForm("amountFrom"), 300) }
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <Field
                        name="coinFrom"
                        component={ Select }
                        options={ objToArray(cryptoСurrencies) }
                        inputProps={{
                            helperText:"Please select  crypto currency"
                        }}
                        validate={[required]}
                        onChange={debounce(() => submitForm("amountFrom"), 300) }
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <Field
                        name="amountTo"
                        component={ Input }
                        type="number"
                        label='To'
                        validate={[required]}
                        onChange={debounce(() => submitForm("amountTo"), 300) }
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <Field
                        name="coinTo"
                        component={ Select }
                        type="text"
                        options={ objToArray(cryptoСurrencies) }
                        inputProps={{
                            helperText:"Please select  crypto currency"
                        }}
                        validate={[required]}
                        onChange={debounce(() => submitForm("amountTo"), 300) }
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

}

const mapStateToProps = (state, ownProps) => ({
    cryptoСurrencies: state.cryptoСurrencies,
})


Form = reduxForm({
    // a unique name for the form
    form: 'calculate',
    enableReinitialize: true,

})(connect(mapStateToProps, { calculate })(Form))

export default compose(
    withRouter,
    withStyles(styles)
)(Form)

