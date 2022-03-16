
import {
  filterGender,
  filterSpecies,
  searchName,
  percentage,
  orderResults,
} from "./data.js";
import data from "./data/rickandmorty/rickandmorty.js";
function showOnCards(data) {
  document.getElementById("card-information").innerHTML = data
    .map(
      (item) =>
        `   
        <div class="container-card">
    <article class="content-card">
      <div class="flip-card">
        <section class="front-card">
          <img class="image-card" src="${item.image}" alt="Imagem dos personagens">
          <div class="name text-card">${item.name}</div>
          <p class="text-card more-info">Saiba mais</p>
        </section>
        <section class="back-card">
        <ul class="text-card">
        <li>Status:${item.status}</li>
        <li>Espécie:${item.species}</li>
        <li>Origem:${item.origin.name}</li>
        <li>Gênero:${item.gender}</li>
        <li>Episódios:${item.episode.length}</li>
        </ul>
        </section>
      </div>
    </article>
  </div>
  `
    )
    .join("");
}
showOnCards(data.results);

const genderSelection = document.getElementById("filters-genders");
const speciesSelection = document.getElementById("filters-species");
const alphabetical = document.getElementById("alphabetic-sequence");
const statisticText = document.getElementById("statistics-infos");
const nameCharacter = document.getElementById("filters-names");
const clearButtons = document.getElementById("clear-all");

genderSelection.addEventListener("change", showGender);
speciesSelection.addEventListener("change", showSpecies);
alphabetical.addEventListener("change", showOrdem);
statisticText.addEventListener("change", showStatistics);
nameCharacter.addEventListener("keyup", nameCharacters);
clearButtons.addEventListener("click", clearFilters);

function showGender(e) {
  const genderResults = filterGender(data.results, e.target.value);
  const statisticGender = `${percentage(
    data.results.length,
    genderResults.length
  )}% dos personagens`;
  showStatistics(statisticGender);
  return showOnCards(genderResults);
}


function showSpecies(e) {
  const resultSpecies = filterSpecies(data.results, e.target.value);
  const statisticSpecies = `${percentage(
    data.results.length,
    resultSpecies.length
  )}% dos personagens`;
  showStatistics(statisticSpecies);
  return showOnCards(resultSpecies);
}

function nameCharacters(e) {
  const characters = searchName(data.results, e.target.value);
  const statisticName = `${percentage(
    data.results.length,
    characters.length
  )} % dos personagens`;
  showStatistics(statisticName);
  return showOnCards(characters);
}


function showStatistics(data) {
  statisticText.innerHTML = `Está porcentagem representa ${data} dos personagens`;
  statisticText.style.display = "flex";
}


function showOrdem(e) {
  const orderScreen = orderResults(data.results, e.target.value);
  return showOnCards(orderScreen);
}


function clearFilters() {
  location.reload(); 
}


function backToTop() {
  if (window.scrollY >= 100) {
    
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
}
const backToTopButton = document.querySelector(".back-to-top"); 
window.addEventListener("scroll", function () {
  backToTop(); 
});