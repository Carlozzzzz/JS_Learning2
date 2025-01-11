/**
    quiz algo
    
    create a list of questionaires / fetch from API
        : if it doesn't have an id, generate one
        {
            question_id:
            answer:
            isCorrect:
        }
    create a key value pair to store questionaire id and user answer
    populate the each questionaire on the input feilds based on the index of questionaire
        create an event for choices
        : check wheather the answer is correct or wrong
        : update the variable storing user answer
    after the answer is selected:
        display if it is correct | wrong
            : if wrong display as well the correct answer
        wait for 3 secc, then proceed to next questionaire
    when the user reach the last questionaire:
        display a message that the user finish the test
        wait for few sec to show the score is being calculated
        route the user the the result page then display the results. ( another set of algo from this one)
    
    
    ADD A TIMER EVENT   
        this should be an seperate entity
        attached it to each questionaire
            timer should be based on the current time
                so even the user refresh the page, the time wont reset
                think of a way, to make this happen even we dont have DB for this one
            count based on the timer
            automatically mark the questionaire wrong if there's no answer within the range of time
            display the correct answer, wait for three seconds then proceed to next questionnaire
            update the user score variable
*/



// ============================================
// Code starts here 
// ============================================


// initialize the HTML Elements

const questionIndexEle = document.getElementById('question_index');
const questionCountEle = document.getElementById('question_count');
const questionEle = document.getElementById('question');
const choiceListEle = document.getElementById('choices');
const timerEle = document.getElementById('timer');
const correctCounterEle = document.getElementById('correctAnsCounter');
const wrongCounterEle = document.getElementById('wrongAnsCounter');

const TIMER_DURATION = 5;
const ANSWER_DELAY = 1;

let currentQuestionIndex = 0;
let currentAnswer;
let timerInterval; // expected value is setInterval()
let nextQuestionCountdown = 0;
let correctAnswerCount = 0;
let wrongAnswerCount = 0;
let isCorrect = false;

// List of question, change it as you see fit, either from API or database
const questions = [
  {
    id: 'kjsdf899312ls',
    question: 'What is the capital of France?',
    choices: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    correct: 'Paris'
  },
  {
    id: 'bq239847adhf',
    question: 'What is the capital of Germany?',
    choices: ['Vienna', 'Berlin', 'Warsaw', 'Prague'],
    correct: 'Berlin'
  },
  {
    id: 'xmnv82314klhf',
    question: 'What is the capital of Spain?',
    choices: ['Lisbon', 'Madrid', 'Barcelona', 'Seville'],
    correct: 'Madrid'
  },
  // {
  //   id: 'cnbvq12837gdh',
  //   question: 'What is the capital of Italy?',
  //   choices: ['Venice', 'Florence', 'Rome', 'Milan'],
  //   correct: 'Rome'
  // },
  // {
  //   id: 'asdy72364fjdn',
  //   question: 'What is the capital of Portugal?',
  //   choices: ['Lisbon', 'Porto', 'Madrid', 'Valencia'],
  //   correct: 'Lisbon'
  // },
  // {
  //   id: 'plak32190fhdn',
  //   question: 'What is the capital of the United Kingdom?',
  //   choices: ['Dublin', 'Edinburgh', 'London', 'Manchester'],
  //   correct: 'London'
  // },
  // {
  //   id: 'mbv34287lska',
  //   question: 'What is the capital of Russia?',
  //   choices: ['Saint Petersburg', 'Moscow', 'Kazan', 'Sochi'],
  //   correct: 'Moscow'
  // },
  // {
  //   id: 'qlwo12345hgnf',
  //   question: 'What is the capital of Japan?',
  //   choices: ['Tokyo', 'Osaka', 'Kyoto', 'Nagoya'],
  //   correct: 'Tokyo'
  // },
  // {
  //   id: 'zxpl90381sklh',
  //   question: 'What is the capital of Australia?',
  //   choices: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'],
  //   correct: 'Canberra'
  // },
  // {
  //   id: 'trzn10293hkls',
  //   question: 'What is the capital of Canada?',
  //   choices: ['Toronto', 'Ottawa', 'Vancouver', 'Montreal'],
  //   correct: 'Ottawa'
  // }
];

let userAnswers = [];
/**
 * 
 const test = [
    {
        id: 'test',
        answer: 'Manila'
    }
 ];
 */

const saveUserAnswer = () => {
  const userAnswerDetails = {
    id: questions[currentQuestionIndex].id,
    answer: currentAnswer ?? '',
    isCorrect: isCorrect
  };
  userAnswers.push(userAnswerDetails);
  localStorage.setItem('USER_ANSWER_DETAILS', JSON.stringify(userAnswers)); // reupdate the user answers array everytime the answer is being change
}

const displayAnswer = (correctAnswer)=>  {

  const choicesEle = document.querySelectorAll('.choice');
  
  isCorrect ? (correctCounterEle.innerHTML = correctAnswerCount) : (wrongCounterEle.innerHTML = wrongAnswerCount);

  choicesEle.forEach(choice => {
    if(choice.textContent == correctAnswer) {
      choice.querySelector('img').classList.add('correct')
      choice.classList.add('correct-effect');
    }
    
    choice.style.pointerEvents = 'none';
  });
};

const answerTimeout = (correctAnswer) => {
  let countdown = ANSWER_DELAY;
  return new Promise((resolve) => {
  
    saveUserAnswer(); // make sure to save the user before incrementing the question index
  
    currentQuestionIndex++;
    sessionStorage.setItem('CURRENT_QUESTION_INDEX', currentQuestionIndex)
    
    displayAnswer(correctAnswer)
  
    const answerTimerInterval = setInterval(() => {
      
      if (countdown <= 1) {
        clearInterval(answerTimerInterval);
        
        sessionStorage.removeItem('TIMER_DURATION');
        // sessionStorage.removeItem('CURRENT_QUESTION_INDEX');
        
        if(currentQuestionIndex >= questions.length) {
          timerEle.textContent = 'Finished'
        }
        
        resolve();  // Resolve the promise when countdown is finished
      }
      countdown--;
      
      
    }, 1000);
  });
};

const startQuestionTimer = async (countdown) => {

  if (currentQuestionIndex >= questions.length) return false;
  
  if(sessionStorage.getItem('TIMER_DURATION')) {
    countdown = parseInt(sessionStorage.getItem('TIMER_DURATION'))
  } 
  
  if(countdown <= 1) timerEle.textContent = 1;
  else timerEle.textContent = countdown;
  
  
  clearInterval(timerInterval);
  
  timerInterval = setInterval( async () => {
    countdown--;
    sessionStorage.setItem('TIMER_DURATION', countdown);
    
    if(countdown <= 1) timerEle.textContent = 1;
    else timerEle.textContent = countdown;
    
    
    
    if(countdown <= 1) {
      const currentQuestion =  questions[currentQuestionIndex];
      const correctAnswer = currentQuestion.correct;
      
      clearInterval(timerInterval);

      isCorrect = false;
      wrongAnswerCount++;
      
      await answerTimeout(correctAnswer);
      processQuestion();
    }
  }, 1000);
};

const choicesClickEvent = () => {
  const choiceEvent = choiceListEle.querySelectorAll('.choice');

  choiceEvent.forEach(ele => {
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.correct;
    
  
    ele.addEventListener('click', async() => {
      const img = ele.querySelector('img');
      
      currentAnswer = ele.textContent;
      
      clearInterval(timerInterval); // resetting the timer for answer display
      
      if(correctAnswer === currentAnswer){
          console.log('correct');
          ele.classList.add('correct-effect');
          isCorrect = true;
          correctAnswerCount++;
          img.src = 'files/check.png';
          img.classList.add('correct');
      }
      else {
          console.log('may mali garrrrr');
          isCorrect = false;
          wrongAnswerCount++;
          img.src = 'files/wrong.png';
          img.classList.add('wrong')
      }
        
      ele.classList.add('choice-clicked');
      choiceEvent.forEach(choice => choice.style.pointerEvents = 'none'); // disable the pointer event to avoid duplicate answer
      
      await answerTimeout(correctAnswer);
      processQuestion();
    });
    
  });

};

const processQuestion = async() => {

  userAnswers = JSON.parse(localStorage.getItem('USER_ANSWER_DETAILS')) || [];
  currentQuestionIndex = parseInt(sessionStorage.getItem('CURRENT_QUESTION_INDEX')) ||  0;

  questionCountEle.textContent = questions.length;

  if(userAnswers.length >= questions.length || currentQuestionIndex >= questions.length || currentQuestionIndex < 0) {
    console.log('local', userAnswers)
    // display the last question answer here with the eme eme
    const lastQuestionAnswer = userAnswers.at(-1);
    const lastQuestion = questions.at(-1);
    
    console.log(lastQuestion)
    
    timerEle.textContent = 'Finished'
    questionIndexEle.textContent = currentQuestionIndex;
    questionEle.textContent = lastQuestion.question;
    
    
    choiceListEle.innerHTML = '';
    lastQuestion.choices.forEach( choice  => {
        
      const img = document.createElement('img')
      img.classList.add('icon')
      img.classList.add('no-answer')
      img.src = 'files/check.png';
      
      const li = document.createElement('li');
      li.textContent = choice;
      li.classList.add('choice')
      
      if(lastQuestion.correct == choice) {
        console.log('correct');
        li.classList.add('correct-effect');
        isCorrect = true;
        img.src = 'files/check.png';
        img.classList.add('correct');
        // mark the user answer
      }
      
      if(lastQuestionAnswer.answer == choice && lastQuestionAnswer.answer != lastQuestion.correct) {
        img.classList.add('wrong');
        img.src = 'files/wrong.png';
        li.classList.add('choice-clicked');
      }
      
      li.append(img)
      
      choiceListEle.append(li)
      
    });
    
    return false;
  }
  
  const currentQuestion = questions[currentQuestionIndex];
  
  questionIndexEle.textContent = currentQuestionIndex + 1;
  
  questionEle.textContent = currentQuestion.question;

  // looping though each choices then populate in on the field
  choiceListEle.innerHTML = '';
  currentQuestion.choices.forEach( choice  => {
      
    const img = document.createElement('img')
    img.classList.add('icon')
    img.classList.add('no-answer')
    img.src = 'files/check.png';
    
    const li = document.createElement('li');
    li.textContent = choice;
    li.classList.add('choice')
    li.append(img)
    
    choiceListEle.append(li)
  });
  
  startQuestionTimer(TIMER_DURATION);
  
  // add click event on each choices
  
  choicesClickEvent();
};


// Helpers



// run the app
processQuestion();