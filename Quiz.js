let questionNumber = 1;
let correctAnswers = 0;
let wrongAnswers = 0;
let questionIndex = 0;
let questionsOfRandomOrder = [];
    const quizQuestions = [ {
            question: "What percentage of a human brain consists of fat?",
            choiceA: "60%",
            choiceB: "20%",
            choiceC: "50%",
            choiceD: "93%",
            correctAnswer: "choiceA"
        }, {
            question: "What was the hottest temperature ever recorded on Earth?",
            choiceA: "2,000,000,000&deg; F",
            choiceB: "2,000,000,000&deg; K",
            choiceC: "76,983,456&deg; C",
            choiceD: "20,456,763&deg; F",
            correctAnswer: "choiceB"
        }, {
            question: "Where is the hottest inhabitable place on Earth?",
            choiceA: "Sahara Desert",
            choiceB: "Death Valley",
            choiceC: "Dallol, Ethiopia",
            choiceD: "Dasht-e Lut",
            correctAnswer: "choiceC"
        }, {
            question: "Which animal is known for having the largest eyes among all animals?",
            choiceA: "Giant Squids",
            choiceB: "Lemurs",
            choiceC: "Sphynx Cats",
            choiceD: "Ostriches",
            correctAnswer: "choiceA"
        }, {
            question: "What is the only planet to spin clockwise?",
            choiceA: "Mars",
            choiceB: "Neptune",
            choiceC: "Earth",
            choiceD: "Venus",
            correctAnswer: "choiceD"
        }, {
            question: "What is the hashtag formally known as?",
            choiceA: "Pound",
            choiceB: "Octothorpe",
            choiceC: "Hash",
            choiceD: "Tag",
            correctAnswer: "choiceB"
        }, {
            question: "What is the only part of the human body that cannot heal itself?",
            choiceA: "Teeth",
            choiceB: "Liver",
            choiceC: "Heart",
            choiceD: "Pancreas",
            correctAnswer: "choiceA"
        },
];

    // shuffles and pushes 7 questions to questionsOfRandomOrder array (initialized as empty)
    function orderQuestions() { 
        while (questionsOfRandomOrder.length < 7) {
            const arbitrary = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
            if (!questionsOfRandomOrder.includes(arbitrary)) {
                questionsOfRandomOrder.push(arbitrary);
            }
        }
    }

    // displays next question and other germane quiz information
    function nextQuestion(index) {
        orderQuestions();
        const currentQuestion = questionsOfRandomOrder[index];
        document.getElementById("questionNumber").innerHTML = questionNumber;
        document.getElementById("correctAnswers").innerHTML = correctAnswers;
        document.getElementById("displayQuestion").innerHTML = currentQuestion.question;
        document.getElementById("aLabel").innerHTML = currentQuestion.choiceA;
        document.getElementById("bLabel").innerHTML = currentQuestion.choiceB;
        document.getElementById("cLabel").innerHTML = currentQuestion.choiceC;
        document.getElementById("dLabel").innerHTML = currentQuestion.choiceD;
    }

    function checkAnswer() {
        const currentQuestion = questionsOfRandomOrder[questionIndex];  
        const currentQuestionAnswer = currentQuestion.correctAnswer; 
        const choices = document.getElementsByName("choice"); 
        let correctAnswer = null;
    
        choices.forEach((choice) => {
            if (choice.value === currentQuestionAnswer) {
                correctAnswer = choice.labels[0].id;
            }
        })
        if (choices[0].checked === false && choices[1].checked === false && choices[2].checked === false && choices[3].checked == false) {
            document.getElementById("option-modal").style.display = "flex";
        }
    
        choices.forEach((choice) => {
            if (choice.checked === true && choice.value === currentQuestionAnswer) {
                document.getElementById(correctAnswer).style.backgroundColor = "green";
                correctAnswers++; 
                questionIndex++;
                questionNumber++;
            } else if (choice.checked && choice.value !== currentQuestionAnswer) {
                const wrongAnswer = choice.labels[0].id;
                document.getElementById(wrongAnswer).style.backgroundColor = "red";
                document.getElementById(correctAnswer).style.backgroundColor = "green";
                wrongAnswers++; 
                questionIndex++;
                questionNumber++;
            }
        })
    }

    // handles the event where the next button is clicked
    function handleNextQuestion() {
        checkAnswer();
        uncheckRadioButtons();
        if (questionIndex < 7) {
            nextQuestion(questionIndex);
            resetChoiceBackground();
        } else {
            handleEndGame();
        }
    }

    // sets choices background back to empty after display the right/wrong colors
    function resetChoiceBackground() {
        const choices = document.getElementsByName("choice");
        choices.forEach((choice) => {
            document.getElementById(choice.labels[0].id).style.backgroundColor = "";
        })
    }

    function uncheckRadioButtons() {
        const choices = document.getElementsByName("choice");
        for (let i = 0; i < choices.length; ++i) {
            choices[i].checked = false;
        }
    }

    // Displays results for when all questions have been answered
    function handleEndGame() {
        let feedback = null;
        let feedbackColor = null;

        if (correctAnswers < 5) {
            feedback = "You failed - better luck next time. :(";
            feedbackColor = "red";
        } else if (correctAnswers == 5) {
            feedback = "You passed. However, there is unequivocally room to improve."
            feedbackColor = "orange";
        } else if (correctAnswers == 6) {
            feedback = "Near perfect - one question off!";
            feedbackColor = "orange";
        } else {
            feedback = "You achieved a perfect score - job well done! :)";
            feedbackColor = "green";
        }
        const quizGrade = ((correctAnswers / 7) * 100).toFixed(2);

        // data to be displayed on score board
        document.getElementById("feedback").innerHTML = feedback;
        document.getElementById("feedback").style.color = feedbackColor;
        document.getElementById("gradePercentage").innerHTML = "You achieved a grade of: " + quizGrade + "%";
        document.getElementById("incorrectAnswers").innerHTML = wrongAnswers;
        document.getElementById("rightAnswers").innerHTML = correctAnswers;
        document.getElementById("score-modal").style.display = "flex";
    }

    // closes score modal, resets game and reshuffles questions
    function closeScoreModal() {
        questionNumber = 1;
        correctAnswers = 0;
        wrongAnswers = 0;
        questionIndex = 0;
        questionsOfRandomOrder = [];
        nextQuestion(questionIndex);
        document.getElementById("score-modal").style.display = "none";
    }

    // closes warning modal
    function closeOptionModal() {
        document.getElementById("option-modal").style.display = "none";
    }