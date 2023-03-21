const score = document.getElementById('score');
const wordContainer = document.querySelector('.word-containers');
const outputContainer = document.querySelector('.output-container');
const output = document.getElementById('output');
const letterContainer = document.querySelector('.letters-container');
const congrats = document.querySelector('.congrats');
const clap = document.querySelector('.clap');
const continueBtn = document.getElementById('continue');

//load letters on dcl
document.addEventListener('DOMContentLoaded', loadLetters);

//data
const data = [
  {re: '^[NOSY]{3,4}$',
   words:'NOSY,SON,SOY',
   letters: 'NYSO'},

   {re: '^[MUCH]{3,4}$',
   words: 'MUCH,HUM,CHUM',
   letters: 'MCHU'},

   {re: '^[SPAN]{3,4}$',
   words:'SPAN,PAN,NAP',
   letters: 'NSAP'},

   {re: '^[HOWL]{3,4}$',
   words:'HOWL,LOW,OWL',
   letters: 'LHWO'},

   {re: '^[WIDE]{3,4}$',
   words:'WIDE,DIE,DEW',
   letters: 'IEWD'},
];

//iterator
function wordIterator(words){
  let wordIndex = 0;

  return {
    next: function(){
      return (wordIndex < words.length) ?
      {value: words[wordIndex++], done: false} :
      {done: true}
    }
  }
};

//iterate through data
let wordArr = wordIterator(data);

//get iterator value
let currentWord = wordArr.next().value;

//set iterator values
let re = new RegExp(currentWord.re);
let words = currentWord.words.split(',');
let cw = []

//loadletter fun
function loadLetters(){
 let letters = currentWord.letters.split('').reverse();
 letters.forEach(letter => {
  letterContainer.innerHTML += `<span class= "letter">${letter}</span>`;
 })
};

//addeventlistener to buttons
letterContainer.addEventListener('click', displayletters);
continueBtn.addEventListener('click', continueGame)

//display letters
function displayletters(e){
  if(e.target.className === 'letter'){
    output.style.display = 'block';
    output.value += e.target.textContent;
  }
  
  checkExistingWord();
};

//check if word is correct
function checkWords(){
 //turn words to array
  words = currentWord.words.split(',');

  //loop through words
  words.forEach(word => {
    if(String(word.match(re)) === output.value){
     wordContainer.innerHTML += `<span class="word">${word}</span>`;
     output.classList.add('correct');

     setTimeout(() => {
      output.classList.remove('correct');
     }, 1000)
      
     celebration();
        
    score.textContent++

      cw.push(word)
    } else if

    (output.value !== String(word.match(re))){
      output.classList.add('wrong');

      setTimeout(() => {
       output.classList.remove('wrong');
       output.value = '';
       output.style.display = 'none';
      }, 1000);
      }  
  });

  displayContinueBtn();
};

function displayContinueBtn(){
//check if correct words equal to 3 and display continue btn 
if(wordContainer.childElementCount === 3){
 continueBtn.style.display = 'block'
   }
};

function celebration(){
if(wordContainer.childElementCount === 3){
  output.style.display = 'none'
  congrats.style.display = 'block'

  setTimeout(() => {
    congrats.style.display = 'none'
  }, 2000)}
  
   else {
  clap.style.display = 'block'

  setTimeout(() => {
    clap.style.display = 'none'
  }, 2000)}};

//check for existing word
function checkExistingWord(){
  if(output.value.length >= 3 && !cw.includes(output.value)){
     checkWords();
  } else if(output.value.length >= 3 && cw.includes(output.value)) {
    output.classList.add('exist')
    output.value = 'Word already exist'; 

    setTimeout(() => {
      output.classList.remove('exist')
      output.value = ''; 
      output.style.display = 'none';
    }, 1000)
  }};

//continue game
function continueGame(){
  continueBtn.style.display = 'none'

  //next word 
 currentWord = wordArr.next().value;
 
 //clear word and letter container
 letterContainer.innerHTML = '';
 wordContainer.innerHTML = '';   
 
 //set reg and word to current value
 re = new RegExp(currentWord.re);
 words = currentWord.words.split(',');
 
 //call functions
 loadLetters();
 checkWords();
};
