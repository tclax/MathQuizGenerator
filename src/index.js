import React, {Component} from "react";
import ReactDOM from "react-dom";
import "./assets/style.css";
import quizService from "./quizService";
import QuestionBoxMultipleChoice from "./components/QuestionBoxMultipleChoice";
import Result from "./components/Result";

class MathQuiz extends Component {
    state = {
        questionBank: [],
        score: 0,
        responses: 0,
        gradeLevel: 0,
        questionCount: 3,
        answerLog: [],
    };

    getQuestions = () => {
        var qBank = [];
        var i;
        for(i = 0; i < this.state.questionCount; i++){
            var operand1 = Math.floor((Math.random() * 10) + 1);
            var operand2 = Math.floor((Math.random() * 10) + 1);
            var answer = (operand1 + operand2);
            qBank.push({
                question: operand1.toString() + " + " + operand2.toString(),
                answers: [answer.toString(), (answer - 1).toString(), (answer + 1).toString(), (answer + 5).toString()],
                correct: answer.toString(),
                questionId: i.toString(),
            });
        }
        
        //set the questions bank to the generated questions
        this.setState({
            questionBank: qBank
        });

        //todo: use quizService to seperate out the question generation engine
        // //quizService().GenerateQuestionBank();
        // quizService().then(question => {
        //     this.setState({
        //         questionBank: question
        //     });
        // });
    };

    computeAnswer = (question, answer, correctAnswer) => {
        if(answer === correctAnswer) {
            this.setState(prevState => ({           
                score: this.state.score + 1,
                answerLog: [...prevState.answerLog, {
                    question: question,
                    answer: answer,
                    correctAnswer: correctAnswer,
                    isCorrect: true,}
                ],
            }));          
        }
        else {
            this.setState(prevState => ({           
                answerLog: [...prevState.answerLog, {
                    question: question,
                    answer: answer,
                    correctAnswer: correctAnswer,
                    isCorrect: false,}
                ],
            }));
        }
        this.setState({
            responses: this.state.responses < this.state.questionCount ? this.state.responses + 1 : this.state.questionCount
        });
    };

    playAgain = () => {
        this.getQuestions();
        this.setState({
            score: 0,
            responses: 0,
            answerLog: []
        });
    };

    componentDidMount() {
        this.getQuestions();
    }

    render() {
        return (
            <div className="container">
                <div className="title">Perfect Practice: Math Quiz</div>
                {this.state.questionBank.length > 0 
                && this.state.responses < this.state.questionCount 
                && this.state.questionBank.map(
                    ({question, answers, correct, questionId}) => (
                        <QuestionBoxMultipleChoice question={question} 
                        options={answers} 
                        key={questionId}
                        selected={answer => this.computeAnswer(question, answer, correct)}
                         />
                    )
                )}
                
                {this.state.responses === this.state.questionCount ? (
                  <Result score={this.state.score} questionCount={this.state.questionCount} answerLog={this.state.answerLog} playAgain={this.playAgain} />
                ) : null}
            </div>
        );
    }
}

ReactDOM.render(<MathQuiz />, document.getElementById("root"));
