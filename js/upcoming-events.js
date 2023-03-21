const containerCards = document.getElementById("cards");
function upcomingCards() {
    let htmlEvents = "";
    let currentDate = new Date(data.currentDate);
    for (let event of data.events) {
        let eventDate = new Date(event.date);
        if (eventDate > currentDate) {
            htmlEvents += generetorCard(event);
        };
    };
    containerCards.innerHTML = htmlEvents;
};
upcomingCards();
createCheckBox();

let upcomingEvents = [];
let currentDate = new Date(data.currentDate);
data.events.forEach(event => {
    let eventDate = new Date(event.date);
    if (eventDate > currentDate) {
       upcomingEvents.push(event);
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
                upcomingEvents.filter(evento => elemento == evento.category).forEach(evento => { htmlEvents += generetorCard(evento) });
                containerCards.innerHTML = htmlEvents;
            };
        } else if ( (checkeados.length > 0) && (keyWord != "") ) {
            searchSelect(checkeados, keyWord, htmlEvents);            
        } else {
            upcomingCards();
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
        upcomingEvents.forEach(event => {
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
    } else if ((keyWord != "") && (checkeados.length > 0)){
        searchSelect(checkeados, keyWord, htmlEvents);
    } else {
        upcomingCards();
    };
});