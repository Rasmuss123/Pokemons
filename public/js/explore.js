document.querySelector(".search-input").addEventListener("keyup", function(){
  document.querySelector(".search-results").innerHTML = "";

  let value = document.querySelector(".search-input").value;
  if (value == "") return;

  for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].startsWith(value)) {
      fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonList[i])
        .then(response => response.json())
        .then(function(response) {
          let item = document.createElement("div");
          item.classList.add("item");
          item.innerHTML = `
            <div class="image">
              <img src="${response.sprites.front_default}">
            </div>
            <span class="name">${response.name}</span>
          `
          document.querySelector(".search-results").appendChild(item);
        });
    }
  }
});