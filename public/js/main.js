let score = localStorage.score || 0;
if (!localStorage.score) localStorage.setItem("score", 0);

document.querySelector(".score").innerText = score;


let pokemonList = [];

(async function() {
  await fetch("https://pokeapi.co/api/v2/pokemon/?limit=1000")
    .then(reponse => reponse.json())
    .then(response => {
      for (let i = 0; i < response.results.length; i++) {
        pokemonList.push(response.results[i].name)
      }
    });
})();