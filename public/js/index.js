let currentPokemon;

newPokemon();

async function newPokemon() {
  let random = Math.floor(Math.random() * (750 - 1) + 1)
  let pokemon = await fetch ("https://pokeapi.co/api/v2/pokemon/" + random)
    .then(reponse => reponse.json())
    .then(response => {
      currentPokemon = response.name;
      return response;
    });
  
  let img = document.createElement("img");
  img.src = pokemon.sprites.front_default;
  img.classList.add("pokemon-image");
  img.style.filter = "grayscale(100%)";      

  img.addEventListener("load", () => {
    document.querySelector(".skeleton-img").remove();
  });

  document.querySelector(".pokemon-container").appendChild(img);
}


let limit;
document.querySelector(".pokemon-input").addEventListener("keyup", (event) => {
  limit = 0;
  document.querySelector(".suggestions").innerHTML = "";
  let input = document.querySelector(".pokemon-input").value;

  if (input == "") {
    document.querySelector(".suggestions").style.display = "none";
    document.querySelector(".pokemon-input").style.borderBottomRightRadius = "5px";
    document.querySelector(".pokemon-input").style.borderBottomLeftRadius = "5px";
  } else {
    document.querySelector(".suggestions").style.display = "block";
    document.querySelector(".pokemon-input").style.borderBottomRightRadius = "0";
    document.querySelector(".pokemon-input").style.borderBottomLeftRadius = "0";
  }

  for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].startsWith(input)) {
      if (limit < 5) {
        let span = document.createElement("span");
        span.innerText = pokemonList[i];
        span.classList.add("suggestion");
        span.addEventListener("click", (event) => {
          let value = event.target.innerText;

          document.querySelector(".suggestions").style.display = "none";
          document.querySelector(".pokemon-input").style.borderBottomRightRadius = "5px";
          document.querySelector(".pokemon-input").style.borderBottomLeftRadius = "5px";
          document.querySelector(".pokemon-input").focus();
          document.querySelector(".pokemon-input").value = "";
          
          
          document.querySelector(".pokemon-image").style.filter = "unset";
          document.querySelector(".overlay").style.display = "block";

          if (value == currentPokemon) {
            document.querySelector(".score-status").innerText = "Right Answer";
          } else {
            document.querySelector(".score-status").innerText = "Wrong Answer";
          }

          setTimeout(() => {
            document.querySelector(".overlay").style.display = "none";

            if (value == currentPokemon) {
              document.querySelector(".pokemon-container").innerHTML = `
                <div class="skeleton-img">
                  <div class="loader"></div>
                </div>
              `;
              addScore();
              newPokemon();
            } else {
              document.querySelector(".pokemon-container").innerHTML = `
                <div class="skeleton-img">
                  <div class="loader"></div>
                </div>
              `;
              removeScore();
              newPokemon();
            }
          }, 3000);          
        })
        document.querySelector(".suggestions").appendChild(span)
      }
      limit ++;
    }
  }

  if (event.keyCode == 13) {
    let pokemon = "";

    if (input != "") {
      pokemon = getInputPokemon(input);
    }

    if (pokemon != "") {
      document.querySelector(".suggestions").style.display = "none";
      document.querySelector(".pokemon-input").style.borderBottomRightRadius = "5px";
      document.querySelector(".pokemon-input").style.borderBottomLeftRadius = "5px";
      document.querySelector(".pokemon-input").value = "";
      document.querySelector(".pokemon-input").focus();

      document.querySelector(".pokemon-image").style.filter = "unset";
      document.querySelector(".overlay").style.display = "block";

      if (pokemon == currentPokemon && pokemon != null) {
        document.querySelector(".score-status").innerText = "Right Answer";
      } else {
        document.querySelector(".score-status").innerText = "Wrong Answer";
      }

      setTimeout(() => {
        document.querySelector(".overlay").style.display = "none";

        if (pokemon == currentPokemon && pokemon != null) {
          document.querySelector(".pokemon-container").innerHTML = `
            <div class="skeleton-img">
              <div class="loader"></div>
            </div>
          `;
          addScore();
          newPokemon();
        } else {
          document.querySelector(".pokemon-container").innerHTML = `
            <div class="skeleton-img">
              <div class="loader"></div>
            </div>
          `;
          removeScore();
          newPokemon();
        }
      }, 3000);
    }
  }
})
  
function getInputPokemon(input) {

  for (let i = 0; i < pokemonList.length; i++) {
    if (input == pokemonList[i]) {
      return pokemonList[i];
    }
  }

  for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].startsWith(input)) {
      return pokemonList[i]
    }
  }

  return null;
}

document.querySelector(".hint").addEventListener("click", () => {
  document.querySelector(".hint").innerText = "First letters in name: " + currentPokemon.slice(0, 3);
  
  setTimeout(() => {
    document.querySelector(".hint").innerText = "Get a hint";
  }, 3000)
});

function addScore() {
  score++;
  localStorage.setItem("score", score);
  document.querySelector(".score").innerText = score;
}

function removeScore() {
  if (score == 0) return;
  score--;
  localStorage.setItem("score", score);
  document.querySelector(".score").innerText = score;
}