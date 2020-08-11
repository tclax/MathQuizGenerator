import React, {useState} from "react";

const QuestionBoxText = ({question, selected}) => {
    
};

export default QuestionBoxText;


class QuestionBoxText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {answer: ''};
    }

    answerChangeHandler = (event) => {
        this.setState({answer: event.target.value});
    }

    render() {
        return (
            <div className="questionBox">
                <div className="question">{}</div>
                <form>
                    <input type="text" onChange={this.answerChangeHandler}/>
                </form>
            </div>      
        );
    }

}