document.addEventListener("DOMContentLoaded", function(){

    createBoard();
    createKeyboard();

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

   function Keyboard(letter = "", color = 'white') {
       this.letter = letter;
       this.color = color;
       this.displayKeys = displayKeys;
   }

   function createKeyboard() {
    let letterArr = ['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m'];
    let secondRowBegin = letterArr.indexOf('p');
    let thirdRowBegin = letterArr.indexOf('l');
    for (ltr of letterArr) {
        let boardKey = document.createElement('div');
            boardKey.classList.add('board-key');
            boardKey.innerHTML = ltr;
        if (letterArr.indexOf(ltr) <= secondRowBegin) {
            document.querySelector('#row1').append(boardKey);
        } else if (letterArr.indexOf(ltr) <= thirdRowBegin) {
            document.querySelector('#row2').append(boardKey);
        } else {
            document.querySelector('#row3').append(boardKey);
        }
        //retrieve letter of keyboard chosen
        boardKey.addEventListener('click', function() {
            console.log(this.innerHTML);
        });
    }
}

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