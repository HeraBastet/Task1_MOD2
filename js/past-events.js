const cardContainer = document.getElementById("cards");
let pastEvents = [];
let currentDate = new Date(data.currentDate);
function pastCards() {
    let htmlEvents = "";
    let currentDate = new Date(data.currentDate);
    for (let event of data.events) {
        let eventDate = new Date(event.date);
        if (eventDate < currentDate) {
            htmlEvents += generetorCard(event);
        };
    };
    cardContainer.innerHTML = htmlEvents;
};
pastCards();
createCheckBox();

data.events.forEach(event => {
    let eventDate = new Date(event.date);
    if (eventDate < currentDate) {
        pastEvents.push(event);
    };
});

const IndexBoxCheck = document.querySelectorAll(".form-check-input");
for (let check of IndexBoxCheck) {
    check.addEventListener('change', () => {
        let checkeados = [];
        for (let box of IndexBoxCheck) {
            if (box.checked) {
                checkeados.push(box.value)
            };
        };

        let keyWord = searchInput.value.toLowerCase().trim();
        let htmlEvents = "";
        if ( (checkeados.length > 0) && (keyWord == "") ) {
            for(let elemento of checkeados) {
                pastEvents.filter(evento => elemento == evento.category).forEach(evento => { htmlEvents += generetorCard(evento) });
                cardContainer.innerHTML = htmlEvents;
            };
        } else if ( (checkeados.length > 0) && (keyWord != "") ) {
            searchSelect(checkeados, keyWord, htmlEvents);            
        } else {
            pastCards();
            
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
    
    let checkeados = [];
    for (let box of IndexBoxCheck) {
        if (box.checked) {
            checkeados.push(box.value)
        };
    };
    
    if ((keyWord != "") && (checkeados.length == 0)) {
        pastEvents.forEach(event => {
            if ( (event.name.toLowerCase().includes(keyWord)) || (event.description.toLowerCase().includes(keyWord)) ) {
                htmlEvents += generetorCard(event);
                result = true;
            }
        });
        if (result) {
            cardContainer.innerHTML = htmlEvents;
        } else {
            nothingFound(keyWord);
        };
    } else if ((keyWord != "") && (checkeados.length > 0)){
        searchSelect(checkeados, keyWord, htmlEvents);
    } else {
        pastCards();
    };
});