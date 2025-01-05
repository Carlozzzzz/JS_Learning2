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

const TIMER_DURATION = 10;
const ANSWER_DELAY = 1;

let currentQuestionIndex = 0;
let currentAnswer;
let timeControl; // hold object
let timerInterval; // expected value is setInterval()
let answerTimerInterval; // expected value is setInterval()
let nextQuestionCountdown = 0;
let correctAnswerCount = 0;
let wrongAnswerCount = 0;
let isCorrect = false;

// sessionStorage.setItem('quizProgress', 'test');
// const storeProgress = sessionStorage.getItem('quizProgress');
// console.log('Session: ', storeProgress)


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
  {
    id: 'cnbvq12837gdh',
    question: 'What is the capital of Italy?',
    choices: ['Venice', 'Florence', 'Rome', 'Milan'],
    correct: 'Rome'
  },
  {
    id: 'asdy72364fjdn',
    question: 'What is the capital of Portugal?',
    choices: ['Lisbon', 'Porto', 'Madrid', 'Valencia'],
    correct: 'Lisbon'
  },
  {
    id: 'plak32190fhdn',
    question: 'What is the capital of the United Kingdom?',
    choices: ['Dublin', 'Edinburgh', 'London', 'Manchester'],
    correct: 'London'
  },
  {
    id: 'mbv34287lska',
    question: 'What is the capital of Russia?',
    choices: ['Saint Petersburg', 'Moscow', 'Kazan', 'Sochi'],
    correct: 'Moscow'
  },
  {
    id: 'qlwo12345hgnf',
    question: 'What is the capital of Japan?',
    choices: ['Tokyo', 'Osaka', 'Kyoto', 'Nagoya'],
    correct: 'Tokyo'
  },
  {
    id: 'zxpl90381sklh',
    question: 'What is the capital of Australia?',
    choices: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'],
    correct: 'Canberra'
  },
  {
    id: 'trzn10293hkls',
    question: 'What is the capital of Canada?',
    choices: ['Toronto', 'Ottawa', 'Vancouver', 'Montreal'],
    correct: 'Ottawa'
  }
];

const userAnswers = [];
/**
 * 
 const test = [
    {
        id: 'test',
        answer: 'Manila'
    }
 ];
 */


const startQuestionTimer = async (countdown) => {

  if (currentQuestionIndex >= questions.length) {
    // process the resuls here
    timerEle.innerHTML = `Time's up.`
    
    return false;
  }
  
  if(sessionStorage.getItem('TIMER_DURATION')) {
    countdown = sessionStorage.getItem('TIMER_DURATION')
  }
  
  timerEle.textContent = countdown;
  
  clearInterval(timerInterval);
  
  timerInterval = setInterval(async () => {
    countdown--;
    
    sessionStorage.setItem('TIMER_DURATION', countdown);
    const test = sessionStorage.getItem('TIMER_DURATION');
    console.log(test)
    
    timerEle.textContent = countdown;
  
    if(countdown <= 1) {
      const choicesEle = document.querySelectorAll('.choice')
      const currentQuestion = questions[currentQuestionIndex];
      const correctAnswer = currentQuestion.correct;
      
      clearInterval(timerInterval);
      sessionStorage.removeItem('TIMER_DURATION');
      
      isCorrect = false;
      wrongAnswerCount++;
      
      const userAnswerDetails = {
        id: currentQuestion.id,
        answer: '',
        isCorrect: isCorrect
      };

      userAnswers.push(userAnswerDetails);
      
      displayAnswer(choicesEle, correctAnswer);
      
      await answerTimeout();
      processQuestion();
    }
  }, 1000);


};


const answerTimeout = () => {
  let countdown = ANSWER_DELAY;
  return new Promise((resolve) => {
    const answerTimerInterval = setInterval(() => {
      countdown--;
      
      if (countdown <= 1) {
        clearInterval(answerTimerInterval);
        currentQuestionIndex++;
        
        // update the wrong count element here
        
        
        if(currentQuestionIndex >= questions.length) {
          timerEle.textContent = 'Finished'
          console.log(currentQuestionIndex)
          sessionStorage.removeItem('TIMER_DURATION');
        }
        
        resolve();  // Resolve the promise when countdown is finished
      }
    }, 1000);
  });
};

const displayAnswer = (choicesEle, correctAnswer) => {

  isCorrect ? (correctCounterEle.innerHTML = correctAnswerCount) : (wrongCounterEle.innerHTML = wrongAnswerCount);
  sessionStorage.removeItem('TIMER_DURATION');
  console.log(isCorrect)
  
  choicesEle.forEach(choice => {
    if(choice.textContent == correctAnswer) {
      choice.querySelector('img').classList.add('correct')
      choice.classList.add('correct-effect');
    }
  });
};

const processQuestion = async() => {

  if(currentQuestionIndex < 0) return false;
  
  if(currentQuestionIndex >= questions.length) {
    console.log('Finished: ', userAnswers);
    sessionStorage.removeItem('TIMER_DURATION');
    return false;
  }
  
  questionIndexEle.textContent = currentQuestionIndex + 1;
  questionCountEle.textContent = questions.length;
  
  const currentQuestion = questions[currentQuestionIndex];
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
  const choiceEvent = choiceListEle.querySelectorAll('.choice');
  
  choiceEvent.forEach(ele => {
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.correct;
  
    ele.addEventListener('click', async() => {
      const img = ele.querySelector('img');
      
      currentAnswer = ele.textContent;
      
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
        
      displayAnswer(choiceEvent, correctAnswer);
      
      ele.classList.add('choice-clicked');
      choiceEvent.forEach(choice => choice.style.pointerEvents = 'none'); // disable the pointer event to avoid duplicate answer
      
      // update the user anwer
      const userAnswerDetails = {
        id: currentQuestion.id,
        answer: currentAnswer,
        isCorrect: isCorrect
      };

      clearInterval(timerInterval);
      
      userAnswers.push(userAnswerDetails);
      await answerTimeout();
      console.log(userAnswers)
      processQuestion();
      // repopulate the question here==========================================================
    });
    
  });
};



// run the app
processQuestion();

