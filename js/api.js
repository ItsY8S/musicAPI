// API

// Selectors
const form = document.querySelector("form");
const input = document.querySelector("form > input");
const cover = document.querySelectorAll('article > img');
const artistImage = document.querySelectorAll('.cover');
const album = document.querySelectorAll('article > h3');
const plays = document.querySelectorAll('article > h5');
const results = document.querySelector('#results');
let value = input.value;
let content = '';


function saveArtist(mbid) {
  console.log("oops", mbid);
}


function buildHTML(data) {
  const {
    artist
  } = data.results.artistmatches;

  artist.forEach(artist => {
    // build a single artist template
    console.log(artist.mbid);
    const id = artist.mbid
    content +=
      `<article onclick="saveArtist(${id})" >
        <img class="cover" src="${
          artist.image[3]["#text"] ? artist.image[3]["#text"] : 'images/placeholder.png' }" alt="Album Cover"/>
        <aside>
          <h3 class="artist">${artist.name}</h4>
          <h4 class="plays">Plays: ${artist.listeners}</h5>
        </aside>
       </article>`;

    console.log(artist.image[2]["#text"]);
    cover.src = artist.image[2];
  })

  results.innerHTML = content;
}


// Event Listener
form.addEventListener("submit", e => {
  e.preventDefault()
  value = input.value;
  console.log(value);
  const apikey = "375f63aa03654e88f0e2141ce6a9afb1";
  const endpoint = `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${value}&api_key=${apikey}&format=json`;
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


const button = document.querySelector('.closed');
const ul = document.querySelector('nav > ul');
const search = document.querySelector('#search');
const logo = document.querySelector('#logo');
const nav = document.querySelector('nav');

button.addEventListener('click', (e) => {
  ul.classList.toggle("open");
  search.classList.toggle("hidden");
  logo.classList.toggle("hidden");
  nav.classList.toggle("gray");
  console.log('clicked');
})


// const data = {
//   username: "Emily",
//   colors: ["red", "green", "blue", "purple"],
//   id: 1
// }
