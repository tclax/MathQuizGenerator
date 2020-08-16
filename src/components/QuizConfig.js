import React, {useState} from "react";
import GradeLevelButton from "./GradeLevelButton";

const QuizConfig = () => {
     
    const gradeLevelList = [
        {
            gradeLevelText: 'Kindergarten',
            gradeLevelCode: 'K',
            gradeLevelId: 0,
        },
        {
            gradeLevelText: '1st Grade',
            gradeLevelCode: '1',
            gradeLevelId: 1,
        },
        {
            gradeLevelText: '2nd Grade',
            gradeLevelCode: '2',
            gradeLevelId: 2,
        },
        {
            gradeLevelText: '3rd Grade',
            gradeLevelCode: '3',
            gradeLevelId: 3,
        },
        {
            gradeLevelText: '4th Grade',
            gradeLevelCode: '4',
            gradeLevelId: 4,
        },
        {
            gradeLevelText: '5th Grade',
            gradeLevelCode: '5',
            gradeLevelId: 5,
        },
    ];

        return ( 
            <div className="questionBox">
                {this.state.gradeLevelList.map(
                    ({gradeLevelText, gradeLevelCode, gradeLevelId}) => (
                        <button key={gradeLevelId} 
                            className="answerBtn" >
                            {gradeLevelCode}-{gradeLevelText}
                        </button>
                    )
                )}             
            </div>
            );
    };

export default QuizConfig;


