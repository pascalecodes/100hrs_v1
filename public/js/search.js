// search.js

const searchForm = document.querySelector('form');

const searchInput = document.querySelector('#search-input');

const searchButton = document.querySelector('#search-button');
const searchResults = document.querySelector('#search-results');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent page refresh
  searchResults.innerHTML = ''; // clear previous search results
  const query = searchInput.value;
  fetch(`/find?q=${query}`)
    .then(response => response.json())
    .then(results => {
      results.forEach(result => {
        const post = `<a href="/posts/${result._id}"><h2>${result.title}</h2></a>
                         <p>${result.text.slice(0, 50)}...</p>`;
        searchResults.innerHTML += post;
      });
      console.log(query)
    })
    .catch(error => console.log(error));
  searchInput.value = ''; // clear input field




});