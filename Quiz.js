        document.addEventListener('DOMContentLoaded', function() {
            // Quiz questions and answers
            let quizData=JSON.parse(localStorage.getItem("Questions"));
            

            // DOM elements
            const startScreen = document.getElementById('start-screen');
            const quizScreen = document.getElementById('quiz-screen');
            const resultsScreen = document.getElementById('results-screen');
            const startBtn = document.getElementById('start-btn');
            const prevBtn = document.getElementById('prev-btn');
            const nextBtn = document.getElementById('next-btn');
            const submitBtn = document.getElementById('submit-btn');
            const restartBtn = document.getElementById('restart-btn');
            const questionText = document.getElementById('question-text');
            const optionsContainer = document.getElementById('options-container');
            const currentQuestionElement = document.getElementById('current-question');
            const questionsLength = document.getElementsByClassName('questions-Length');
            const progressBar = document.getElementById('progress-bar');
            const scoreValue = document.getElementById('score-value');
            const scoreFeedback = document.getElementById('score-feedback');
            const correctAnswers = document.getElementById('correct-answers');

            // Quiz state
            let currentQuestion = 0;
            let score = 0;
            let userAnswers = new Array(quizData.length).fill(null);
            console.log(questionsLength);
            for (let i = 0; i < questionsLength.length; i++) {
                questionsLength[i].innerHTML = quizData.length;
            }

            // Initialize the quiz
            startBtn.addEventListener('click', startQuiz);
            restartBtn.addEventListener('click', restartQuiz);
            prevBtn.addEventListener('click', showPreviousQuestion);
            nextBtn.addEventListener('click', showNextQuestion);
            submitBtn.addEventListener('click', showResults);

            // Start the quiz
            function startQuiz() {
                if (quizData.length === 0) {
                    return;
                }
                startScreen.style.display = 'none';
                quizScreen.style.display = 'block';
                loadQuestion();
                updateProgressBar();
            }

            // Load the current question
            function loadQuestion() {
                const question = quizData[currentQuestion];
                questionText.textContent = question.Question;
                currentQuestionElement.textContent = currentQuestion + 1;
                
                optionsContainer.innerHTML = '';
                question.lstOptions.forEach((option, index) => {
                    const optionElement = document.createElement('div');
                    optionElement.classList.add('option');
                    if (userAnswers[currentQuestion] === index) {
                        optionElement.classList.add('selected');
                    }
                    optionElement.textContent = option;
                    optionElement.addEventListener('click', () => selectOption(index));
                    optionsContainer.appendChild(optionElement);
                });
                
                // Update navigation buttons
                prevBtn.style.display = currentQuestion === 0 ? 'none' : 'block';
                nextBtn.style.display = currentQuestion === quizData.length - 1 ? 'none' : 'block';
                submitBtn.style.display = currentQuestion === quizData.length - 1 ? 'block' : 'none';
            }

            // Select an option
            function selectOption(index) {
                userAnswers[currentQuestion] = index+1;
                const options = document.querySelectorAll('.option');
                options.forEach(option => option.classList.remove('selected'));
                options[index].classList.add('selected');
            }

            // Show previous question
            function showPreviousQuestion() {
                if (currentQuestion > 0) {
                    currentQuestion--;
                    loadQuestion();
                    updateProgressBar();
                }
            }

            // Show next question
            function showNextQuestion() {
                if (currentQuestion < quizData.length - 1) {
                    currentQuestion++;
                    loadQuestion();
                    updateProgressBar();
                }
            }

            // Update progress bar
            function updateProgressBar() {
                const progress = ((currentQuestion + 1) / quizData.length) * 100;
                progressBar.style.width = `${progress}%`;
            }

            // Show results
            function showResults() {
                // Calculate score
                score = 0;
                let feedbackText = "";
                let correctAnswersText = "";
                userAnswers.forEach((answer, index) => {
                    if (answer == quizData[index].Answer) {
                        score++;
                    }
                    
                    correctAnswersText += `Q${index + 1}: ${quizData[index].lstOptions[quizData[index].Answer-1]}<br>`;
                });
                
                // Display score and feedback
                scoreValue.textContent = `${score}/${quizData.length}`;
                
                if (score === quizData.length) {
                    feedbackText = "Perfect! You're a JavaScript expert!";
                } else if (score >= quizData.length * 0.7) {
                    feedbackText = "Great job! You have a good understanding of JavaScript.";
                } else if (score >= quizData.length * 0.5) {
                    feedbackText = "Good effort! Keep learning and try again.";
                } else {
                    feedbackText = "Keep studying JavaScript fundamentals and try again.";
                }
                
                scoreFeedback.textContent = feedbackText;
                correctAnswers.innerHTML = "<strong>Correct Answers:</strong><br>" + correctAnswersText;
                
                // Show results screen
                quizScreen.style.display = 'none';
                resultsScreen.style.display = 'block';
            }

            // Restart the quiz
            function restartQuiz() {
                currentQuestion = 0;
                score = 0;
                userAnswers = new Array(quizData.length).fill(null);
                
                resultsScreen.style.display = 'none';
                startScreen.style.display = 'block';
            }
        });