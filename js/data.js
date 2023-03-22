const urlAPI = ('https://mindhub-xj03.onrender.com/api/amazing');
async function dataApi() {
  try {
    let response = await fetch(urlAPI);
    let data = await response.json();
    localStorage.setItem('dataLocal', JSON.stringify(data));    
  } catch (error) {
    console.error('Cant get data: ' + error);
  }
};
dataApi();
let data = JSON.parse(localStorage.getItem('dataLocal'));

function generetorCard(event) {
  let card =  
              ` 
                <div class="col">
                  <div class="card border border-warning mb-3" style="width: 290px;">
                    <img class="img-card" src="${event.image}">
                      <text class="title">${event.name}</text>
                    </img>

                    <div class="card-body">
                      <p class="card-text">${event.description}</p>
                          <div class="d-grid gap-2 d-md-flex align-items-end justify-content-between">
                            <p>Price: US$ ${event.price}</p>  
                            <a href="./details.html?id=${event._id}" class="btn btn-warning ">Info</a>
                          </div>           
                    </div>
                  </div>
                </div>                
              `;
  return card;
};

// Funcion para el mensaje de error
function nothingFound(word) {
  document.getElementById('cards').innerHTML = 
  `
    <div class="text-center error">
      <p class="pb-3"><i class="bi bi-search fs-1"></i></p>
      <h3>No se ha encontrado nada con la palabra '${word}'</h3>
      <p>Intente utilizando otra palabra, quitar la seleccion de filtros o corregir la palabra.</p>
    </div>
  `
};

function searchSelect(checkeados, keyWord, htmlEvents) {
  for(let elemento of checkeados) {
      data.events.filter(evento => (elemento == evento.category) && ((evento.name.toLowerCase().includes(keyWord)) || (evento.description.toLowerCase().includes(keyWord))) ).forEach(evento => { htmlEvents += generetorCard(evento) });
  };
  htmlEvents.length == 0 ? nothingFound(keyWord) : containerCards.innerHTML = htmlEvents;
};

function searchSelect(checkeados, keyWord, htmlEvents) {
  for(let elemento of checkeados) {
      upcomingEvents.filter(evento => (elemento == evento.category) && ((evento.name.toLowerCase().includes(keyWord)) || (evento.description.toLowerCase().includes(keyWord))) )
      .forEach(evento => { htmlEvents += generetorCard(evento) });
  };
  htmlEvents.length == 0 ? nothingFound(keyWord) : containerCards.innerHTML = htmlEvents;
};

function searchSelect(checkeados, keyWord, htmlEvents) {
  for(let elemento of checkeados) {
      pastEvents.filter(evento => (elemento == evento.category) && ((evento.name.toLowerCase().includes(keyWord)) || (evento.description.toLowerCase().includes(keyWord))) ).forEach(evento => { htmlEvents += generetorCard(evento) });
  };
  htmlEvents.length == 0 ? nothingFound(keyWord) : cardContainer.innerHTML = htmlEvents;
};

 function createCheckBox() {
   let listCategory = "";
   const containerCheckBox = document.querySelector(".contCheck");
   let category = [];

   data.events.forEach(evento => {
     if (!category.includes(evento.category)) {
       category.push(evento.category);
       listCategory += 
         `
           <div class="form-check form-check-inline">
             <input class="form-check-input checkbox-info shadow-none border border-dark-subtle" type="checkbox" name="Category" value="${evento.category}" id="${evento.category}">
             <label class="form-check-label" for="${evento.category}">${evento.category}</label>
           </div>
         `;
     }
     containerCheckBox.innerHTML = listCategory;
 });
 };