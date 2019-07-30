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
