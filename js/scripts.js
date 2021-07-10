const gallery = $("#gallery");
const body =$("body");
let profiles =[];
let cards =[];
function profileText(data){
    const person= data.results[0];
    const profileToAppend =`<div class="card">
    <div class="card-img-container">
        <img class="card-img" src="${person.picture.medium}" alt="profile picture">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
        <p class="card-text">${person.email}</p>
        <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
    </div>
    </div>`;
    gallery.append(profileToAppend);
}

for(let i=0;i<12;i++){
    $.ajax({
        url: 'https://randomuser.me/api/',
        dataType: 'json',
        success: function(data) {
            profiles.push(data);
        }
      });
}
$( document ).ajaxStop(function() {
    for(let i = 0;i<profiles.length;i++){
        profileText(profiles[i]);
    };
    cards = $(".card");
    showModal(cards);
  });

  function showModal(data){
    for(let i=0;i<cards.length;i++){
        cards[i].addEventListener('click',(e)=>{
            console.log(profiles[i]);
            const modalWindow=`<div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${profiles[i].results[0].picture.medium}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${profiles[i].results[0].name.first} ${profiles[i].results[0].name.last}</h3>
                    <p class="modal-text">email</p>
                    <p class="modal-text cap">city</p>
                    <hr>
                    <p class="modal-text">(555) 555-5555</p>
                    <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                    <p class="modal-text">Birthday: 10/21/2015</p>
                </div>
            </div>
        
            // IMPORTANT: Below is only for exceeds tasks 
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>`;
        body.append(modalWindow);
        })
      }
  }
  

