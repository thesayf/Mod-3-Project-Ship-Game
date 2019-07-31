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
const ship = document.querySelector('#ship')
const background = document.querySelector('#background')
const form = document.querySelector('#form')
const musicBtn = document.querySelector('#musicbtn')
const instBtn = document.querySelector('#instructionsbtn')
const highScoresBtn = document.querySelector('#highscoresbtn')
const info = document.querySelector('#info')
let playToggle = 0

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
    info.innerHTML = ""
    const instructions = document.createElement('div')
    instructions.id = "instructions"
    instructions.innerHTML = "<p>INSTRUCTIONS:<br><br>Use the arrow keys (&larr;&rarr;&uarr;&darr;) to fly your ship through the asteroid field.<br><br>Use [SPACE] to shoot asteroids and bonus aliens!</p>"
    info.appendChild(instructions)
})

highScoresBtn.addEventListener("click", () => {
    info.innerHTML = ""
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
