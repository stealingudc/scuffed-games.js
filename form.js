var isGameStarted = true;
var difficulty = 'askreddit';

const button = document.getElementById('form-button');
const title = document.getElementById('form-title');
const body = document.getElementById('form-body');

const playerForm = document.getElementById('form');
const enemyForm = document.getElementById('enemy-form');

const difficultyDropdownButton = document.getElementById('dropdown-button');
const difficultyDropdownContent = document.getElementById('dropdown');

const currentDifficultyText = document.getElementById('current-difficulty');

var titleContent = '';
var bodyContent = '';

var enemyTitleContent = '';
var enemyBodyContent = '';

const endgameContainer = document.getElementById('endgame');

function startGame(){
    isGameStarted = true;
}

function endGame(){
    isGameStarted = false;
    //Couldn't removeEventListener(). Not sure why :(
    button.remove();
    const disabledButton = document.createElement('button');

    disabledButton.textContent = 'Submit';
    disabledButton.style.height = '30px';
    disabledButton.style.width = '80px';
    disabledButton.style.border = '0px solid black';
    disabledButton.style.borderRadius = '4px';
    disabledButton.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';

    playerForm.appendChild(disabledButton);
}

function submit(){
    submitButton();
    async () => {console.log(getPost())};
    console.log(getPlayerQuery());
}

//Difficulty buttons
document.getElementById('easy-diff').addEventListener('click', () => {difficulty = 'askreddit'; currentDifficultyText.textContent = 'Selected: Easy (r/AskReddit)'});
document.getElementById('medium-diff').addEventListener('click', () => {difficulty = 'javascript'; currentDifficultyText.textContent = 'Selected: Medium (r/JavaScript)'});
document.getElementById('hard-diff').addEventListener('click', () => {difficulty = 'amitheasshole'; currentDifficultyText.textContent = 'Selected: Hard (r/amitheasshole)'});

//Difficulty toggle
function dropdown(){
    difficultyDropdownButton.addEventListener('click', () => {
        console.log('event')
        console.log(difficultyDropdownContent.style.display)
        if(difficultyDropdownContent.style.display == 'none'){
            difficultyDropdownContent.style.display = 'flex';
            console.log('button')
        } else if (difficultyDropdownContent.style.display == 'flex'){
            difficultyDropdownContent.style.display = 'none'
        } else { difficultyDropdownContent.style.display = 'flex' };
    });
}

dropdown();

function getPlayerQuery(){
    const title = document.getElementById('form-title');
    const body = document.getElementById('form-body');

    return [title.value, body.value];
}

function victory(){
    const victoryText = document.createElement('p');
    victoryText.style.color = '#57f745';
    victoryText.textContent = 'Victory!';

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

    endgameContainer.appendChild(victoryText);
    endgameContainer.appendChild(newGameButton);
}

function loss(){
    const loseText = document.createElement('p');
    loseText.style.color = '#fc2323';
    loseText.textContent = 'You lose!';

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

    endgameContainer.appendChild(loseText);
    endgameContainer.appendChild(newGameButton);
}

function compareScores(){
    const playerContent = titleContent + bodyContent;
    const enemyContent = enemyTitleContent + enemyBodyContent;

    const playerScore = document.createElement('p');
    playerScore.style.color = 'white';
    playerScore.style.justifySelf = 'center';
    playerScore.textContent = 'Characters: ' + playerContent.length.toString();
    playerForm.appendChild(playerScore);

    const enemyScore = document.createElement('p');
    enemyScore.style.color = 'white';
    enemyScore.style.justifySelf = 'center';
    enemyScore.textContent = 'Characters: ' + enemyContent.length.toString();
    enemyForm.appendChild(enemyScore);

    if(playerContent.length > enemyContent.length){
        console.log(playerContent.length, enemyContent.length);
        console.log('You won!');
        endGame();
        victory();
    } else if (playerContent.length < enemyContent.length){
        console.log(playerContent.length, enemyContent.length);
        endGame();
        loss();
    } else { console.log(playerContent.length, enemyContent.length); console.log('Draw!'); endGame(); }
}

function submitButton(){
    getPost();
    titleContent = title.value;
    bodyContent = body.value;

    enemyForm.style.visibility = 'visible';
}



async function getPost(){
    fetch('https://www.reddit.com/r/' + difficulty + '/hot.json')
        .then((res) => {return res.json();})
        .then((res) => {
            //Data sorting
            const postsArray = res.data.children;
            const currentPost = postsArray[(Math.random()*(10 - 1) + 1).toFixed(0)];
            enemyTitleContent = currentPost.data.title;
            enemyBodyContent = currentPost.data.selftext;
            //Game logic
            appendEnemyText();
            compareScores();
            return [currentPost.data.title, currentPost.data.selftext];
        })
        .catch(err => console.log(err));
}

function appendEnemyText(){
    const enemyTitle = document.getElementById('enemy-form-title');
    const enemyBody = document.getElementById('enemy-form-body');

    enemyTitle.value = enemyTitleContent;
    enemyBody.value = enemyBodyContent;
}

function game(){
    console.log(button);
    button.addEventListener('click', (e) => submit(e));
}

game();