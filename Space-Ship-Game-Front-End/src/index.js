// submitButton.addEventListener("click", () => {

// const input = document.getElementById('name-input').value

// console.log(input);

// fetch("http://localhost:3000/users", {
//           method: "POST",
//           body: JSON.stringify({
//             name: input
//           }),
//           headers: {
//             "Content-Type": "application/json"
//           }
//         }).then(response => response.json())


// })
// _____________________________________________________________
// MENU DEFINE
const game = document.querySelector('#game')
const ship = document.querySelector('#ship')
// const background = document.querySelector('#background')
const form = document.querySelector('#form')
const musicBtn = document.querySelector('#musicbtn')
const instBtn = document.querySelector('#instructionsbtn')
const highScoresBtn = document.querySelector('#highscoresbtn')
const rightmenu = document.querySelector('#rightmenu')
const leftmenu = document.querySelector('#leftmenu')
let playToggle = 0
// GAME DEFINE
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const UP_ARROW = 38
const DOWN_ARROW = 40
const GAME_WIDTH = 800
const GAME_HEIGHT = 400
let ROCKS = 0
let rockArray = []
let LEVEL = 1
let SCORE = 0
let MULTIPLIER = 0
let gameInterval = null
let levelInterval = null

document.addEventListener('DOMContentLoaded', () => {
    sound()
    console.log("Loaded")
})

// MENU FUNCTIONALITY
function sound(){
        const music = document.createElement("audio");
        music.src = "Sparkwood+&+21 copy.mp3";
        music.id = "music"
        music.setAttribute("preload", "auto");
        music.setAttribute("controls", "none");
        music.style.display = "none";
        document.body.appendChild(music);
}

musicBtn.addEventListener("click", () => {
    const tunes = document.querySelector('#music')
    if(playToggle == 0){
        playToggle += 1
        tunes.play()
    } else {
        playToggle -= 1
        tunes.pause()
    }
})

instBtn.addEventListener("click", () => {
    rightmenu.innerHTML = ""
    const instructions = document.createElement('div')
    instructions.id = "instructions"
    instructions.innerHTML = "<p>HOW TO PLAY:<br><br>Use the arrow keys (&larr;&rarr;&uarr;&darr;) to fly your ship through the asteroid field.<br><br>Use [SPACE] to shoot asteroids and bonus aliens!</p>"
    rightmenu.appendChild(instructions)
})

highScoresBtn.addEventListener("click", () => {

    rightmenu.innerHTML = ""
    fetch("http://localhost:3000/scores")
    .then(res => res.json())
    .then(allScores => displayHighScores(allScores))

    // INSERT HIGHSCORES HERE USING A FETCH AND RENDER SCORES
})

const displayHighScores = (allScores) => {
let newScores = allScores.sort((a, b) => (a.score < b.score) ? 1 : -1)
const highScoresList = document.createElement('div')
highScoresList.id = "hi-scores"

for(let i =0; i < newScores.length; i++){
  const eachScoreEntry = document.createElement("p")
  // eachScoreEntry.innerText = `${i+1}` + `${newScores[i].user.name}` +  "   " + `${newScores[i].score}`
  eachScoreEntry.innerHTML = `${i+1} - ${newScores[i].user.name} - ${newScores[i].score}`

  highScoresList.appendChild(eachScoreEntry)
}

  info.appendChild(highScoresList)

}


// ________________STARTING THE GAME_______________________________
form.addEventListener("submit", (event) => {
    event.preventDefault()

    // fetch(UsersAPI) POST
    // START GAME
    runGame()
})

function runGame(){
  ship.style.visibility = "visible"
  ship.style.left = "-10px"

  ship.style.top = "175px"
  
  rightmenu.style.visibility = "hidden"
  leftmenu.style.visibility = "hidden"
  document.addEventListener('keydown', moveShip)
  
  LEVEL = 1
  SCORE = 0
  MULTIPLIER = 0
  ROCKS = 0
  

  setInterval(function(){
    clearInterval(gameInterval)
    gameInterval = setInterval(function() {
      createRock(Math.floor(Math.random() * (GAME_HEIGHT - 20)))
    }, 1000/LEVEL)
  }, 10000)
  // gameInterval = setInterval(function() {
  //   createRock(Math.floor(Math.random() * (GAME_HEIGHT - 20)))
  // }, 1000)


  levelInterval = setInterval(function(){
    LEVEL += 0.1
  }, 5000)

  scoreInterval = setInterval(function(){
    SCORE += 1
  }, 1000)
}

// SHIP MOVEMENT_______________________________________
function moveShip(e) {
  const code = e.which

  if ([UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW].indexOf(code) > -1) {
    e.preventDefault()
    e.stopPropagation()
  }

  if (code === LEFT_ARROW) {
    moveShipLeft()
  } else if (code === RIGHT_ARROW) {
    moveShipRight()
  } else if (code === UP_ARROW) {
    moveShipUp()
  } else if (code === DOWN_ARROW) {
    moveShipDown()
  }
}

function moveShipLeft(){
  console.log("Left")
  window.requestAnimationFrame(function() {
    const left = positionToInteger(ship.style.left)

    if (left > -20) {
      ship.style.left = `${left - 10}px`;
    }
  })
}

function moveShipRight(){
  console.log("Right")
  window.requestAnimationFrame(function() {
    const left = positionToInteger(ship.style.left)
    if (left < 730) {
      ship.style.left = `${left + 10}px`;
    }
  })
}

function moveShipDown(){
  console.log("Down")
  window.requestAnimationFrame(function() {
    const top = positionToInteger(ship.style.top)

    if (top < 375) {
      ship.style.top = `${top + 10}px`;
    }
  })
}
function moveShipUp(){
  console.log("Up")
  window.requestAnimationFrame(function() {
    const top = positionToInteger(ship.style.top)

    if (top > -20) {
      ship.style.top = `${top - 10}px`;
    }
  })
}


function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}
// _________________________________________________________


// Creating ROCKS___________________________________________
function createRock(x) {
  const rock = document.createElement('div')
  rock.className = 'rock'
  rock.style.top = `${x}px`
  let width = rock.style.width = 20
  rock.style.width = `${width}`
  let height = rock.style.height = 20
  rock.style.height = `${height}`
  let left = rock.style.left = 800
  game.appendChild(rock)
 
  function moveRock() {
    rock.style.left = `${left -= LEVEL}px`;

    checkCollision(rock)

    if (left > -100) {
      window.requestAnimationFrame(moveRock)
    } else {
      rock.remove()
    }
  }

  window.requestAnimationFrame(moveRock)


  ROCKS += 1
  rockArray.push(rock)
  // return rock
}



function checkCollision(rock) {
  
    const shipLeftEdge = positionToInteger(ship.style.left)
    const shipRightEdge = shipLeftEdge + 50;
    const shipTopEdge = positionToInteger(ship.style.top)
    const shipBottomEdge = shipTopEdge + 50;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockTopEdge = positionToInteger(rock.style.top)
    const rockRightEdge = rockLeftEdge + 20
    const rockBottomEdge = rockTopEdge + 20

    if (
      // (rockLeftEdge <= shipLeftEdge && rockRightEdge >= shipLeftEdge) ||
      // (rockLeftEdge >= shipLeftEdge && rockRightEdge <= shipRightEdge) ||
      // (rockLeftEdge <= shipRightEdge && rockRightEdge >= shipRightEdge)
    
      (rockLeftEdge >= shipLeftEdge && rockLeftEdge <= shipRightEdge && rockTopEdge <= shipBottomEdge && rockTopEdge >= shipTopEdge)||
      (rockRightEdge <= shipRightEdge && rockRightEdge >= shipLeftEdge && rockBottomEdge >= shipTopEdge && rockBottomEdge <= shipBottomEdge)||
      (rockLeftEdge >= shipLeftEdge && rockLeftEdge <= shipRightEdge && rockBottomEdge >= shipTopEdge && rockBottomEdge <= shipBottomEdge)||
      (rockRightEdge <= shipRightEdge && rockRightEdge >= shipLeftEdge && rockTopEdge <= shipBottomEdge && rockTopEdge >= shipTopEdge)
    ){endGame()}

}

function endGame(){
  console.log("GAME OVER")
  

  
  
// Create new Instance of a User
form.addEventListener("submit", (event) => {
    event.preventDefault()
    const playerName = document.getElementById('name').value

    if (playerName === "")
    {
      alert("Please Enter A Player Name to begin");
    }
    else{
      fetch("http://localhost:3000/users", {
                method: "POST",
                body: JSON.stringify({
                  name: playerName
                }),
                headers: {
                  "Content-Type": "application/json"
                }
              }).then(response => response.json())
              .then(user => startGame(user))
    }
})

/// Starts a new game generates a fake high score and sends it to databse for the Instanceof the user
const startGame = (user) => {
let randomHighScore = Math.floor((Math.random() * 1000) + 1);
fetch("http://localhost:3000/scores", {
          method: "POST",
          body: JSON.stringify({
            user_id: user.user.id,
            score: randomHighScore
          }),
          headers: {
            "Content-Type": "application/json"
          }
        }).then(res => res.json())

}
