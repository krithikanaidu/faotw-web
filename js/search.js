// Spoonacular API Configuration
const API_KEY = '419ceef056db4bf0a2dfd5909b6bb61c'; // Replace with your actual API key
const BASE_URL = 'https://api.spoonacular.com/recipes';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

// Debug function
function log(message) {
    console.log(`[Search] ${message}`);
}

// Store recent searches
function storeRecentSearch(recipe) {
    try {
        let recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
        
        // Remove if already exists
        recentSearches = recentSearches.filter(item => item.id !== recipe.id);
        
        // Add to beginning of array
        recentSearches.unshift(recipe);
        
        // Keep only last 6 searches
        if (recentSearches.length > 6) {
            recentSearches = recentSearches.slice(0, 6);
        }
        
        localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
        log(`Stored recent search: ${recipe.title}`);
    } catch (error) {
        log(`Error storing recent search: ${error.message}`);
    }
}

// Search function
async function searchRecipes(query) {
    try {
        log(`Searching for: ${query}`);
        const url = `${BASE_URL}/complexSearch?apiKey=${API_KEY}&query=${encodeURIComponent(query)}&number=10`;
        log(`API URL: ${url}`);
        
        const response = await fetch(url);
        log(`Response status: ${response.status}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        log(`Received ${data.results.length} results`);
        
        if (data.results.length === 0) {
            throw new Error('No recipes found');
        }
        
        // Store each recipe as a recent search
        data.results.forEach(recipe => {
            storeRecentSearch({
                id: recipe.id,
                title: recipe.title,
                image: recipe.image,
                readyInMinutes: recipe.readyInMinutes
            });
        });
        
        return data.results;
    } catch (error) {
        log(`Error searching recipes: ${error.message}`);
        throw error;
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
        recipeCard.onclick = () => showRecipeDetails(recipe.id);
        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <p>Ready in ${recipe.readyInMinutes} minutes</p>
            <button class="btn">View Recipe</button>
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
function displayError(message) {
    log(`Error: ${message}`);
    const error = document.createElement('div');
    error.className = 'error';
    error.innerHTML = `<p>${message}</p>`;
    
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
    searchBtn.addEventListener('click', async () => {
        const query = searchInput.value.trim();
        if (query) {
            try {
                const results = await searchRecipes(query);
                displayResults(results);
            } catch (error) {
                log(`Search error: ${error.message}`);
                displayError(error.message);
            }
        } else {
            log('Empty search query');
        }
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                searchBtn.click();
            } else {
                log('Empty search query');
            }
        }
    });
} else {
    console.error('Search elements not found in the DOM');
} 