let goSearch = document.getElementById("goSearch");
let inputWord = document.getElementById("inputWord");
goSearch.onclick = findAndUpdate;

function findAndUpdate() {
    let word = inputWord.value;
    if(word == ""){
        console.log("Empty input");
        return;
    }
    // https://api.dictionaryapi.dev/api/v2/entries/en/YOUR_WORD
    let url = "https://api.dictionaryapi.dev/api/v2/entries/en/"+word;
    console.log(url);
    fetch(url, { mode: "cors"}).then(function (response) {
        return response.json();
    }).then(function (response) {
        console.log(response);
    });

}