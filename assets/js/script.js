const text = document.getElementById("quote");
const author = document.getElementById("author");
const tweetButton = document.getElementById("tweet");
const fbButton = document.getElementById("facebook");


let allQuotes = [];

const getNewQuote = async () => {    
    const response = await fetch("https://zenquotes.io/api/quotes");
    
    allQuotes = await response.json();

    showRandomQuote()
}

getNewQuote();

function showRandomQuote() {
    const indx = Math.floor(Math.random() * allQuotes.length);
    
    const quote = allQuotes[indx].q;
    const authorName = allQuotes[indx].a;

    //Ternary Operator
    author.innerHTML = "~ " + (authorName == null ? "Anonymous" : authorName)

    if (authorName == null) {
        author.innerHTML = "Anonymous";
    } else {
        author.innerHTML = "~ " + authorName;
    }

    text.innerHTML = quote;
    
    // tweetButton.href = "https://twitter.com/intent/tweet?text=" + quote + " ~ " + authorName;
    tweetButton.href = `https://twitter.com/intent/tweet?text=${quote} ~ ${authorName}`
    // fbButton.href = "https://www.facebook.com/sharer/sharer.php?u=" + window.location.href + "&quote=" + quote;
    fbButton.href = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&quote=${quote}`
}

document.getElementById('next-quota').addEventListener('click', function() {
    showRandomQuote()
});

document.getElementById('myTooltip').addEventListener('click', function () {
    var tempTextArea = document.createElement('textarea');

    tempTextArea.value = document.querySelector('.quote').innerHTML;

    document.body.appendChild(tempTextArea);

    tempTextArea.select();

    document.execCommand('copy');

    document.body.removeChild(tempTextArea);

    document.querySelector(".tooltiptext").innerHTML = 'Copied'
})


// document.getElementById('myTooltip').addEventListener('mouseout', function () {
//     console.log('mouse out');
//     // document.querySelector(".tooltiptext").innerHTML = 'Copy to clipboard'
// })

document.getElementById('myTooltip').addEventListener('mouseenter', function () {
    document.querySelector(".tooltiptext").innerHTML = 'Copy to clipboard'
})

document.querySelector('.container').addEventListener('mouseover', function () {
    document.querySelector(".tooltip").style.visibility = 'visible'
})

document.querySelector('.container').addEventListener('mouseout', function () {
    document.querySelector(".tooltip").style.visibility = 'hidden'
})
