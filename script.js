console.log("Hi I am running")
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById("loader")

// Get Quotes From API
let apiQuotes = [];


// show loading

function showloadingspinner(){
    loader.hidden = false
    quoteContainer.hidden = true
}

function removeloadingspinner(){
    if(!loader.hidden){
        quoteContainer.hidden = false
        loader.hidden = true

    }
   
}
//show new quote

function newQuote(){
    showloadingspinner();
    // Pick a random Quote from Api Quote Array

    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]

    //if author is null
    authorText.textContent = quote.author?quote.author:"Unknown";

    //check quote length
    if(quote.text.length>120){
        quoteText.classList.add('long-quote')
    }else{
        quoteText.classList.remove('long-quote')
    }

    //set quote,hhide loader
    quoteText.textContent = quote.text;
    removeloadingspinner();
    
}

 async function getQuotes(){
    const apiUrl = `https://jacintodesign.github.io/quotes-api/data/quotes.json`;
    showloadingspinner()
    try{
        const response =  await fetch(apiUrl)
        apiQuotes = await response.json()
       newQuote()

    } catch(err){
        
        // Catch Error Here
    }

}


//Tweet Quote

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterUrl, '_blank')
}

//Event.Listener

newQuoteBtn.addEventListener("click",newQuote)
twitterBtn.addEventListener("click",tweetQuote)
//On Load
getQuotes()
showloadingspinner()