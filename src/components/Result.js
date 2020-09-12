import React from "react";

const Result = ({score, questionCount, answerLog, timerTime, playAgain, retryQuiz}) => {

    // let centiseconds = Math.floor(timerTime / 10) % 100;
    // let seconds = Math.floor(timerTime / 1000) % 60;
    // let minutes = Math.floor(timerTime / 60000) % 60;
    // let hours = Math.floor(timerTime / 3600000);
    let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
  let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
  let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
  let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);

    let scoreResult = 
        <div className="score">
            <div>Score: {score}/{questionCount}</div>
            <div>Time: {hours} : {minutes} : {seconds} : {centiseconds}</div>
        </div>;
    let buttonsContainer;
    if(score === questionCount) {
        buttonsContainer =  
            <div>
                <button className="playBtn" onClick={playAgain}>New Quiz</button>
            </div>
    }
    else {
        buttonsContainer =  
            <div>
                <button className="playBtn" onClick={retryQuiz}>Retry</button>
                <button className="playBtn" onClick={playAgain}>New Quiz</button>
            </div>
    }    

    return (
    <div>
        <div className="score-board">
            
            {scoreResult}
            
            <table className="tableScore">
                <tr>
                    <th>Question</th>
                    <th>Answer</th>
                    <th>Your Answer</th>
                </tr>
                {answerLog.map(({question, answer, correctAnswer, isCorrect}) => (
                <tr className={isCorrect.valueOf() ? 'correctAnswer' : 'incorrectAnswer'}>
                    <td>{question}</td>
                    <td>{correctAnswer}</td>
                    <td>{answer}</td>
                </tr>
                ))}
            </table>

            {buttonsContainer}
        </div>
    </div>
    )};

export default Result;