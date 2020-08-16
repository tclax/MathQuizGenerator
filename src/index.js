import React, {Component} from "react";
import ReactDOM from "react-dom";
import "./assets/style.css";
import quizService from "./quizService";
import QuestionBoxMultipleChoice from "./components/QuestionBoxMultipleChoice";
import Result from "./components/Result";
import GradeLevelButton from "./components/GradeLevelButton";

class MathQuiz extends Component {
    state = {
        questionBank: [],
        score: 0,
        responses: 0,
        gradeLevel: 0,
        questionCount: 4,
        answerLog: [],
        quizSetup: false,
        availableGradeLevels: [],
    };

    //Rules for generating quiz questions:
    //1. Generate the answer first, then generate the operands
    //2. Answer options shouldn't be too obvious which is the answer
    getQuestions = (gradeLevel) => {
        var qBank = [];
        var i;
        var minAnswer;
        var maxAnswer;
        var operand1;
        var operand2;
        var answer;
        var operations;
        var operation;
        var answerVariance;
        var totalAnswerOptions = 4;
        for(i = 0; i < this.state.questionCount; i++){
            var options = [];

            switch(gradeLevel) {
                case "K":
                    answerVariance = 5;
                    minAnswer = 1;
                    maxAnswer = 10;
                    operations = ['+', '-'];
                    operation = operations[Math.floor(Math.random() * operations.length)];
                    answer = Math.floor((Math.random() * maxAnswer) + minAnswer);
                    operand1 = Math.floor((Math.random() * answer) + minAnswer);
                    operand2 = this.getOperand(answer, operand1, operation);
                    
                    console.log('answer: ' + answer.toString() + ' operand1: ' + operand1.toString() + ' operand2: ' + operand2.toString()); 
                    //Generate options and add answer to the answers array
                    var optionsCount = 0;
                    console.log('looking for options for: ' + answer.toString());
                    while(optionsCount < totalAnswerOptions - 1){
                        var option = answer + Math.floor((Math.random() * answerVariance) + 1);
                        if(!options.includes(option)){
                            console.log('adding ' + option.toString());
                            options.push(option);
                            optionsCount++;
                        }
                    }
                    options.push(answer.toString());

                    //add the question to the qBank
                    qBank.push({
                        question: operand2.toString() + operation + operand1.toString(),
                        answers: options.sort(() => 0.5 - Math.random()).slice(0, totalAnswerOptions),
                        correct: answer.toString(),
                        questionId: i.toString(),
                    });
                    break;
                case "1":
                    break;
                case "2":
                    break;
                case "3":
                    break;
                case "4":
                    break;
                case "5":
                    break;
            }
        }
        
        //set the questions bank to the generated questions and set the quizSetup flag as true
        this.setState({     
            questionBank: qBank,       
            quizSetup: true,
        });
       
    };

    getOperand = (answer, operand1, operator) => {
        switch(operator){
            case '+':
                return answer - operand1;
            case  '-':
                return answer + operand1;
            case 'x':
                return answer / operand1;
            case '/':
                if(answer === 0 || operand1 === 0)
                    return 0;
                return answer * operand1;
        }
    }

    //gets the available grade levels from the quizService const array of gradeLevels
    getAvailableGradeLevels = () => {
        //todo: use quizService to seperate out the question generation engine
        quizService().then(gradeLevel => {
            this.setState({
                availableGradeLevels: gradeLevel
            });
        });

        this.state.availableGradeLevels.forEach(element => {
            console.log(element.gradeLevelCode);
        });
    };

    //Sends to the selected gradeLevel to the getQuestions method to generate a new quiz
    gradeSelected = (gradeLevel) => {
        console.log(gradeLevel + ' grade level was selected');
        this.getQuestions(gradeLevel);
    }

    //Compares the user answer with the correct answer, adds to the user score running total if correct.
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

    //reset the state when the user wants to play again.
    playAgain = () => {
        this.getQuestions();
        this.setState({
            quizSetup: false,
            score: 0,
            responses: 0,
            answerLog: []
        });
    };

    // Show the GradeLevelButton component after mount
    componentDidMount() {      
        this.getAvailableGradeLevels();
    }

    render() {
        return (           
            <div className="container">
                {/* Main div to hold the quiz */}
                <div className="title">Perfect Practice: Math Quiz</div>

                {/* Setup to allow the user to select a grade level to generate a quiz based off the selection */}
                {!this.state.quizSetup &&
                 this.state.availableGradeLevels.map((grade) => (
                    <GradeLevelButton key={grade.gradeLevelId} gradeLevelText={grade.gradeLevelText}
                        gradeLevelCode={grade.gradeLevelCode}
                        gradeLevelId={grade.gradeLevelId}
                        gradeSelected={gradeLevel => this.gradeSelected(gradeLevel)} />
                ))};

                {/* Generate the quiz questions based on the grade level selected */}
                {this.state.quizSetup
                && this.state.questionBank.length > 0 
                && this.state.responses < this.state.questionCount 
                && this.state.questionBank.map(
                    ({question, answers, correct, questionId}) => (
                        <QuestionBoxMultipleChoice question={question} 
                        options={answers} 
                        key={questionId}
                        selected={answer => this.computeAnswer(question, answer, correct)}
                         />
                    )
                )};
                
                {/* Show the results component once the all quiz questions are answered */}
                {this.state.responses === this.state.questionCount ? (
                  <Result score={this.state.score} questionCount={this.state.questionCount} answerLog={this.state.answerLog} playAgain={this.playAgain} />
                ) : null}
            </div>
        );
    }
}

ReactDOM.render(<MathQuiz />, document.getElementById("root"));
