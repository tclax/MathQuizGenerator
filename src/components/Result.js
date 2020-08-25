import React from "react";

const Result = ({score, questionCount, answerLog, timerTime, playAgain}) => {

    let centiseconds = Math.floor(timerTime / 10) % 100;
    let seconds = Math.floor(timerTime / 1000) % 60;
    let minutes = Math.floor(timerTime / 60000) % 60;
    let hours = Math.floor(timerTime / 3600000);

    let scoreResult;
    if(score === questionCount) {
        scoreResult = <div className="score">Perfect score! You completed the quiz perfectly in {seconds} seconds.</div>
    }
    else {
        scoreResult = <div className="score">You scored {score}/{questionCount} correct answers!</div>
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

            <button className="playBtn" onClick={playAgain}>
                Play Again!
            </button>
        </div>
    </div>
    )};

export default Result;