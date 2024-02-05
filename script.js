const API_KEY="45cb7c0e5d084c3b9836c747c8cde19c";
const url = "https://newsapi.org/v2/everything?q=";
window.addEventListener('load', () => fetchNews("India"));

// it is used when we clicked on logo it reload
function reload() {
    window.location.reload();
}





async function fetchNews (query) {
    // fethNews is a function and fetch is library return promise
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    // fetch library is use fetch the news and await 
    const data = await res.json();
    // it convert data into json and also return promise
    console.log(data);
    bindData(data.articles);
    //inside the data article is form  
} 
function bindData(articles) {
    // this function used to bind template data into card-container
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');
    // if we not used innerhtml then already 100 card is there we call api again then that 100 card again below that 
    cardsContainer.innerHTML = "";
    // whenever we call bindData its first empty then for loop run
    articles.forEach(article => {
        if(!article.urlToImage) return;
        // if image not available for article then return it doesnt show in
        const cardClone = newsCardTemplate.content.cloneNode(true);
        // cardClone is used to clone all element
        fillDataInCard(cardClone, article);
        //  fillDataInCard is a function fill the data in clone article
        cardsContainer.appendChild(cardClone);
        // in above we append the cardalone inside the cardsContainer
        // all articles are clone and inside the cardsContainer
    });
}
function fillDataInCard(cardClone, article){
    // inside the card Clone we fill the news detil like img, title, newSource, desc
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    // we have to put source inside the news image 
    newsImg.src = article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML= article.description;


    // 
    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });
    newsSource.innerHTML=`${article.source.name} - ${date}`;
   
    // it is used to open that link those on we click  
    cardClone.firstElementChild.addEventListener("click", () =>{
         window.open(article.url, "_blank");
    });
}
// select to  current nav item 



// id == query 
let curSelectedNav = null;
// at the starting selected item is null
function onNavItemClick(id){
    fetchNews(id);
    // it fetch the news as well as bind information/data
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active'); // if you click on another nav item then remove the active class from previous class
    // currentSelectednav is not null then
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
    // add the active class in current selected item
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

// when click on button this function is run
searchButton.addEventListener('click', () =>{
    const query = searchText.value;
    // if user does write anything in search box then it return
    if(!query) return;
    // fetchnews return the news that we search
    fetchNews(query); 
    // if you selected finance then you search for anything then finance should be deactive 
    // so that remove the active class
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
})


