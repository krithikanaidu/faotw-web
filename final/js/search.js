// Spoonacular API Configuration
const API_KEY = '419ceef056db4bf0a2dfd5909b6bb61c'; // Replace with your actual API key
const BASE_URL = 'https://api.spoonacular.com/recipes';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

// Debug function
function log(message) {
    console.log(message);
    // You can also display this in the UI if needed
}

// Search function
async function searchRecipes(query) {
    log(`Searching for: ${query}`);
    
    try {
        const url = `${BASE_URL}/complexSearch?apiKey=${API_KEY}&query=${query}&number=10`;
        log(`API URL: ${url}`);
        
        const response = await fetch(url);
        log(`Response status: ${response.status}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        log(`Received ${data.results?.length || 0} results`);
        
        if (data.results && data.results.length > 0) {
            displayResults(data.results);
        } else {
            displayNoResults();
        }
    } catch (error) {
        console.error('Error fetching recipes:', error);
        log(`Error: ${error.message}`);
        displayError();
    }
}

// Display search results
function displayResults(recipes) {
    log(`Displaying ${recipes.length} results`);
    
    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'search-results';
    
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <p>Ready in ${recipe.readyInMinutes} minutes</p>
            <a href="recipe-details.html?id=${recipe.id}" class="btn" target="_blank">View Recipe</a>
        `;
        resultsContainer.appendChild(recipeCard);
    });
    
    // Clear previous results and add new ones
    const existingResults = document.querySelector('.search-results');
    if (existingResults) {
        existingResults.remove();
    }
    document.querySelector('main').appendChild(resultsContainer);
}

// Display no results message
function displayNoResults() {
    log('No results found');
    const noResults = document.createElement('div');
    noResults.className = 'no-results';
    noResults.innerHTML = '<p>No recipes found. Try a different search term.</p>';
    
    const existingResults = document.querySelector('.search-results');
    if (existingResults) {
        existingResults.remove();
    }
    document.querySelector('main').appendChild(noResults);
}

// Display error message
function displayError() {
    log('Error occurred');
    const error = document.createElement('div');
    error.className = 'error';
    error.innerHTML = '<p>An error occurred while searching. Please try again later.</p>';
    
    const existingResults = document.querySelector('.search-results');
    if (existingResults) {
        existingResults.remove();
    }
    document.querySelector('main').appendChild(error);
}

// Check if elements exist
if (searchInput && searchBtn) {
    log('Search elements found');
    
    // Event Listeners
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            searchRecipes(query);
        } else {
            log('Empty search query');
        }
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                searchRecipes(query);
            } else {
                log('Empty search query');
            }
        }
    });
} else {
    console.error('Search elements not found in the DOM');
} 