const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Que hechizo uso Harry para matar a Lord Voldemort?',
    answers: [
      { text: 'Expelliarmus', correct: true },
      { text: 'Expecto Patronum', correct: false },
      { text: 'Avada Kedabra', correct: false },
      { text: 'Accio', correct: false }
    ]
  },
  {
    question: 'Que Patronus pertenece a Luna Lovegood?',
    answers: [
      { text: 'Gama', correct: false },
      { text: 'Conejo', correct: true },
      { text: 'Perro', correct: false },
      { text: 'Caballo', correct: false }
    ]
  },
  {
    question: 'Que elemento esta asociado con Hufflepuff?',
    answers: [
      { text: 'Fuego', correct: false },
      { text: 'Agua', correct: false },
      { text: 'Aire', correct: false },
      { text: 'Tierra', correct: true }
    ]
  },
  {
    question: 'Como se llama el elfo domestico de la familia Black?',
    answers: [
      { text: 'Dobby', correct: false },
      { text: 'Winky', correct: false },
      { text: 'Kreacher', correct: true },
      { text: 'Hockey', correct: false }
    ]
  },
  {
    question: 'Que hace una mandragora cuando se desentierra?',
    answers: [
      { text: 'Baila', correct: false },
      { text: 'Eructa', correct: false },
      { text: 'Rie', correct: false },
      { text: 'Grita', correct: true }
    ]
  },
  {
    question: 'Que es un thestral?',
    answers: [
      { text: 'Un gigante', correct: false },
      { text: 'Un caballo alado invisible', correct: true },
      { text: 'Un cabeza encogida', correct: false },
      { text: 'Un duende', correct: false }
    ]
  }
]