const text = document.getElementById("quote");
const author = document.getElementById("author");
const tweetButton = document.getElementById("tweet");
const fbButton = document.getElementById("facebook");

getRandomQuote()

function getRandomQuote() {
    getRandomCategory().then(category => {
        console.log(resolveLanguage(category))
        fetchJSONData("assets/data/tips/" + resolveLanguage(category) + ".json")
            .then(function (response) {
                let tips = response.tips
                showRandomTip(tips, category)
            }).catch(error => {
                console.error('Error getting category wise tips:', error);
            });

    }).catch(error => {
        console.error('Error getting random category:', error);
    });
}

function getRandomCategory() {
    return new Promise((resolve, reject) => {
        let savedLanguages = getLanguages();

        if (!savedLanguages.length) {
            fetchJSONData('assets/data/categories.json')
                .then(categories => {
                    savedLanguages = categories.categories;
                    const categoryIndex = Math.floor(Math.random() * savedLanguages.length);

                    const randomCategory = savedLanguages[categoryIndex];
                    resolve(randomCategory);
                })
                .catch(error => {
                    console.error('Error fetching categories:', error);
                    reject(error);
                });
            // myAsyncFunction()
            // .then(result => {
            //     console.log(result); // Do something with the result
            // })
            // .catch(error => {
            //     console.error(error); // Handle any errors
            // });
        } else {
            const categoryIndex = Math.floor(Math.random() * savedLanguages.length);
            const randomCategory = savedLanguages[categoryIndex];
            resolve(randomCategory);
        }
    });
}

function showRandomTip(tips, category) {
    const indx = Math.floor(Math.random() * tips.length);

    const tip = tips[indx];
    const language = category;

    //Ternary Operator
    author.innerHTML = "#" + (language == null ? "Anonymous" : language)

    if (language == null) {
        author.innerHTML = "Anonymous";
    } else {
        author.innerHTML = "#" + language;
    }

    text.innerHTML = tip;

    // tweetButton.href = "https://twitter.com/intent/tweet?text=" + quote + " ~ " + authorName;
    tweetButton.href = `https://twitter.com/intent/tweet?text=${tip} ~ ${language}`
    // fbButton.href = "https://www.facebook.com/sharer/sharer.php?u=" + window.location.href + "&quote=" + quote;
    fbButton.href = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&quote=${tip}`
}

document.getElementById('next-quota').addEventListener('click', function () {
    getRandomQuote()
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

document.querySelector('.select').addEventListener('mouseover', function () {
    document.querySelector(".tooltip").style.visibility = 'visible'
})

document.querySelector('.select').addEventListener('mouseout', function () {
    document.querySelector(".tooltip").style.visibility = 'hidden'
})


// creating setting onclick event
// document.getElementById('mySetting').addEventListener('click', function () {
//     document.querySelector(".select").style.display = 'none'
//     document.querySelector(".buttons").style.display = 'none'

//     const btn = document.createElement("button");
//     btn.innerHTML = "Hello Button";

//     const para = document.createElement("p");
//     para.style.fontSize = '24px'
//     para.innerText = "This is a paragraph.";

//     // Append to body:
//     document.querySelector(".container").appendChild(para).appendChild(btn);
// })  

// const directory = 'assets/data/tips/javascript.json';

// fetchJSONData('assets/data/tips/php.json')
//     .then((data)=> console.log(data))
//     .catch(error => console.error('Error getting php data:', error))

// creating setting onclick event
document.getElementById('mySetting').addEventListener('click', function () {
    document.querySelector(".select").style.display = 'none'
    document.querySelector(".buttons").style.display = 'none'
    document.querySelector(".tip").style.display = 'flex'
    document.querySelector(".back").style.display = 'block'

    // If category buttons are empty create categories buttons else show already created buttons
    if (document.querySelectorAll('.btn-language').length < 1) {
        createCategoryButtons()
    } else {
        document.querySelector(".tip").style.display = 'flex'
    }
})

// <i class="fa fa-check"></i>
function createCategoryButtons() {
    fetchJSONData('assets/data/categories.json')
        .then(categories => {
            // categories['categories'].forEach( uman => console.log(uman) );
            categories.categories.forEach(
                function (categoryName) {
                    const btn = document.createElement("button");
                    btn.innerHTML = categoryName;
                    btn.classList.add("btn-language");
                    btn.classList.add("btn");
                    btn.classList.add("btn-" + resolveLanguage(categoryName));
                    btn.style.cursor = "pointer"
                    // Event Listener
                    btn.addEventListener('click', function (e) {
                        if (btn.querySelectorAll('.fa').length === 0) {
                            const iTag = document.createElement("i");
                            iTag.classList.add("fa");
                            iTag.classList.add("fa-check");

                            btn.appendChild(iTag)
                            // e.target.innerHTML = e.target.innerHTML + "<i class='fa fa-check'></i>"
                        } else {
                            btn.querySelector('.fa').remove()
                        }

                        saveLanguages(categoryName)
                    })

                    // Append to body:
                    document.querySelector(".tip").appendChild(btn);
                }
            );

            showSavedLanguages()
        })
        .catch(error => console.error('Error getting categories:', error))
}

document.querySelector(".backBtn").addEventListener('click', function () {
    document.querySelector(".select").style.display = 'block'
    document.querySelector(".buttons").style.display = 'flex'
    document.querySelector(".tip").style.display = 'none'
    document.querySelector(".back").style.display = 'none'
})

async function fetchJSONData(jsonFileFullPath) {
    // console.log("fetchJSONData", jsonFileFullPath)
    try {
        const response = await fetch(jsonFileFullPath);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching JSON files:', error);
        return [];
    }
    // async function myAsyncFunction() {
    //     // For example, fetching data from an API
    //     const response = await fetch('https://api.example.com/data');
    //     const data = await response.json();

    //     // Once the data is fetched, it can be manipulated or returned
    //     return data;
    // }
}

/**
 * If the given language exist in our database then
 * it will remove the language from database else
 * it will save the given language.
 */
function saveLanguages(language) {
    // All the languages saved in our database
    let userLanguages = getLanguages();

    let languages = [];

    // Lets make sure the argument is not already added
    // includes check if the give value exists in an array or not : 
    // if value exists then it will give true else false
    if (userLanguages.includes(language)) {
        languages = userLanguages.filter(function (userLanguage) {
            return userLanguage !== language;
        })
    } else {
        languages = userLanguages;
        languages.push(language)
    }

    // if language is already added, remove the language else save the language
    localStorage.setItem("languages", JSON.stringify(languages || []));
}

/**
 * Return the languages array
 */
function getLanguages() {
    return JSON.parse(localStorage.getItem("languages") || "[]");
}

function showSavedLanguages() {
    let userLanguages = getLanguages();

    userLanguages.forEach(
        function (userLanguage) {

            let btn = document.querySelector('.btn-' + resolveLanguage(userLanguage))

            const iTag = document.createElement("i");
            iTag.classList.add("fa");
            iTag.classList.add("fa-check");

            btn.appendChild(iTag)
        }
    )
}

function resolveLanguage(text) {
    return text.replaceAll(" ", "_").toLowerCase()
}