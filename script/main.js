const wordInformationEl = document.querySelector("#word-information");
const searchBtnEl = document.querySelector("#search-btn");
const wordInputEl = document.querySelector("#word-input");
const loadingEl = document.querySelector(".loading");



const BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";


(async() => {
    loadingImg(true);
    try{
        const RESPONSE = await fetch(BASE_URL + "advance");
        const DATA = await RESPONSE.json();
        loadingImg(false);
        render(DATA);
    }
    catch(error) {
        alert(error);
    }
})()

function loadingImg(isLoading) {
    if(isLoading === true) {
        loadingEl.style.display = "block";
    }
    else {
        loadingEl.style.display = "none";
    }
}

function render(word) {
    wordInformationEl.innerHTML = "";
    if (word.length > 0) 
    {
        word.forEach(infomation => {
            const myWordEl = document.createElement("h3");
                infomation.phonetics.forEach(e => {
                if (e.text !== "") {
                    if (e.text) {
                        myWordEl.innerHTML = infomation.word + "  -   " + e.text.slice(1 , e.text.length - 1);
                    }
                }
            })
            
            myWordEl.style.marginBottom = "23px";
            wordInformationEl.append(myWordEl);
            infomation.meanings.forEach(e => {
                e.definitions.forEach(e => {
                    if (e.definition !== '') {
                        const definitionWordEl = document.createElement("p");
                        definitionWordEl.innerHTML = e.definition;
                        definitionWordEl.style.marginBottom = "24px";
                        wordInformationEl.append(definitionWordEl);
                        if (e.example !== '') {
                            if(e.example) {
                                const exampleDefinitionWordEl = document.createElement("p");
                                exampleDefinitionWordEl.innerHTML = "Example:   " +  `"${e.example}"`;
                                wordInformationEl.append(exampleDefinitionWordEl);
                            }
                        }
                    }
                })
            })
            
            const wordAudioEl = document.createElement("audio");
            infomation.phonetics.forEach(e => {
                if(e.audio !== '') {
                    if (e.audio) {
                        wordAudioEl.src = e.audio;
                        wordAudioEl.setAttribute("controls", "");
                    }
                }
            });
            
            
            
        })
    }
    else 
    {
        const errorTitleEl = document.createElement("h3");
        errorTitleEl.innerHTML = word.title;
        const errorMessageEl = document.createElement("p");
        errorMessageEl.innerHTML = word.message;
        const eroorResolutionEl = document.createElement("p");
        eroorResolutionEl.innerHTML = word.resolution;
        wordInformationEl.append(errorTitleEl, errorMessageEl, eroorResolutionEl);
    }   
}

searchBtnEl.addEventListener('click', e => {
    e.preventDefault();
    (async() => {
        try{
            const RESPONSE = await fetch(BASE_URL + wordInputEl.value);
            const DATA = await RESPONSE.json();
            render(DATA);
        }
        catch(error) {
            alert(error);
        }
    })()
})


