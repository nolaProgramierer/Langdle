class Cell {
    constructor(letter = "", color = 'white'){
        this.letter = letter;
        this.color = color;
        this.displayCell = () => `<div class='letter-box'></div>`;
 }

} // end Cell class

 class Keyboard  {
    constructor(letter = "", color = 'white') {
        this.symbolArr = [
         ['q','w','e','r','t','y','u','i','o','p'],
         ['a','s','d','f','g','h','j','k','l'],
         ['z','x','c','v','b','n','m']
     ];
        this.letter = letter;
        this.color = color;
        this.displayKeys = function() {
         for (var i = 0; i < this.symbolArr.length; i++) {
             let boardRow = document.createElement('div');
                 boardRow.classList.add('board-row'); 
             for(var j = 0; j < this.symbolArr[i].length; j ++) {
                 this.letter = document.createElement('div');
                 this.letter.classList.add('board-key');
                 this.letter.innerHTML = this.symbolArr[i][j];
                 boardRow.append(this.letter);
             }
             document.querySelector('#keyboard').append(boardRow);
         }
        };
    }
} // end Keyboard class


class Game {
    constructor(apiKey){
        this.apiKey = apiKey; 
    }
    setUpDOM() {
        this.getWord(this.getWord);
    }
    getWord() {}
}


document.addEventListener("DOMContentLoaded", function(){

    createBoard();
   
    var guess = ""; 

    //createKeyboard();
    const key1 = new Keyboard();
    key1.displayKeys();

    // Random 5-letter word from API
    getWord(captureGuess());

    // test word
    var testWordArr = "sword".split("");


    

    // Guess button event handler
    document.querySelector('input[type=button]').addEventListener('click', function () {
        checkGuessWord(guess, testWordArr);
        console.log("Guess button clicked!");
    });

    // Keyboard mouseover handler
    document.querySelectorAll('.board-key').forEach(function(key) {
        key.addEventListener('mouseover', function() {
            key.style.backgroundColor= 'lightgray';
        });
    });
    // Keyboard mouseout handler
    document.querySelectorAll('.board-key').forEach(function(key) {
        key.addEventListener('mouseout', function() {
            key.style.backgroundColor = 'white';
        });
    });
    // Show/hide debug div
    document.querySelector('#debug-btn').addEventListener('click', function() {
        var div = document.querySelector('#debug-form');
        if (div.style.display === 'none') {
            div.style.display = 'block';
        } else {
            div.style.display = 'none';
        }
    });


   
   function displayGeussInCell(indexOfLetter, letterToBeAdded, theCorrectAnswer) {
       console.log(theCorrectAnswer);
        let board = document.querySelector('#board-wrapper');
        board.children[indexOfLetter].innerHTML = letterToBeAdded;
        console.log("Letter was added at index of ", indexOfLetter, "letter = ", letterToBeAdded); 
        /*if (theCorrectAnswer[indexOfLetter].toLowerCase() == letterToBeAdded.toLowerCase()){
            board.children[indexOfLetter].classList.add("correct"); 
        } else if ((theCorrectAnswer.includes(letterToBeAdded) && (theCorrectAnswer[indexOfLetter].toLowerCase() != letterToBeAdded))) {
            board.children[indexOfLetter].classList.add("partially-correct");
        } else {
            board.children[indexOfLetter].classList.add("wrong");
        }*/
    }

    function checkGuessWord(guesses, theCorrectAnswer) {
        let board = document.querySelector('#board-wrapper');
        console.log(theCorrectAnswer);
        console.log(guesses);
        for (let i = 0; i < guesses.length; i ++) {
            // go through the guess array and check against the correct answer
            if (theCorrectAnswer[i].toLowerCase() == guesses[i].toLowerCase()){
                board.children[i].classList.add("correct"); 
            } else if ((theCorrectAnswer.includes(guesses[i]) && (theCorrectAnswer[i].toLowerCase() != guesses[i]))) {
                board.children[i].classList.add("partially-correct");
            } else {
                board.children[i].classList.add("wrong");
            }
        }
    }

   function captureGuess(theCorrectAnswer) {
       let maxLength = 5;
       guessArr = [];
       document.querySelectorAll('.board-key').forEach(function(key) {
        key.addEventListener('click', function() {
            if (guessArr.length < maxLength) {
                let indexOfLetter = guessArr.length; 
                guessArr.push(this.innerHTML);
                displayGeussInCell(indexOfLetter, this.innerHTML, theCorrectAnswer);
                console.log(guessArr);
            } else alert("Only 5 letters allowed");
        });
    });
    guess = guessArr;
    } // end captureGeuss


   function createBoard() {
    const boardWrapper = document.querySelector('#board-wrapper');
    const numGuesses = 6;
    const wordLength = 5;

    let arr = Array(numGuesses).fill().map(() => Array(wordLength).fill().map(() => new Cell()));
    console.log(arr);
    boardWrapper.innerHTML = arr.reduce((s, guessArray) => s + guessArray.reduce((s, cell) => s + cell.displayCell(), ""), "");
}


    function getWord(nextCodeToExecuteCallBCK) {
        let key = 'von6krqtargm9cl56x360sohbphxblcjinkqwf9zm6wny7ap4';
        let url = `https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=5&api_key=${key}`;
        fetch (url)
        .then(response => response.json())
        .then(data => {
            document.querySelector('#game-word').innerText = data.word;
            console.log(`Random word is: ${data.word}`);
            console.log(data.word.split(""));
            
        })
        .then(nextCodeToExecuteCallBCK)
        .catch(err => console.log(err.message));
    }
});


const game = new Game("adfafdfAPIKEY"); 
game.setUpDOM(); 
