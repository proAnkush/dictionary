let goSearch = document.getElementById("goSearch");
let inputWord = document.getElementById("inputWord");

window.onload = (event) => {
    inputWord.value = "Excellent";
    goSearch.click();
};


let pronounceBtn = document.getElementById("pronounce");
pronounceBtn.onclick = function () {
    let aud =document.getElementById("aud");
    aud.currentTime = 0;
    aud.play();
}

goSearch.onclick = findAndUpdate;

function findAndUpdate() {
    let word = inputWord.value;
    if(word == ""){
        console.log("Empty input");
        return;
    }
    // https://api.dictionaryapi.dev/api/v2/entries/en/YOUR_WORD
    let url = "https://api.dictionaryapi.dev/api/v2/entries/en/"+word;
    fetch(url, { mode: "cors"}).then(function (response) {
        return response.json();
    }).then(function (response) {
        document.getElementById("searchedWord").textContent = word.toLowerCase();
        document.getElementById("pronounce").innerHTML = '<i class="fas fa-volume-up"></i>';
        document.getElementById("phonetic").textContent = "[" + response[0].phonetic +"]";
        document.getElementById("origin").textContent = "Origin: " + (response[0].origin || "No ancient origins");
        document.getElementById("aud").setAttribute("src", response[0].phonetics[0].audio);
        let meanings = response[0].meanings;
        populateCards(meanings);
    });
}

function populateCards(meanings){
    document.getElementById("cards").innerHTML = "";
    for(let i = 0 ; i < meanings.length; i++){
        let pos = meanings[i];
        let definitions = meanings[i].definitions;
        let pCard = createParentCard(pos, meanings[i].partOfSpeech, definitions);
        document.getElementById("cards").appendChild(pCard);
    }
}
function createParentCard(pos, head, definitions) {
    let pCard = document.createElement("div");
    pCard.classList.add("pcard");
    let headPos = document.createElement("h4");
    headPos.classList.add("subheadings");
    headPos.textContent = head;
    pCard.appendChild(headPos);
    pCard.appendChild(document.createElement("hr"));
    let ol = document.createElement("ol");
    ol.setAttribute("type", "1");
    for(let i = 0; i < definitions.length; i++){
        let def = definitions[i];
        let cCard = createChildCard(def);
        ol.appendChild(cCard);
    }
    pCard.appendChild(ol);

    return pCard;
}
function createChildCard(def) {
    let cCard = document.createElement("li");
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

// Execute a function when the user releases a key on the keyboard
inputWord.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    goSearch.click();
  }
});