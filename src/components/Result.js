import React from "react";

const Result = ({score, questionCount, answerLog, playAgain}) => {
    return (

    <div>
        <div className="score-board">
            <div className="score">You scored {score} / {questionCount} correct answers!</div>
            <button className="playBtn" onClick={playAgain}>
                Play Again!
            </button>
            <table className="tableScore">
                <tr>
                    <th>Question</th>
                    <th>Correct Answer</th>
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
        </div>
    </div>
    )};

export default Result;