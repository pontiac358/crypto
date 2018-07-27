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


class Form extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        loading: false
    }



    componentDidMount() {
        const values = queryString.parse(this.props.location.search)
        values.from ? this.props.change('coinFrom', parseInt(values.from)) : null
        values.to ? this.props.change('coinTo', parseInt(values.to)) : null
    }

    changeHistory = (values) => {
        const coinFrom = this.props.cryptoСurrencies[values.coinFrom]
        const coinTo = this.props.cryptoСurrencies[values.coinTo]
        browserHistory.push(`?from=${coinFrom.id}&to=${coinTo.id}`);

        this.setState({
            loading: false
        })
    }

    setResultToInput = (payload) => {
        this.props.change(payload.changeInputName, payload.to)
    }

    calculateHandle = (values, type, noAddResultList) => {
        this.setState({
            loading: true
        })
        this.props.calculate(
            values,
            () => this.changeHistory(values),
            type,
            (payload) => this.setResultToInput(payload, type, values),
            noAddResultList
        )
    }


    submitForm = type => debounce(() => {
        setTimeout(this.props.handleSubmit(params => this.calculateHandle(params, type, true)))
    }, 300)

    render() {
        const { handleSubmit, cryptoСurrencies, classes, valid } = this.props


        return (
            <form noValidate className={classes.root} autoComplete="off" onSubmit={ handleSubmit((params)=>this.calculateHandle(params, 'amountFrom')) }>
                <FormControl className={classes.formControl}>
                    <Field
                        name="amountFrom"
                        component={ Input }
                        type="number"
                        label='From'
                        onChange={this.submitForm("amountFrom") }
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
                        onChange={this.submitForm("amountFrom")}
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <Field
                        name="amountTo"
                        component={ Input }
                        type="number"
                        label='To'
                        onChange={this.submitForm("amountTo") }
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
                        onChange={this.submitForm("amountTo")}
                    />
                </FormControl>

                <FormControl className={classes.formControl}>
                    <div className="buttom__wrap">
                        <Button type="submit" disabled={ !valid } label={`${this.state.loading && valid ? 'Loading' : 'Сalculate'}`}/>
                    </div>
                </FormControl>
            </form>
        )
    }

}

const validate = values => {
    const errors = {}
    if (!values.amountFrom && !values.amountTo) {
        errors.amountFrom = 'Required'
        errors.amountTo = 'Required'
    }

    if (!values.coinFrom) {
        errors.coinFrom = 'Required'
    }

    if (!values.coinTo) {
        errors.coinTo = 'Required'
    }

    return errors
}


const mapStateToProps = (state, ownProps) => ({
    cryptoСurrencies: state.cryptoСurrencies,
})


Form = reduxForm({
    // a unique name for the form
    form: 'calculate',
    enableReinitialize: true,
    validate

})(connect(mapStateToProps, { calculate })(Form))

export default compose(
    withRouter,
    withStyles(styles)
)(Form)

