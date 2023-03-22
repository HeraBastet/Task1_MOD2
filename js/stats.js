let arrayCategories = [];
let pastEvents = [];
let upcomingEvents = [];
let currentDate = new Date(data.currentDate);

data.events.forEach(event => {
    let eventDate = new Date(event.date);
    if (eventDate < currentDate) {
        pastEvents.push(event);
    } else {
        upcomingEvents.push(event);
    };
    if (!arrayCategories.includes(event.category)) {
        arrayCategories.push(event.category);
    };
});

let lowest;
let highest;
let minAtt = (pastEvents[0].assistance * 100) / pastEvents[0].capacity;
let maxAtt = 0;

pastEvents.forEach(event => {
    let percent = (event.assistance * 100) / event.capacity;

    if ( percent > maxAtt) {
    maxAtt = percent;
        highest = event;
    };
    
    if (percent < minAtt) {
        minAtt = percent;
        lowest = event;
    }
});


let mxCapacity = Math.max(...data.events.map(event => event.capacity));
let capacity = data.events.find(event => event.capacity == mxCapacity);
let events = 
    `
        <tr>
            <td class="text-center">${highest.name}</td>
            <td class="text-center">${lowest.name}</td>
            <td class="text-center">${capacity.name}</td>
        </tr>
    `
;

const eventsStats = document.getElementById('events');
eventsStats.insertAdjacentHTML('afterend', events);

let pastStats = '';
let upcomingStats = '';
for (let categ of arrayCategories) {
    let revenues = 0;
    let percentAttend = 0;
    let accAttend = 0;
    let contAttend = 0;

    upcomingEvents.filter(event => event.category.includes(categ))
    .forEach(event => {
            revenues += event.price * event.estimate;
            accAttend += ((event.estimate*100)/event.capacity);
            contAttend++;
    });

    isNaN(Math.round(accAttend/contAttend)) ? 0 : percentAttend=Math.round(accAttend/contAttend);
    upcomingStats += 
        `
            <tr>
                <td class="text-center">${categ}</td>
                <td class="text-center">$ ${revenues}</td>
                <td class="text-center">${percentAttend} %</td>
            </tr>
        `;
     

     revenues = 0;
     accAttend = 0;
     contAttend = 0;

        pastEvents.filter(event => event.category.includes(categ))
        .forEach(event => {
             revenues += event.price * event.assistance;
             accAttend += ((event.assistance*100)/event.capacity);
             contAttend++;
     });
     
     isNaN(Math.round(accAttend/contAttend)) ? 0 : percentAttend=Math.round(accAttend/contAttend);
     pastStats += 
        `
            <tr>
                <td class="text-center">${categ}</td>
                <td class="text-center">$ ${revenues}</td>
                <td class="text-center">${percentAttend} %</td>
            </tr>
        `;
};

const past = document.getElementById('past');
const upcoming = document.getElementById('upcoming');
upcoming.insertAdjacentHTML('afterend', upcomingStats);
past.insertAdjacentHTML('afterend', pastStats);