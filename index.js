const searchForm=document.querySelector('form');
const searchResultDiv=document.querySelector('.search-result');
const container=document.querySelector('.container');
let searchQuery='';
const APP_ID='cc53289a';
const APP_KEY='f382ce143f0830a6e3f7d0bbc745d60f';

searchForm.addEventListener('submit',(e) =>{
    e.preventDefault();
    searchQuery=e.target.querySelector('input').value;
    fetchAPI();
});
async function fetchAPI(){
    const baseURL=`https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=21`;
    const response=await fetch(baseURL);
    const data=await response.json();
    generateHTML(data.hits);
    console.log(data);
}
function generateHTML(results)
{
    container.classList.remove('initial');
    let generatedHTML='';
    results.map(result =>{
      
     generatedHTML+=
        `<div class="item">
        <img src="${result.recipe.image}">
        <div class="flex-container">
            <h1 class="title">${result.recipe.label}</h1>
            <a class="view-button" href="${result.recipe.url}">View Recipe</a>
        </div>
        <p class="item-data">Calories:${result.recipe.calories.toFixed(2)}</p>
        <p class="item-data">Diet label:${result.recipe.dietLabels.length>0 ?result.recipe.dietLabels:'No Data Found'}</p>
        
    </div>`
    })
    searchResultDiv.innerHTML=generatedHTML;
}
