document.addEventListener("DOMContentLoaded", function(){

    createBoard();
    //createKeyboard();

    const key1 = new Keyboard();
    key1.displayKeys();



    document.querySelector('form').addEventListener('submit', function(e) {
        let w = document.querySelector('#word-input').value;
        checkWord(w);
        e.preventDefault();
    });


    document.querySelector('input[type=button]').addEventListener('click', function () {
        console.log("Guess button clicked!");
    });

    document.querySelectorAll('.board-key').forEach(function(key) {
        key.addEventListener('mouseover', function() {
            key.style.backgroundColor= 'lightgray';
        });
    });
    document.querySelectorAll('.board-key').forEach(function(key) {
        key.addEventListener('mouseout', function() {
            key.style.backgroundColor = 'white';
        });
    });


   function Cell (letter = "", color = 'white') {
       this.letter = letter;
       this.color = color;
       this.displayCell = () => `<div class='letter-box'></div>`;
   }

   function Keyboard (letter = "", color = 'white') {
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
            //retrieve letter of keyboard chosen
        }
       };
   }


   
/*function createKeyboard() {
    let letterArr = [
        ['q','w','e','r','t','y','u','i','o','p'],
        ['a','s','d','f','g','h','j','k','l'],
        ['z','x','c','v','b','n','m']
    ];

    for (var i = 0; i < letterArr.length; i++) {
        let boardRow = document.createElement('div');
            boardRow.classList.add('board-row');
            
        for(var j = 0; j < letterArr[i].length; j ++) {
            let boardKey = document.createElement('div');
            boardKey.classList.add('board-key');
            boardKey.innerHTML = letterArr[i][j];
            boardRow.append(boardKey);
        }

        document.querySelector('#keyboard').append(boardRow);
        //retrieve letter of keyboard chosen
        
    }
}
*/
   function createBoard() {
    const boardWrapper = document.querySelector('#board-wrapper');
    const numGuesses = 6;
    const wordLength = 5;

    let arr = Array(numGuesses).fill().map(() => Array(wordLength).fill().map(() => new Cell()));
    console.log(arr);
    boardWrapper.innerHTML = arr.reduce((s, guessArray) => s + guessArray.reduce((s, cell) => s + cell.displayCell(), ""), "");
}

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

    console.log('DOM content parsed and loaded');
});