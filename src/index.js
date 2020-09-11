import React, {Component} from "react";
import ReactDOM from "react-dom";
import "./assets/style.css";
import quizService from "./quizService";
import QuestionBoxMultipleChoice from "./components/QuestionBoxMultipleChoice";
import Result from "./components/Result";
import GradeLevelButton from "./components/GradeLevelButton";
import QuizStopwatch from "./components/QuizStopwatch";
import QuestionBoxNumericEntry from "./components/QuestionBoxNumericEnry";

class MathQuiz extends Component {
    state = {
        questionBank: [],
        score: 0,
        responses: 0,
        questionCount: 3,
        answerLog: [],
        quizSetup: false,
        availableGradeLevels: [],
        timerTime: 0,
        timerOn: false,
        timerStart: 0,
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
                    //Kindergarten question rules: Add and subtract from 0 - 10
                    do {
                        answerVariance = 5;
                        minAnswer = 1;
                        maxAnswer = 10;
                        operations = ['+', '-'];
                        operation = operations[Math.floor(Math.random() * operations.length)];
                        answer = Math.floor((Math.random() * maxAnswer) + minAnswer);
                        operand1 = Math.floor((Math.random() * answer) + minAnswer);
                        operand2 = this.getOperand(answer, operand1, operation);
                    } while(operand1 < minAnswer && operand1 > maxAnswer && operand2 < minAnswer && operand2 > maxAnswer);

                    //Generate options and add answer to the answers array
                    var optionsCount = 0;
                    while(optionsCount < totalAnswerOptions - 1){
                        var option = answer + Math.floor((Math.random() * answerVariance) + 1);
                        if(!options.includes(option)){
                            options.push(option);
                            optionsCount++;
                        }
                    }

                    options.push(answer.toString());
                    break;
                case "1":
                    //Grade 1 question rules: Add from 0 - 100, subtract 10s from 0 - 10
                    do {
                        answerVariance = 10;
                        minAnswer = 1;
                        maxAnswer = 100;
                        operations = ['+', '-'];
                        operation = operations[Math.floor(Math.random() * operations.length)];

                        if(operation === '+') {
                            answer = Math.floor((Math.random() * maxAnswer) + minAnswer);
                            operand1 = Math.floor((Math.random() * answer) + minAnswer);
                            operand2 = this.getOperand(answer, operand1, operation);
                        }
                        else {
                            answer = Math.floor((Math.random() * 9)) * 10;
                            operand1 = Math.floor((Math.random() * (answer / 10))) * 10;
                            operand2 = this.getOperand(answer, operand1, operation);
                        }
                        
                    } while(operand1 < minAnswer && operand1 > maxAnswer && operand2 < minAnswer && operand2 > maxAnswer);

                    //Generate options and add answer to the answers array
                    var optionsCount = 0;
                    while(optionsCount < totalAnswerOptions - 1){
                        var option = answer + Math.floor((Math.random() * answerVariance) + 1);
                        if(!options.includes(option)){
                            options.push(option);
                            optionsCount++;
                        }
                    }

                    options.push(answer.toString());
                    break;
                case "2":
                    //Grade 2 question rules: Add and subtract from 0 - 10
                    do {
                        answerVariance = 25;
                        minAnswer = 1;
                        maxAnswer = 1000;
                        operations = ['+', '-'];
                        operation = operations[Math.floor(Math.random() * operations.length)];
                        answer = Math.floor((Math.random() * maxAnswer) + minAnswer);
                        operand1 = Math.floor((Math.random() * answer) + minAnswer);
                        operand2 = this.getOperand(answer, operand1, operation);
                    } while(operand1 < minAnswer && operand1 > maxAnswer && operand2 < minAnswer && operand2 > maxAnswer);

                    //Generate options and add answer to the answers array
                    var optionsCount = 0;
                    while(optionsCount < totalAnswerOptions - 1){
                        var option = answer + Math.floor((Math.random() * answerVariance) + 1);
                        if(!options.includes(option)){
                            options.push(option);
                            optionsCount++;
                        }
                    }

                    options.push(answer.toString());
                    break;
                case "3":
                    break;
                case "4":
                    break;
                case "5":
                    break;
            }

            //add the question to the qBank
            qBank.push({
                question: operand2.toString() + operation + operand1.toString(),
                answers: options.sort(() => 0.5 - Math.random()).slice(0, totalAnswerOptions),
                correct: answer.toString(),
                questionId: i.toString(),
                operand1: operand1.toString(),
                operand2: operand2.toString(),
                operation: operation.toString(),
            });
        }
        
        //set the questions bank to the generated questions and set the quizSetup flag as true
        this.setState({     
            questionBank: qBank,       
            quizSetup: true,
            timerTime: 0,
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
        this.startTimer();
    }

    //Compares the user answer with the correct answer, adds to the user score running total if correct.
    computeAnswer = (questionId, answer) => {
        var currentQuestion = this.state.questionBank[questionId];
        if(answer === currentQuestion.correct) {
            this.setState(prevState => ({           
                score: this.state.score + 1,
                answerLog: [...prevState.answerLog, {
                    question: currentQuestion.question,
                    answer: answer,
                    correctAnswer: currentQuestion.correct,
                    isCorrect: true,}
                ],
            }));          
        }
        else {
            this.setState(prevState => ({           
                answerLog: [...prevState.answerLog, {
                    question: currentQuestion.question,
                    answer: answer,
                    correctAnswer: currentQuestion.correct,
                    isCorrect: false,}
                ],
            }));
        }
        this.setState({
            responses: this.state.responses < this.state.questionCount ? this.state.responses + 1 : this.state.questionCount
        });

        if(this.state.responses === this.state.questionCount - 1){
            this.stopTimer();
        }
    };

    //reset the state when the user wants to play again.
    playAgain = () => {
        this.stopTimer();
        this.resetTimer();
        this.setState({
            quizSetup: false,
            score: 0,
            responses: 0,
            answerLog: []
        });
    };

    //Retry the current quiz. Shuffle the questions and the options again so its not the same exact quiz.
    retryQuiz = () => {
        this.resetTimer();
        this.setState({
            score: 0,
            responses: 0,
            answerLog: []
        });
        this.startTimer();      
    };


    startTimer = () => {
        this.setState({
          timerOn: true,
          timerTime: this.state.timerTime,
          timerStart: Date.now() - this.state.timerTime
        });
        this.timer = setInterval(() => {
          this.setState({
            timerTime: Date.now() - this.state.timerStart
          });
        }, 10);
      };
    
      stopTimer = () => {
        this.setState({ timerOn: false });
        clearInterval(this.timer);
      };
    
      resetTimer = () => {
        (async () => {
            await this.setState({
                timerStart: 0,
                timerTime: 0,
              });
        })();
            
      };
    

    // Show the GradeLevelButton component after mount
    componentDidMount() {      
        this.getAvailableGradeLevels();
    }

    render() {

        //Grade Selection container
        let gradeSelectionContainer;
        if(!this.state.quizSetup) {
            gradeSelectionContainer = 
            <div>
                <div className="subTitle">Select a grade level:</div>
                {this.state.availableGradeLevels.map((grade) => (
                     <GradeLevelButton key={grade.gradeLevelId} gradeLevelText={grade.gradeLevelText}
                    gradeLevelCode={grade.gradeLevelCode}
                    gradeLevelId={grade.gradeLevelId}
                    gradeSelected={gradeLevel => this.gradeSelected(gradeLevel)} />))
                }
            </div>
        }

        let quizQuestionsContainer;
        let quizStopwatch = <QuizStopwatch timerTime={this.state.timerTime} />       
        if(this.state.quizSetup
            && this.state.questionBank.length > 0 
            && this.state.responses < this.state.questionCount) {
                quizQuestionsContainer = 
            <div>               
                {quizStopwatch}
                {/* {this.state.questionBank.map(
                ({question, answers, correct, questionId, operand1, operand2, operation}) => (
                    <QuestionBoxMultipleChoice 
                        operand1={operand1}
                        operand2={operand2}
                        operator={operation}
                        question={question} 
                        options={answers} 
                        key={questionId}
                        selected={answer => this.computeAnswer(question, answer, correct)}
                     />
                ))} */}
                <br/>
                {this.state.questionBank.map(
                ({question, answers, correct, questionId, operand1, operand2, operation}) => (
                    <QuestionBoxNumericEntry 
                        operand1={operand1}
                        operand2={operand2}
                        operator={operation}
                        question={question} 
                        key={questionId}
                        selected={answer => this.computeAnswer(questionId, answer)}
                     />
                ))}
            </div>
            
        }

        let resultsContainer;
        if(this.state.responses === this.state.questionCount){
            resultsContainer = <Result score={this.state.score} questionCount={this.state.questionCount} answerLog={this.state.answerLog} timerTime={this.state.timerTime} playAgain={this.playAgain} retryQuiz={this.retryQuiz}/>
        }


        return (           
            <div className="container">
                {/* Main div to hold the quiz */}
                <div className="title">Perfect Practice</div>

                {gradeSelectionContainer}

                {quizQuestionsContainer}
                {resultsContainer}
            </div>
        );
    }
}

ReactDOM.render(<MathQuiz />, document.getElementById("root"));
