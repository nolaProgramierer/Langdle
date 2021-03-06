class Cell {
    constructor(row, rowIndex, letter = "", color = 'white'){
        this.letter = letter;
        this.color = color;
        this.rowIndex = rowIndex;
        this.row = row;
        this.displayCell = () => `<div class='letter-box' data-row=${this.row} data-rowindex=${this.rowIndex}></div>`;
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

class Direction {
    constructor(color, label) {
        this.color = color;
        this.label = label;
    }         
}  // end Direction class


document.addEventListener("DOMContentLoaded", function(){


    /*-------global vars ---------------*/
    var firstRun = false; 
    var theCorrectAnswer = null; 
    var theGuessArr = []; 
    var CURRENT_ROW = 0; // used to access different rows for each of the user's guesses
    
    // Initialize new keyboard
    const key1 = new Keyboard();
    key1.displayKeys();

    createBoard();

    // Retrieve random 5-letter word from Wordnik API
    getWord(captureGuess); 
        
    // Guess button event handler
    document.querySelector('input[type=button]').addEventListener('click', function () {
        checkGuessWord();
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
        var btn = document.querySelector('#debug-btn');
        if (div.style.display === 'block') {
            btn.value = "Show debug form";
            div.style.display = 'none';
        } else {
            div.style.display = 'block';
            btn.value = "Hide debug form";
        }
    });

     // Show/hide legend div
     document.querySelector('#legend-btn').addEventListener('click', function() {
        var div = document.querySelector('#directions');
        var btn = document.querySelector('#legend-btn');
        if (div.style.display === 'block') {
            btn.value = "Show legend";
            div.style.display = 'none';
        } else {
            div.style.display = 'block';
            btn.value = "Hide legend";
        }
    });

    // Handle new game button
    document.querySelector('#new-game').addEventListener('click', function() {
        location.reload();
    });

    // Test for winner
    function isWinner(arr0, arr1) {
       if (arr0.join("") == arr1.join("")) {
           console.log("You're a winner");
           setTimeout(function() {
            alert("You've guessed the word!");
           }, 250);
           document.querySelector('#debug-form').style.display = "none";
           document.querySelector('#debug-btn').style.display = "none";
           document.querySelector('#new-game').style.display = "block";
           // Disable clicks in keyboard area
           document.querySelector('#keyboard').classList.add('disable-click');
       } else  {
           console.log("We're continuing");
       }
    }

   // Add word letters 
   function displayGeussInCell(indexOfLetter, letterToBeAdded) {
        enableGuessBtn(indexOfLetter);
        //console.log(theCorrectAnswer);
        console.log("Board row " + CURRENT_ROW);
        //let board = document.querySelector('#board-wrapper');
        let cellRow = document.querySelectorAll(`.letter-box[data-row="${CURRENT_ROW}"`);
        cellRow[indexOfLetter].innerHTML = letterToBeAdded;
        console.log("Letter was added at index of ", indexOfLetter, "letter = ", letterToBeAdded);
       
    }

    // After five letters entered in board, check word against random word
    function checkGuessWord() {
        console.log("the correct answer is", theCorrectAnswer);
        let board = document.querySelectorAll(`.letter-box[data-row="${CURRENT_ROW}"`);
        let currentGuess = [
            theGuessArr[CURRENT_ROW][0].letter, 
            theGuessArr[CURRENT_ROW][1].letter, 
            theGuessArr[CURRENT_ROW][2].letter,
            theGuessArr[CURRENT_ROW][3].letter,
            theGuessArr[CURRENT_ROW][4].letter].join("");

        checkGuessAgainstDict(currentGuess)
        .then ((status) => {
            if (status != 200) {
                console.log("WORD NOT FOUND");
                for (let i = 0; i < currentGuess.length; i ++) {
                    board[i].classList.add("not-word");
                }
            }
            else  {
                console.log("WORD FOUND"); 
                //  guess array check against the correct answer
                for (let i = 0; i < currentGuess.length; i ++) {
                    if (theCorrectAnswer[i].toLowerCase() == currentGuess[i].toLowerCase()){
                        board[i].classList.add("correct");
                    } else if ((theCorrectAnswer.includes(currentGuess[i]) && (theCorrectAnswer[i].toLowerCase() != theGuessArr[CURRENT_ROW][i]))) {
                        board[i].classList.add("partially-correct");
                    } else {
                        board[i].classList.add("wrong");
                    }
                }
                isWinner(currentGuess.split(""), theCorrectAnswer);
            }    
        });
        disableGuessBtn(currentGuess);
        CURRENT_ROW ++;
        console.log("The current row is ", CURRENT_ROW);
        hasRunOutOfGuesses(CURRENT_ROW);
    }// end checkGuessWord

    // Add keyboard guesses to array and call function to display letters in cell
    function captureGuess() {
       let maxLength = 5;
        console.log(theGuessArr); 
       
       document.querySelectorAll('.board-key').forEach(function(key) {
        key.addEventListener('click', function() {
            console.log("IN THE CAPTURE GUESS -  ROW NUMBER ", CURRENT_ROW); 
            let currentGuess = [
                theGuessArr[CURRENT_ROW][0].letter, 
                theGuessArr[CURRENT_ROW][1].letter, 
                theGuessArr[CURRENT_ROW][2].letter,
                theGuessArr[CURRENT_ROW][3].letter,
                theGuessArr[CURRENT_ROW][4].letter].join("");

            if (currentGuess.length < maxLength) {
                let indexOfLetter = currentGuess.length; 
                theGuessArr[CURRENT_ROW][indexOfLetter].letter = this.innerHTML; 
                displayGeussInCell(indexOfLetter, this.innerHTML);
            }
            else alert("Only 5 letters allowed");
        });
    });
    } // end captureGeuss


   function createBoard() {
    const boardWrapper = document.querySelector('#board-wrapper');
    const numGuesses = 6;
    const wordLength = 5;
    // Use map index arguments to establish data properties of cell
    theGuessArr = Array(numGuesses).fill().map((el, i) => Array(wordLength).fill().map((el, j) => new Cell(i,j)));
    console.log(`This is the array to create a word board`);
    boardWrapper.innerHTML = theGuessArr.reduce((s, guessArray) => s + guessArray.reduce((s, cell) => s + cell.displayCell(), ""), "");
}

    // Directions HTML
    var directionArr = [
        new Direction('lightgreen', "Correct letter, correct placement"),
        new Direction("yellow", "Correct letter, wrong placement"),
        new Direction("lightgray", "Letter not in word"),
        new Direction("red", "Word does not exist")
        ];

    var markup = directionArr.reduce((html, objItem) => {
    return html + `<div style='background-color:${objItem.color}'><p>${objItem.label}</p></div>`;
    }, "");
    document.querySelector('#directions').innerHTML = markup;


    function getWord(executeFunction) {
        let key = APIkey;
        let url = `https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&excludePartOfSpeech=given-name%2C%20family-name%2C%20abbreviation%2C%20imperative%2C%20idiom%2C%20phrasal-prefix%2C%20proper-noun%2C%20proper-noun-plural%2C%20proper-noun-posessive%2C%20suffix&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=5&api_key=${key}`;
        fetch (url)
        .then(response => response.json())
        .then(data => {
            console.log(1111); 
            document.querySelector('#game-word').innerText = data.word;
            console.log(`Random word is: ${data.word}`);
            theCorrectAnswer = data.word.split(""); 
            if (firstRun == false){
                executeFunction(); 
            }
            firstRun = true; 
        })  
        .catch(err => console.log(err.message));
    } // end getWord


  function checkGuessAgainstDict(word) {
        let key = APIkey;
        let url = `https://api.wordnik.com/v4/word.json/${word}/definitions?limit=1&includeRelated=false&sourceDictionaries=all&useCanonical=false&includeTags=false&api_key=${key}`;
        return fetch (url)
        .then(response => response.status)        
        .catch(err => console.log(err.message));
    }
  
    function enableGuessBtn(i) {
        if (i == 4) {
            console.log(i);
            document.querySelector('#keyboard input').removeAttribute('disabled');
        } else {
            document.querySelector('#keyboard input').setAttribute('disabled', '');
        }
    }

    function disableGuessBtn(guess) {
        if (guess.length == 5) {
            document.querySelector('#keyboard input').setAttribute('disabled', '');
        }
    }

    function hasRunOutOfGuesses(row) {
        if(row == 6) {
            console.log("This is row " + row);
           document.querySelector('#keyboard').classList.add('disable-click');
           document.querySelector('#debug-form').style.display = "none";
           document.querySelector('#debug-btn').style.display = "none";
           document.querySelector('#new-game').style.display = "block";
        }
    }


}); // End DOMContentLoaded

