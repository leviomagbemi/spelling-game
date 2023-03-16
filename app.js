//UI variables
const btnCon = document.getElementById('btncon');
const input = document.querySelector('input');
const anscon = document.querySelector('#anscon');


// let score = 0;



//eventlistner
btnCon.addEventListener('click', getBtnValue);


//regular expression
let re = /^[NOSY]{3,4}$/;


const str =['NOSY', 'SON', 'SOY'];

letters = str[0].split("").reverse();

document.getElementById('score').textContent

//match word with re
function getWords(){
 
  str.forEach(word => {
    if(input.value.length >= 3 && word.match(re) != input.value){
      input.classList.add('bg-danger', 'text-light');

      setTimeout(() => {
        input.classList.remove('bg-danger', 'text-light');
        input.value = '';
      }, 1000)

  } else if(word.match(re) == input.value) {
    input.classList.remove('bg-danger');

      //initialize span  
      let span = document.createElement('span');  

       span.className = 'btn btn-success mx-1 my-1';

       span.id = 'spantext'

      span.appendChild(document.createTextNode(word))
        
  
      //append span
      anscon.appendChild(span)

      //clear input
      input.value = '';
      
      document.getElementById('score').textContent++

      // gettext(document.querySelectorAll('#spantext'))
      
  }});
  };

  

 

//loop through letters
document.addEventListener('DOMContentLoaded', () => {


  let span = '';

  letters.forEach(letter => {
  span += `<span class="btn btn-primary mx-1" id="btnLet">${letter}</span>`;
  });
  
  btnCon.innerHTML = span;

});

function getBtnValue(e){
  if(e.target.className === 'btn btn-primary mx-1'){
    input.value += e.target.textContent;
  };

  if(input.value == gettext(document.querySelectorAll('#spantext'))){
    alert('Word already exist');
    input.value = '';
  } else {
    getWords();
 } 
 congrats(document.querySelectorAll('#spantext'))
}
 

function gettext(spantext){
  let text = '';

  spantext.forEach((tex) => {
  text = tex.textContent;
  })

return text;
}

function congrats(spanlength){
   if(spanlength.length == 3){
  alert('congratulations')
 }
}


















  