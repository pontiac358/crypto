import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { fetchAll, fetchResultList, calculate } from "./actions";
import { objToArray } from "./selectors";
import Form from './components/Form'
import ResultList from './components/ResultList'


class App extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        amountFrom: 0,
        amountTo: 0,
        coinFrom: '',
        coinTo: ''
    }

    componentDidMount() {
        this.props.fetchAll()
        this.props.fetchResultList()
    }



    render() {
        const { cryptoСurrencies, calculate, resultList } =  this.props


        console.log(this.state)

        return  (
            <div>
                <Form
                    onSubmit={ calculate }
                    { ...this.state }
                    cryptoСurrencies={ cryptoСurrencies }
                />
                <ResultList list={resultList}/>

            </div>
        )
    }

}

const mapStateToProps = state => ({
    resultList: state.resultList,
    cryptoСurrencies: objToArray(state.cryptoСurrencies)
})

const mapDispatchToProps = {
    fetchAll,
    fetchResultList,
    calculate
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
