let cardsEvents = "";
let container = document.getElementById("cards");

let currentDate = new Date(data.currentDate);
for (let event of data.events) {
    let eventDate = new Date(event.date);
    if (eventDate > currentDate) {
        cardsEvents += generetorCard(event);
    };
};

container.innerHTML = cardsEvents;