const gallery = $("#gallery");
let profiles =[];
let cards =[];
let profileIndex = 0;
const phoneRegEx=/^(\d{3})(\d{3})(\d{1,})/;
const onlyNumbers=/\D+/g;
const birthdayRegEx= /^(\d{4})(\d{2})(\d{2})(\d+)/;

function profileText(data){
    const person= data;
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

$.ajax({
    url: "https://randomuser.me/api?results=12",
}).done(function(data) {
    data.results.forEach(user => {
        profiles.push(user);
    });
});

$( document ).ajaxStop(function() {
    for(let i = 0;i<profiles.length;i++){
        profileText(profiles[i]);
    };
    cards = $(".card");
    showModal();
  });
function showModal(){
      
    for(let i=0;i<cards.length;i++){
        
        cards[i].addEventListener('click',()=>{
            modalText(i);
            profileIndex = i;
        })
    }
 }


 function modalText(i){
    const result=profiles[i];
    const number =result.phone.replace(onlyNumbers,"");
    const phonenumber =number.replace(phoneRegEx," ($1) $2-$3");
    const birthdayFormatted= result.dob.date.replace(onlyNumbers,"").replace(birthdayRegEx,"$2/$3/$1");
    const modalWindow=`<div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${result.picture.medium}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${result.name.first} ${result.name.last}</h3>
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
 }

 document.addEventListener('click',(e)=>{

     let modalCloseButton = document.getElementById('modal-close-btn');
     let bodyDiv =modalCloseButton.parentNode.parentNode.parentNode;

     if (e.target.id === 'modal-close-btn' || e.target.parentNode.id === 'modal-close-btn'){
        bodyDiv.removeChild(bodyDiv.children[2]);
     }
     else if(e.target.id === 'modal-next'){
        profileIndex++;
        if(profileIndex>profiles.length-1){
            profileIndex=0;
        }
        bodyDiv.removeChild(bodyDiv.children[2]);
        modalText(profileIndex);
        console.log('dadasdasd')
     }
     else if(e.target.id === 'modal-prev'){
        bodyDiv.removeChild(bodyDiv.children[2]);
        profileIndex--;
        if(profileIndex<0){
            profileIndex = profiles.length-1;
        }
        modalText(profileIndex);
     }
 })