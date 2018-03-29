//client/components/App.js
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Add from './Add'

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {data: []};
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData(this);
    }

    componentWillReceiveProps(nextProps) {
        this.getData(this);
    }

    getData(ev) {
        axios.get('/getAll').then(function(response) {
            console.log(response);
            ev.setState({data: response.data});
        });
    }

    render() {
        return (
            <div>
                <Add />
                <table>
                    <thead>
                        <tr><th></th><th className='desc-col'>Question</th><th className='button-col'>Answer</th><th className='button-col'>Trivia</th></tr>
                    </thead>
                    <tbody>
                        {
                            this.state.data.map(function(exp){
                                return <tr key={exp.question}><td className='counterCell'></td><td className='desc-col'>{exp.question}</td><td className='button-col'>{exp.answer}</td><td className='button-col'>{exp.trivia}</td></tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}
