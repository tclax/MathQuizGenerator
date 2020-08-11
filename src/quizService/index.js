let qBank = [
    {
        question: "1 + 1",
        answers: ["1", "2", "3", "4"],
        correct: "2",
        questionId: "0",
    },
    {
        question: "1 + 2",
        answers: ["1", "2", "3", "4"],
        correct: "3",
        questionId: "1",
    },
    {
        question: "1 + 3",
        answers: ["1", "2", "3", "4"],
        correct: "4",
        questionId: "2",
    },
    {
        question: "4 + 1",
        answers: ["5", "2", "3", "4"],
        correct: "5",
        questionId: "3",
    },
    {
        question: "4 x 4",
        answers: ["14", "16", "18", "15"],
        correct: "16",
        questionId: "4",
    },
    {
        question: "1 + 0",
        answers: ["1", "2", "3", "4"],
        correct: "1",
        questionId: "5",
    },
]

function GenerateQuestionBank() {
    qBank = [];
    var i;
    for(i = 0; i < 5; i++){
        var operand1 = Math.floor((Math.random() * 10) + 1);
        var operand2 = Math.floor((Math.random() * 10) + 1);
        var answer = (operand1 + operand2);
        qBank.push({
            question: operand1.toString() + " " + operand2.toString(),
            answers: [answer.toString(), (answer - 1).toString(), (answer + 1).toString(), (answer + 5).toString()],
            correct: answer.toString(),
            questionId: i.toString(),
        });
    }

    return qBank;
}


export default (n = 5) => 
    Promise.resolve(qBank.sort(() => 0.5 - Math.random()).slice(0, n));

    