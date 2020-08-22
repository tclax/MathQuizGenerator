import React from "react";

const Result = ({score, questionCount, answerLog, playAgain}) => {
    return (

    <div>
        <div className="score-board">
            <div className="score">You scored {score}/{questionCount} correct answers!</div>
        
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