document.addEventListener("DOMContentLoaded", function(){

    createBoard();
    createKeyboard();

    document.querySelector('form').addEventListener('submit', function(e) {
        let w = document.querySelector('#word-input').value;
        checkWord(w);
        e.preventDefault();
    });

    //checkWord("great");

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


    function MakeWord(ltr1, ltr2, ltr3, ltr4, ltr5){
        this.ltr1 = ltr1;
        this.ltr2 = ltr2;
        this.ltr3 = ltr3;
        this.ltr4 = ltr4;
        this.ltr5 = ltr5;
        this.word = function() {

        }

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

        for (let i = 1; i <= numGuesses; i++) {
            var row = document.createElement('div');
            row.classList.add('board-row');
            for (let j = 0; j < wordLength; j++) {
                var letterBox = document.createElement('div');
                letterBox.classList.add('letter-box');
                // set data attribute on individual cells per row 10,11, 12 ... 20, 21, 22...
                letterBox.setAttribute("data-cell-num", "" + i + j);
                row.append(letterBox);
            }
            boardWrapper.append(row);
        }
    }

   

    console.log('DOM content parsed and loaded');
});