import React, {useState} from "react";

const QuestionBoxNumericEntry = ({question, operand1, operand2, operator, userAnswer, selected}) => {
    const [answer, setAnswer] = useState(userAnswer);
    const [isAnswered, setIsAnswered] = useState(false);

    let inputComponent;
    if(!isAnswered){
        inputComponent = <input className="numericAnswerInput" inputmode="numeric" pattern="[0-9]*" type="text" value={answer} 
            onKeyDown={e => {
                //only submit the answer if its non null or empty and if the keydown is either enter or tab 
                if (e.target.value && (e.key === 'Enter' || e.key === 'Tab')) {
                    selected(e.target.value);
                    setIsAnswered(true);
                    setAnswer(e.target.value);
                }}
            }
            onMouseLeave={e => {
                //only submit the answer if its non null or empty and if the keydown is either enter or tab 
                if (e.target.value) {
                    selected(e.target.value);
                    setIsAnswered(true);
                    setAnswer(e.target.value);
                }}
            }
        />
    }
    else {
        inputComponent = <label className="numericAnswerInput">{answer}</label>
    }
    return(
        <div className="questionBox">
            <span className="equation stacked">
                            <span className="number">{operand2}</span>
                            <span className="operator">{operator}</span>
                            <span className="number">{operand1}</span>
                            <span className="equals">=</span>
            </span>
            <br/>

            {inputComponent}
         </div>
    );
};

export default QuestionBoxNumericEntry;