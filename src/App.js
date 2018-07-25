import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { fetchAll, fetchResultList, calculate } from "./actions";
import Form from './components/Form'
import ResultList from './components/ResultList'



class App extends Component {
    constructor(props) {
        super(props)
    }


    componentDidMount() {
        this.props.fetchAll()
        this.props.fetchResultList()
    }




    render() {
        const { resultList } =  this.props


        return  (
            <div>
                <Form />
                <ResultList list={resultList}/>

            </div>
        )
    }

}

const mapStateToProps = state => ({
    resultList: state.resultList,
})

const mapDispatchToProps = {
    fetchAll,
    fetchResultList,
    calculate
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
