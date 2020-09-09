import React from "react";

const Result = ({score, questionCount, answerLog, timerTime, playAgain, retryQuiz}) => {

    let centiseconds = Math.floor(timerTime / 10) % 100;
    let seconds = Math.floor(timerTime / 1000) % 60;
    let minutes = Math.floor(timerTime / 60000) % 60;
    let hours = Math.floor(timerTime / 3600000);

    let scoreResult;
    let buttonsContainer;
    if(score === questionCount) {
        scoreResult = <div className="score">Perfect score! You completed the quiz with a time of {hours} : {minutes} : {seconds} : {centiseconds}</div>
        buttonsContainer =  
            <div>
                <button className="playBtn" onClick={playAgain}>New Quiz</button>
            </div>
    }
    else {
        scoreResult = <div className="score">Score: {score}/{questionCount}</div>
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
                    <th>Correct</th>
                    <th>Selected</th>
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