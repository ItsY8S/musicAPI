// API

// Selectors
const form = document.querySelector("form");
const input = document.querySelector("form > input");
const cover = document.querySelectorAll('article > img');
const album = document.querySelectorAll('article > h3');
const plays = document.querySelectorAll('article > h5');
const results = document.querySelector('#results');
let value = input.value;
let content = '';


function buildHTML(data) {
  const {
    artist
  } = data.results.artistmatches;
  content += `<h1>Results for ${value}</h1>`
  artist.forEach(artist => {
    // build a single artist template
    content +=
      `<article>

        <img id="cover" src="${
          artist.image[3]["#text"] ? artist.image[3]["#text"] : 'images/placeholder.png' }" alt="Album Cover">
        <h3 id="artist">${artist.name}</h3>
        <h5 id="plays">Plays: ${artist.listeners}</h5>
       </article>`;

    console.log(artist.image[2]["#text"]);
    cover.src = artist.image[2];
  })

  content += `<button>View more on last.fm</button>`;

  results.innerHTML = content;
}


// Event Listener
form.addEventListener("submit", e => {
  e.preventDefault()
  value = input.value;
  console.log(value);
  const apikey = "375f63aa03654e88f0e2141ce6a9afb1";
  const endpoint = `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${value}&api_key=${apikey}&format=json`;
  fetch(endpoint)
    .then(response => {
      if (response.ok) {
        return response.json();
        console.log(response.json());
      } else {
        return Promise.reject('something went wrong!')
      }
    })
    .then(data => buildHTML(data))
    .catch(error => console.log('error is', error));
})
