document.addEventListener("DOMContentLoaded", function(){

    //createBoard();

    //createKeyboard();
    //const key1 = new Keyboard();
    //key1.displayKeys();

    //getWord();

    
    // Guess button event handler
    document.querySelector('input[type=button]').addEventListener('click', function () {
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


    // let currGame = new Game()
    function Game() {

        this.gameBoard = createBoard();
        this.keyBoard = new Keyboard();
        this.guessCount = 0;
        this.randomWord = getWord();
        
        function Cell (letter = "", color = 'white') {
            this.letter = letter;
            this.color = color;
            this.displayCell = () => `<div class='letter-box'></div>`;
            this.displayCellAsKey = () => {
                
            }
        }
     
        function Keyboard (letter = "", color = 'white') {
            // one dimensional
            this.symbolArr = [
             ['q','w','e','r','t','y','u','i','o','p'],
             ['a','s','d','f','g','h','j','k','l'],
             ['z','x','c','v','b','n','m']
         ];
            this.letter = letter;
            this.color = color;
            
            this.printKeyboard = 
            
            this.keyboardCellArray = Array(26).fill().map(() => new Cell());

            //this.keyboardCellArray[0].letter = 


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

        
        function createBoard() {
            const numGuesses = 6;
            const wordLength = 5;
            return  Array(numGuesses).fill().map(() => Array(wordLength).fill().map(() => new Cell()));
            
        }

        function printBoard() {
            const boardWrapper = document.querySelector('#board-wrapper');
            boardWrapper.innerHTML = this.gameBoard.reduce((s, guessArray) => s + guessArray.reduce((s, cell) => s + cell.displayCell(), ""), "");
        }

        function getWord() {
            var randomWord;
            let key = 'von6krqtargm9cl56x360sohbphxblcjinkqwf9zm6wny7ap4';
            let url = `https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=5&api_key=${key}`;
            fetch (url)
            .then(response => response.json())
            .then(data => {
                document.querySelector('#game-word').innerText = data.word;
                randomWord = data.word;
                console.log(randomWord);
                return randomWord;
            })
            .catch(err => console.log(err.message));
        }
     
    }// End Game class


   
   function displayGeuss(arr) {
       var board = document.querySelector('#board-wrapper');
     

   }
   captureGuess();
   // Capture guess from kieyboard input
   function captureGuess() {
       let maxLength = 5;
       geussArr = [];
       document.querySelectorAll('.board-key').forEach(function(key) {
        key.addEventListener('click', function() {
            if (geussArr.length < maxLength) {
                geussArr.push(this.innerHTML);
                // Game board at [0][0] return cells
                console.log(geussArr);
            } else alert("Only 5 letters allowed");
        });
    });
    return geussArr;
    }

   

    /*boardWrapper.innerHTML = arr.reduce((s, guessArray)=> {
      return s + guessArray.reduce((s, cell)=> {
          return s + cell.displayCell();
      }, "");
    }, "");*/

   
    function checkWord(word) {
        let key = 'f5585967-bcee-4822-914f-8ed623d8f5c0';
        let url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${key}`;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            let w = data[0].meta.stems[0];
                console.log(w);
        })
        .catch(err => console.log(err.message));
    }

    

});


