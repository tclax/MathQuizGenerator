import React, {Component} from "react";

class QuizStopwatch extends Component {
 
    state = {
        timerOn: false,
        timerStart: 0,
        timerTime: 0,
    }

    startTimer = () => {
        this.setState({
            timerOn: true,
            timerTime: this.state.timerTime,
            timerStart: Date.now() - this.state.timerStart
        });

        this.timer = setInterval(() => {
            this.setState( {
                timerTime: Date.now - this.state.timerStart
            });
        }, 10);
    };

    stopTimer = () => {
        this.setState({
            timerOn: false
        });

        clearInterval(this.timer);
    };

    resetTimer = () => {
        this.setTimer({
            timerStart: 0,
            timerTime: 0,
        });
    };

    render() {

        const { timerTime } = this.state;
        let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
        let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
        let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
        let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);

        return(
            <div className="stopwatch">
                <div className="stopwatch-header">Stopwatch</div>
                <div className="Stopwatch-display">
                    {hours} : {minutes} : {seconds} : {centiseconds}
                </div>
            </div>
        );
    }
}

export default QuizStopwatch;