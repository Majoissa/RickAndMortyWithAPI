const rootElement = document.querySelector("#root");
const navElement = document.createElement("div");
navElement.classList.add("nav-element");
const pageTitle = document.createElement("h2");
pageTitle.classList.add("pageTitle");
pageTitle.innerText = "Rick y Morty API";

const renderEpisodes = (episodes) => {
  const episodeContainer = document.createElement("div");
  episodeContainer.classList.add("episodeContainer");
  const ulElement = document.createElement("ul");
  ulElement.classList.add("ulElement");

  episodes.forEach((episode, index) => {
    const liElement = document.createElement("li");
    liElement.classList.add("liElement");
    const linkElement = document.createElement("a");
    linkElement.classList.add("linkElement");
    linkElement.href = "#";
    linkElement.textContent = `Episode ${index + 1}`;

    linkElement.addEventListener("click", () => {
      showEpisodeDetails(episode);
    });

    liElement.appendChild(linkElement);
    ulElement.appendChild(liElement);
  });

  const container = document.createElement("div");
  container.classList.add("container");
  navElement.appendChild(pageTitle);
  episodeContainer.appendChild(ulElement);
  rootElement.appendChild(navElement);
  rootElement.appendChild(container);
  container.appendChild(episodeContainer);
  container.appendChild(episodeDetailsContainer);
};

//creamos el contenido del showEpisodeDetails
const episodeDetailsContainer = document.createElement("div");
episodeDetailsContainer.classList.add("episodeDetailsContainer");

const showCharacter = (character, charactersContainer) => {
  const characterElement = document.createElement("div");
  characterElement.classList.add("characterElement");

  const characterImage = document.createElement("img");
  characterImage.classList.add("characterImage");
  characterImage.src = character.image;
  characterImage.alt = character.name;

  const characterName = document.createElement("h4");
  characterName.classList.add("characterName");
  characterName.textContent = character.name;

  const specieStatus = document.createElement("h3");
  specieStatus.classList.add("specieStatus");
  specieStatus.textContent = `${character.species} | ${character.status}`;

  characterElement.appendChild(characterImage);
  characterElement.appendChild(characterName);
  characterElement.appendChild(specieStatus);
  charactersContainer.appendChild(characterElement);
  episodeDetailsContainer.appendChild(charactersContainer);
  charactersContainer.appendChild(characterElement);
};

const showEpisodeDetails = (episode) => {
  episodeDetailsContainer.innerText = "";
  const titleElement = document.createElement("h1");
  titleElement.classList.add("titleElement");
  titleElement.textContent = episode.name;

  const dateElement = document.createElement("h3");
  dateElement.classList.add("dateElement");
  dateElement.textContent = `${episode.air_date} | ${episode.episode}`;

  const charactersContainer = document.createElement("div");
  charactersContainer.classList.add("charactersContainer");

  //Obtenemos los personajes del episodio
  const characterUrl = "https://rickandmortyapi.com/api/character";
  episode.characters.forEach((characterURL) => {
    fetch(characterURL)
      .then((response) => response.json())
      .then((character) => {
        showCharacter(character, charactersContainer);
      })
      .catch((error) => console.log(error));
  });
  episodeDetailsContainer.appendChild(titleElement);
  episodeDetailsContainer.appendChild(dateElement);
};

// Obtener los episodios de la API
fetch("https://rickandmortyapi.com/api/episode")
  .then((response) => response.json())
  .then((data) => {
    const episodes = data.results;
    renderEpisodes(episodes);
  })
  .catch((error) => console.log(error));
