const gallery = $("#gallery");
let profiles =[];
let cards =[];
let modalCloseButton ='';
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
    showModal();
  });

function showModal(){
      const phoneRegEx=/^(\d{3})(\d{3})(\d{1,})/;
      const onlyNumbers=/\D+/g;
      const birthdayRegEx= /^(\d{4})(\d{2})(\d{2})(\d+)/;
    for(let i=0;i<cards.length;i++){
        const result=profiles[i].results[0];
        const number =result.phone.replace(onlyNumbers,"");
        const phonenumber =number.replace(phoneRegEx," ($1) $2-$3");
        const birthdayFormatted= result.dob.date.replace(onlyNumbers,"").replace(birthdayRegEx,"$2/$3/$1");
        cards[i].addEventListener('click',(e)=>{
            const modalWindow=`<div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${result.picture.medium}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${result.name.first} ${profiles[i].results[0].name.last}</h3>
                    <p class="modal-text">${result.email}</p>
                    <p class="modal-text cap">${result.location.city}</p>
                    <hr>
                    <p class="modal-text">${phonenumber}</p>
                    <p class="modal-text">${result.location.street.name} ${result.location.street.number}, ${result.location.city}, ${result.location.postcode}</p>
                    <p class="modal-text">Birthday: ${birthdayFormatted}</p>
                </div>
            </div>
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>`;
        $(modalWindow).insertAfter(gallery);
        modalCloseButton = document.getElementById('modal-close-btn');
        modalCloseButton.addEventListener('click',(e)=>{
        const bodyDiv =modalCloseButton.parentNode.parentNode.parentNode;
            bodyDiv.removeChild(bodyDiv.children[2]);
         })
        })
    }
 }
 
 function createModal(person){
     
 }

