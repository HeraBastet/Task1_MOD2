const containerCards = document.getElementById("cards");

function homeCards () {
    let htmlEvents = "";
    for (let event of data.events) {
        htmlEvents += generetorCard(event);
    };
    containerCards.innerHTML = htmlEvents;
};
homeCards();
createCheckBox();

const IndexBoxCheck = document.querySelectorAll(".form-check-input");
for (let check of IndexBoxCheck) {
    check.addEventListener('change', () => {
        let checkead = [];
        for (let box of IndexBoxCheck) {
            if (box.checked) {
                checkead.push(box.value)
            };
        };

        let keyWord = searchInput.value.toLowerCase().trim();
        let htmlEvents = "";
        if ( (checkead.length > 0) && (keyWord == "") ) {
            for(let elemento of checkead) {
                data.events.filter(evento => elemento == evento.category).forEach(evento => { htmlEvents += generetorCard(evento) });
                containerCards.innerHTML = htmlEvents;
            };
        } else if ( (checkead.length > 0) && (keyWord != "") ) {
            searchSelect(checkead, keyWord, htmlEvents);            
        } else {
            homeCards();
        };
    });
};

const searchForm = document.querySelector(".searchForm");
const searchInput = document.querySelector(".searchInput");
searchForm.addEventListener('submit', e => {
    e.preventDefault();
    let htmlEvents = "";
    let result = false;
    let keyWord = searchInput.value.toLowerCase().trim();
    let checkedCategories = [];
    for (let box of IndexBoxCheck) {
        if (box.checked) {
            checkedCategories.push(box.value)
        };
    };
    
    if ((keyWord != "") && (checkedCategories.length == 0)) {
        data.events.forEach(event => {
            if ( (event.name.toLowerCase().includes(keyWord)) || (event.description.toLowerCase().includes(keyWord)) ) {
                htmlEvents += generetorCard(event);
                result = true;
            }
        });
        if (result) {
            containerCards.innerHTML = htmlEvents;
        } else {
            nothingFound(keyWord);
        };
    } else if ((keyWord != "") && (checkedCategories.length > 0)){
        searchSelect(checkedCategories, keyWord, htmlEvents);
    } else {
        homeCards();
    };
});