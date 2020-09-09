import React, {useState} from "react";

const QuestionBoxNumericEntry = ({question, operand1, operand2, operator, userAnswer, selected}) => {
    const [answer, setAnswer] = useState(userAnswer);

    return(
        <div className="questionBox">
            <span className="equation stacked">
                            <span className="number">{operand2}</span>
                            <span className="operator">{operator}</span>
                            <span className="number">{operand1}</span>
                            <span className="equals">=</span>
            </span>
            <br/>
            <input inputmode="numeric" value={answer} onInput={e => selected(e.target.value)} />
        </div>
    );
};

export default QuestionBoxNumericEntry;