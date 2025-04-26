# FAOTW Web

**FAOTW Web** (FoodAllOverTheWorld) is a web application for discovering food recipes using the Spoonacular Food API.  
Search for any recipe, get personalized suggestions based on your recent searches, and explore new meal ideas — all in one place.

---

## Table of Contents
- [About](#about)
- [Features](#features)
- [Demo](#demo)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [Contact](#contact)

---

## About

**faotw-web** is a recipe search web app built with HTML, CSS, and JavaScript, powered by the Spoonacular Food API.  
You can search for recipes by any food or ingredient, view detailed recipe information, and get suggestions based on your recent searches.

This project is under active development and aims to make meal planning and recipe discovery easy and fun.

---

## Features
- Search for recipes using keywords or ingredients
- View detailed recipe information, including ingredients and instructions
- Get recipe suggestions based on your recent search history
- Responsive and user-friendly interface
- Powered by the Spoonacular Food API for up-to-date and diverse recipes

---

## Demo

Visit the live site: [faotw-web.onrender.com](https://faotw-web.onrender.com)

---

## Getting Started

### Prerequisites
- A Spoonacular API key (you can get yours at [spoonacular.com/food-api](https://spoonacular.com/food-api))
- Node.js (optional, if you want to run a local server)

### Installation

Clone the repository:

```bash
git clone https://github.com/krithikanaidu/faotw-web.git
cd faotw-web
```

Set up your API key:

Create a `.env` file (if using a bundler/build tool) or directly insert your API key in the relevant JavaScript file as instructed in the code comments.

Example:

```javascript
const API_KEY = 'YOUR_SPOONACULAR_API_KEY';
```

Run locally:

- Open `index.html` directly in your browser, or
- Use a local server for better functionality:

```bash
# Using Python 3
python -m http.server 8000
# Then visit http://localhost:8000
```

---

## Usage

1. Enter a food name or ingredient in the search bar.
2. Browse the list of matching recipes returned by the Spoonacular API.
3. Click on a recipe to view detailed information, including ingredients and instructions.
4. Your recent searches will be saved and used to suggest new recipes.

---

## Project Structure

```
faotw-web/
├── index.html
├── css/
│   └── [stylesheets]
├── js/
│   └── [JavaScript files]
├── assets/
│   └── [images, icons, etc.]
└── README.md
```

---

## Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla)
- Spoonacular Food API
- Fetch API for HTTP requests

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit and push (`git commit -m "Add your message"`).
5. Open a pull request.

---

## Contact

For questions, suggestions, or feedback, please open an issue on this repository.

FAOTW Web is under active development. Stay tuned for new features and improvements.

**Note:** To use the Spoonacular API, you must obtain your own API key and adhere to their usage terms.

---
