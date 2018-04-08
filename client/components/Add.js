//client/components/Add.js
import React from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import {Link} from 'react-router-dom';

var querystring = require('querystring');

class Add extends React.Component {
    constructor() {
        super();
        this.state = {
            question: '',
            answer: '',
            sourceLabel: '',
            sourceUrl: '',
            trivia: '',
            messageFromServer: '',
            modalIsOpen: false
        }
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.insertNewQuestion = this.insertNewQuestion.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        Modal.setAppElement('body');
    }

    openModal() {
        this.setState({
            modalIsOpen: true
        });
    }

    closeModal() {
        this.setState({
            modalIsOpen: false,
            question: '',
            answer: '',
            sourceLabel: '',
            sourceUrl: '',
            trivia: '',
            messageFromServer: ''
        });
    }

    componentDidMount() {
    }

    handleSelectChange(e) {
    }

    onClick(e) {
        this.insertNewQuestion(this);
    }

    insertNewQuestion(e) {
        axios.post('/insert',
            querystring.stringify({
                question: e.state.question,
                answer: e.state.answer,
                sourceLabel: e.state.sourceLabel,
                sourceUrl: e.state.sourceUrl,
                source: e.state.source,
                trivia: e.state.trivia,
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function(response) {
            e.setState({
                messageFromServer: response.data
            });
        });
    }

    handleTextChange(e) {
        if (e.target.name == "question") {
            this.setState({
                question: e.target.value
            });
        }

        if (e.target.name == "answer") {
            this.setState({
                answer: e.target.value
            });
        }

        if (e.target.name == "sourceLabel") {
            this.setState({
                sourceLabel: e.target.value
            });
        }

        if(e.target.name == "sourceUrl") {
            this.setState({
                sourceUrl: e.target.value
            });
        }

        if (e.target.name == "trivia") {
            this.setState({
                trivia: e.target.value
            });
        }
    }

    render() {
        return (
            <div>
                {/* <Button bsStyle="success" bsSize="small" onClick={this.openModal}><span className="glyphicon glyphicon-plus"></span></Button>
            <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} contentLabel="Add Question" className="Modal"> */ }
                    <fieldset>
                        <label htmlFor="question">Question:</label><input size="65" type="text" id="question" name="question" value={this.state.question} onChange={this.handleTextChange}></input>< br />
                        <label htmlFor="answer">Answer:</label><input type="text" id="answer" name="answer" value={this.state.answer} onChange={this.handleTextChange}></input>< br />
                        <label htmlFor="sourceLabel">Source Label:</label><input type="text" id="sourceLabel" name="sourceLabel" value={this.state.sourceLabel} onChange={this.handleTextChange}></input>< br />
                        <label htmlFor="sourceUrl">Source URL:</label><input type="text" id="sourceUrl" name="sourceUrl" value={this.state.sourceUrl} onChange={this.handleTextChange}></input>< br />
                        <label htmlFor="trivia">Trivia:</label><input type="text" id="trivia" name="trivia" value={this.state.trivia} onChange={this.handleTextChange}></input>< br />
                    </fieldset>
                    <div className='button-center'>
                    <br/>
                    <Button bsStyle="success" bsSize="small" onClick={this.onClick}>Add New Question</Button>
                    </div>
                {/*</Modal>*/}
            </div>
        )
    }
}
export default Add;
