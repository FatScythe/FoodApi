const burger = document.querySelector('#burger');
const burgerWrapper = document.querySelector('.burger-wrapper');
const menu = document.querySelector('#menu');
const close = document.querySelector('#close');
const search = document.querySelector('.search input');
const form = document.querySelector('form');
const searchBtn = document.querySelector('.search-btn');
const result = document.querySelector('.result');
const id = 'd2b9f3aa';
const key = '4b093550259b81ae7a9e690a22ec3413';
let searchQuery = '';


burger.addEventListener('click', () => {
    if(menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        burger.style.display = 'none';
        close.style.display = 'block';
    }
});

close.addEventListener('click', () => {
    if(!menu.classList.contains('hidden')) {
        menu.classList.add('hidden');
        burger.style.display = 'block';
        close.style.display = 'none';
    }
});

const addRecipes = (data) => {
    let html = '';
    data.map((datum) => {
        html += `
        <div class="card h-48" title = ${datum.recipe.label}>
            <img src=${datum.recipe.image} alt=${datum.recipe.label}  class="w-full h-32 sm:h-48 object-cover">
            <div class="m-4">
                <span class="font-bold">${datum.recipe.label}</span>
                <h2>Diet Label:<span class="text-gray-500 text-xs">${datum.recipe.dietLabels},</span></h2>
            </div>

            <div class="more-btn flex justify-center my-2">
                <a href=${datum.recipe.url} target="_blank"><button class="btn border border-gray-500 mb-4">Get Recipe</button></a>
            </div>
            
            <div class="badge">
                <span>Calories: ${datum.recipe.calories.toFixed(0)}</span>
            </div>
        </div>
        `
    });

    result.innerHTML = html;   
}

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    searchQuery = search.value.toLowerCase();
    
    fetchRecipe(searchQuery)
        .catch(err => 
            err ? result.innerHTML = `<div class="text-2xl text-primary font-bold btn px-auto">ERROR: ${err.message}... Try Again Later ;)<div>` : result.innerHTML ='')
});

const fetchRecipe = async (searchQuery) => {
    const base = `https://api.edamam.com/search?q=${searchQuery}&app_id=${id}&app_key=${key}&to=10`
    const response = await fetch(base);
    const data = await response.json();
    const recipes = data.hits;
    addRecipes(recipes);
    
    return recipes;
}