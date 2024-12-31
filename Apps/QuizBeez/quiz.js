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

let currentQuestionIndex = 0;
let timer = 0;
let timerInterval; // expected value is setInterval()


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


// dynamic array for user answer
/**
 * 
 const test = [
		{
				id: 'test',
				answer: 'Manila'
		}
 ];
 */
const userAnswers = [];

// populate questionnaire

// need to get the first questionnaire
// by answering will only proceed to next question


const awaitNextQuestion = () => {
	
	// assign the value for timer e.g : 3 sec
	// create a setInterval funtion, then if the timer is == 0, proceed the next question, else continue to count
	
	timer = 1;
	
	timerInterval = setInterval(() => {
		timer--;
		// console.log(`Running: ${timer}`)
	
		if(timer <= 1) {
			clearInterval(timerInterval);
			currentQuestionIndex++;
			populateQuestion();
		}
		
	}, 10);
};


const populateQuestion = () => {

	if(currentQuestionIndex < 0) return false;
	
	if(currentQuestionIndex >= questions.length) {
		console.log('Finished: ', userAnswers);
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
	
	
	// add click event on each choices
	const choiceEvent = choiceListEle.querySelectorAll('.choice');

	choiceEvent.forEach(ele => {
		ele.addEventListener('click', () => {
			const img = ele.querySelector('img');
			
			const currentAnswer = ele.textContent;
			let isCorrect = false;
			if(currentQuestion.correct === currentAnswer){
					console.log('correct');
					isCorrect = true;
					img.src = 'files/check.png';
					img.classList.add('correct');
			}
			else {
					console.log('may mali garrrrr');
					img.src = 'files/wrong.png';
					img.classList.add('wrong')
			}
			
			ele.classList.add('choice-clicked');
			// ele.classList.add('disable-pointer');
			choiceEvent.forEach(choice => choice.style.pointerEvents = 'none');
			
			// update the user anwer
			// wait for 3 seconds then proceed to next question
			const userAnswerDetails = {
				id: currentQuestion.id,
				answer: currentAnswer,
				isCorrect: isCorrect
			};
			
			userAnswers.push(userAnswerDetails);
			
			awaitNextQuestion();
			
		});
	});

};

populateQuestion();
