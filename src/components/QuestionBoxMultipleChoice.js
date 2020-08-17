import React, {useState} from "react";

const QuestionBoxMultipleChoice = ({question, options, operand1, operand2, operator, selected}) => {
    const [answer, setAnswer] = useState(options);

    return(
        <div className="questionBox">
            <span class="equation stacked">
                            <span class="number">{operand2}</span>
                            <span class="operator">{operator}</span>
                            <span class="number">{operand1}</span>
                            <span class="equals">=</span>
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