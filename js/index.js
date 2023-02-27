let cardsEvents = "";
let container = document.getElementById("cards");

for (let event of data.events) {
    cardsEvents += generetorCard(event);
};

container.innerHTML = cardsEvents;