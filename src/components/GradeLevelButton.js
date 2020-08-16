import React from "react";

const GradeLevelButton = ({gradeLevelText, gradeLevelCode, gradeLevelId, gradeSelected}) => {

    return(
        <div>
            <button key={gradeLevelId} 
                className="answerBtn"
                onClick={() => {
                    gradeSelected(gradeLevelCode);
                }} >
                {gradeLevelText}
            </button>                     
        </div>
    );
};

export default GradeLevelButton;