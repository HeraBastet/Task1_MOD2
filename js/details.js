const queryString = location.search;
const params = new URLSearchParams(queryString);     
const id = params.get("id");
const evento = data.events.find(event => event._id == id);
const cardDetails = document.querySelector("#detailCard");

cardDetails.innerHTML = 
                        `
                            <div class="card p-2 mb-2 mb-2 border-warning" style="max-width: 900px;">
                                <div class="row g-0">
                                    <div class="col-md-6 d-flex py-1">
                                        <img src="${evento.image}" class="img-fluid rounded-start" alt="...">
                                    </div>

                                        <div class="col-md-5">
                                            <div class="card-body">
                                                <h5 class="card-title text-center">${evento.name}</h5>
                                                <p class="card-text">${evento.description}</p>
                                                <p class="card-text">Place: ${evento.place}</p>
                                                <p class="card-text">Capacity: ${evento.capacity}</p>
                                                <p class="card-text">Date: ${evento.date}</p>
                                                <p class="card-text">Price: U$S${evento.price}</p>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        `