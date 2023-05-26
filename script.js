//ui vars
const score = document.getElementById('score');
const wordContainer = document.querySelector('.words-container');
const outputContainer = document.querySelector('.output-container');
const output = document.getElementById('output');
const lettersContainer = document.querySelector('.letters-container');
const congrats = document.querySelector('.congrats');
const clap = document.querySelector('.clap');
const continueBtn = document.getElementById('continue');

//score
let scoreIndex = 0;
//check for existing words arr
const checkwordsArr = [];

// word array and current word
let wordArr;
let currentWord;

// const data = [
//   { re: '^[NOSY]{3,4}$', words: 'NOSY,SON,SOY', letters: 'NYSO' },

//   { re: '^[MUCH]{3,4}$', words: 'MUCH,HUM,CHUM', letters: 'MCHU' },

//   { re: '^[SPAN]{3,4}$', words: 'SPAN,PAN,NAP', letters: 'NSAP' },

//   { re: '^[HOWL]{3,4}$', words: 'HOWL,LOW,OWL', letters: 'LHWO' },

//   { re: '^[WIDE]{3,4}$', words: 'WIDE,DIE,DEW', letters: 'IEWD' },
// ];

async function getData() {
  const res = await fetch('words.json');
  const data = await res.json();
  return data;
}

//iterator
function wordIterator(words) {
  let wordIndex = 0;

  return {
    next: function () {
      return wordIndex < words.length
        ? { value: words[wordIndex++], done: false }
        : resetGame();
    },
  };
}

//event listeners
function events() {
  // document.addEventListener('DOMContentLoaded', loadLetters);
  lettersContainer.addEventListener('click', displayLetters);
  continueBtn.addEventListener('click', continueGame);
}

//fetch data from local json file
getData().then((data) => {
  wordArr = wordIterator(data);
  currentWord = wordArr.next().value;
  loadLetters();
});

function getCurrentWord() {
  return {
    re: new RegExp(currentWord.re),
    words: currentWord.words.split(','),
  };
}

//load letters in dom
function loadLetters() {
  const letters = currentWord.letters.split('').reverse();

  letters.forEach((letter) => {
    lettersContainer.appendChild(createWords(letter, 'letter'));
  });
}

//display letters
function displayLetters(e) {
  if (e.target.className === 'letter') {
    output.style.display = 'block';
    output.value += e.target.textContent;
  }

  //check words at each click
  checkWords();
}

//spell words
function spellWord() {
  //loop through words
  getCurrentWord().words.forEach((word) => {
    switch (true) {
      // if word is correct
      case word.match(getCurrentWord().re).toString() === output.value:
        //add word to word container
        wordContainer.appendChild(createWords(word, 'word'));

        //add correct class to add green color
        output.classList.add('correct');

        //increase score index
        scoreIndex++;

        //set score textcontent to score index
        score.textContent = scoreIndex;

        //call congratulations function
        congratulations();

        //push word to checkWordsArr
        checkwordsArr.push(word);

        //reset output
        resetOutput('correct');

        break;

      //if word is not correct
      case output.value !== word.match(getCurrentWord().re).toString():
        //add class of wrong to display red
        output.classList.add('wrong');

        //reset and hide output
        resetOutput('wrong');
    }
  });

  displayContinueBtn();
}

//check words
function checkWords() {
  //if output length is greater or equal to 3 and does not exist in the check words array and spellword
  if (output.value.length >= 3 && !checkwordsArr.includes(output.value)) {
    spellWord();

    //else if output length is greater or equal to 3 and exist in the check words array
  } else if (output.value.length >= 3 && checkwordsArr.includes(output.value)) {
    //add class of exist for warning color
    output.classList.add('exist');

    //change output value
    output.value = 'word already exist';

    // reset and hide output
    resetOutput('exist');
  }
}

//create letter
function createWords(word, cls) {
  const span = document.createElement('span');

  span.className = cls;

  span.appendChild(document.createTextNode(word));

  return span;
}

function continueGame() {
  continueBtn.style.display = 'none';
  //continue game
  currentWord = wordArr.next().value;

  //set reg and word to current value
  getCurrentWord().re = currentWord.re;
  getCurrentWord().words = currentWord.words;

  //set letter and words container to nothing
  wordContainer.innerHTML = '';
  lettersContainer.innerHTML = '';

  //load new letters
  loadLetters();
}

function congratulations() {
  if (wordContainer.childElementCount === 3) {
    //hide output
    output.style.display = 'none';

    //display congratulations
    congrats.style.display = 'block';

    //hide congratulations after 2s
    setTimeout(() => {
      congrats.style.display = 'none';
    }, 2000);
  } else {
    //display clap for each correct word
    clap.style.display = 'block';

    //hide clap after 1s
    setTimeout(() => {
      clap.style.display = 'none';
    }, 1000);
  }
}

//check if correct words equal to 3 and display continue btn
function displayContinueBtn() {
  if (wordContainer.childElementCount === 3) {
    continueBtn.style.display = 'block';
  }
}

//reset output
function resetOutput(cls) {
  setTimeout(() => {
    output.value = '';
    output.classList.remove(cls);
    output.style.display = 'none';
  }, 1000);
}

//reset game
function resetGame() {
  alert('Game ended');
  location.reload();
}

events();
