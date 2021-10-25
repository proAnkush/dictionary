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
        document.getElementById("searchedWord").textContent = word;
        document.getElementById("phonetic").textContent = "[" + response[0].phonetic +"]";
        document.getElementById("pronounce").setAttribute("date", response[0].phonetics[0].audio);
        let meanings = response[0].meanings;
        populateCards(meanings);
        console.log(response);
    });
}

function populateCards(meanings){
    document.getElementById("cards").innerHTML = "";
    for(let i = 0 ; i < meanings.length; i++){
        let pos = meanings[i];
        let definitions = meanings[0].definitions;
        let pCard = createParentCard(pos, meanings[0].partOfSpeech, definitions);
        document.getElementById("cards").appendChild(pCard);
    }
}
function createParentCard(pos, head, definitions) {
    let pCard = document.createElement("div");
    pCard.classList.add("pcard");
    let headPos = document.createElement("h4");
    headPos.classList.add("subheadings");
    headPos.textContent = head;
    console.log(head);
    pCard.appendChild(headPos);
    for(let i = 0; i < definitions.length; i++){
        let def = definitions[i];
        let cCard = createChildCard(def);
        pCard.appendChild(cCard);
    }

    return pCard;
}
function createChildCard(def) {
    let cCard = document.createElement("div");
    let p = document.createElement("p");
    p.textContent = def.definition;
    p.classList.add("content");

    let e = document.createElement("p");
    e.textContent = def.example;
    e.classList.add("example");
    cCard.appendChild(p);
    cCard.appendChild(e);
    return cCard;
}
