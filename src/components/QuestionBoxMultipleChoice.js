import React, {useState} from "react";

const QuestionBoxMultipleChoice = ({question, options, operand1, operand2, operator, selected}) => {
    const [answer, setAnswer] = useState(options);

    return(
        <div className="questionBox">
            <span className="equation stacked">
                            <span className="number">{operand2}</span>
                            <span className="operator">{operator}</span>
                            <span className="number">{operand1}</span>
                            <span className="equals">=</span>
            </span>
            <br/>
            {answer.map((text, index) => (
                <button key={index} 
                    className="answerBtn" 
                    onClick={() => {
                        setAnswer([text]);
                        selected(text);
                    }}>
                        {text}
                </button>
            ))}
        </div>
    );
};

export default QuestionBoxMultipleChoice;