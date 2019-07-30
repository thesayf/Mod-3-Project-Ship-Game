console.log("this is wotrkig");

const submitButton = document.getElementById('submit-button')

submitButton.addEventListener("click", () => {

const input = document.getElementById('name-input').value

console.log(input);

fetch("http://localhost:3000/users", {
          method: "POST",
          body: JSON.stringify({
            name: input
          }),
          headers: {
            "Content-Type": "application/json"
          }
        }).then(response => response.json())


})
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
    // INSERT HIGHSCORES HERE USING A FETCH AND RENDER SCORES
})






// STARTING THE GAME
form.addEventListener("submit", (event) => {
    event.preventDefault()
    // fetch(UsersAPI) POST
    // START GAME
})





