var isGameStarted = false;
const alphabet = 'abcdefghijklmnopqrstuvwxyz';

var chosenWord = '';

var currentWord = '';
const wordsSubmitted = [];

var possibleWords = [];

var row, cell;

const solutionContainer = document.getElementById('solution-container');
const showSolutionButton = document.getElementById('show-solution-button');
const solutionText = document.getElementById('solution-text');

showSolutionButton.addEventListener('click', showSolution);

const feedback = document.getElementById('feedback');
const feedbackContainer = document.getElementById('feedback-container');

function loadJSON(path, callback){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                callback(new Map(Object.entries(JSON.parse(xhr.responseText))));
            } else {
                throw(xhr);
            }
        }
    };
    xhr.open('GET', path, true);
    xhr.send();
}

function getWords(data){
    var words = Array.from(data.keys());
    //console.log(Array.from(data.keys()));

    for(var i = words.length - 1; i >= 0; i--){
        if(words[i].length === 5){
            possibleWords.push(words[i]);
        }
    }
    getSolution();
}

function getSolution(){
    chosenWord = possibleWords[(Math.random()*(possibleWords.length - 1) + 1).toFixed(0)];
    solutionText.textContent = chosenWord;
    //For some reason, on the previous line, chosenWord.toUpperCase() returns 'undefined exception'.
    solutionText.textContent = solutionText.textContent.toUpperCase();
}

function showSolution(){
    if(solutionContainer.style.display == 'none'){
        solutionContainer.style.display = 'flex';
    } else if (solutionContainer.style.display == 'flex'){
        solutionContainer.style.display = 'none'
    } else { solutionContainer.style.display = 'flex' }
}

function victory(){
    const victoryText = document.createElement('p');
    victoryText.style.color = '#57f745';
    victoryText.textContent = 'Victory! Word was: "' + chosenWord + '"';
    document.getElementById('endgame-container').append(victoryText);
}

function loss(){
    const loseText = document.createElement('p');
    loseText.style.color = '#fc2323';
    loseText.textContent = 'You lose! Word was: "' + chosenWord + '"';
    document.getElementById('endgame-container').append(loseText);
}

function endGame(){
    if(isGameStarted){
        document.removeEventListener('keydown', (e) => game(e));
        const newGameButton = document.createElement('button');
        //Button styles
        newGameButton.textContent = 'New Game';
        newGameButton.style.height = '30px';
        newGameButton.style.width = '120px';
        newGameButton.style.border = '0px solid black';
        newGameButton.style.borderRadius = '4px';
        newGameButton.style.marginTop = '24px';
        newGameButton.style.margin = '0 auto';

        newGameButton.onclick = () => {window.location.href = window.location.href};

        document.getElementById('endgame-container').appendChild(newGameButton);
        isGameStarted = false;
    }
}

function getPosition(){
    const row = wordsSubmitted.length;
    const cell = currentWord.length - 1;
    if(row < 6){
        return [row, cell];
        
    } else {
        return [5, 4];
    }
    
}

function updateWord(){
    const [rowPosition, cellPosition] = getPosition(); 
    const rows = Array.from(document.getElementsByClassName('row'));
    const cell = rows[rowPosition].cells[cellPosition];
    

    return cell;
}

function game(e){
    const {key} = e;
        if(currentWord.length < 5 && currentWord.length > -1 && alphabet.includes(key.toLowerCase()) && isGameStarted){
            currentWord = currentWord + key;
            const currentPosition = updateWord();
            currentPosition.innerText = key.toUpperCase();
        } else if (key === 'Enter' && isGameStarted){
            if(currentWord === chosenWord && wordsSubmitted.length < 6){
                victory();
                endGame();
            } else if (currentWord != chosenWord && wordsSubmitted.length == 5){
                loss();
                endGame();
            };
            for(var i = 0; i < possibleWords.length; i++){
                if(currentWord == possibleWords[i]){
                    wordsSubmitted.push(currentWord);
                    currentWord = '';
                } else if (currentWord != possibleWords[i]){
                    if (currentWord == ''){
                        feedbackContainer.style.display = 'none';
                    } else {
                        feedbackContainer.style.display = 'flex';
                        feedback.textContent = currentWord + ' is not a valid word!';
                    }
                }
            }
        } else if (key === 'Backspace' && isGameStarted){
            const currentPosition = updateWord();
            currentWord = currentWord.substring(0, currentWord.length - 1);
            currentPosition.innerText = '';
        }
}

function startGame(){
    if(!isGameStarted){
        document.addEventListener('keydown', e => game(e));
        loadJSON('https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json', getWords);
        getSolution();        
        isGameStarted = true;
    }
}


startGame();