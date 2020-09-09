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
            <input inputmode="numeric" pattern="[0-9]*" type="text" value={answer} 
                onKeyDown={e => {
                    console.log(e.key);
                    //only submit the answer if its non null or empty and if the keydown is either enter or tab 
                    if (e.target.value && (e.key === 'Enter' || e.key === 'Tab')) {
                        console.log('submitting value:' + e.target.value);
                        selected(e.target.value);
                    }
            }}  />
        </div>
    );
};


export default QuestionBoxNumericEntry;