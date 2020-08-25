import React from 'react';

const QuizStopwatch = (props) => {

  let centiseconds = ("0" + (Math.floor(props.timerTime / 10) % 100)).slice(-2);
  let seconds = ("0" + (Math.floor(props.timerTime / 1000) % 60)).slice(-2);
  let minutes = ("0" + (Math.floor(props.timerTime / 60000) % 60)).slice(-2);
  let hours = ("0" + Math.floor(props.timerTime / 3600000)).slice(-2);

  // console.log('timerTime: ' + props.timerTime); 
  // console.log('centiseconds: ' + centiseconds); 
  // console.log('seconds: ' + seconds); 
  // console.log('minutes: ' + minutes); 
  // console.log('hours: ' + hours); 
  return(
    <div className="stopwatch-display">
      {hours} : {minutes} : {seconds} : {centiseconds}
    </div>
  )
}

export default QuizStopwatch