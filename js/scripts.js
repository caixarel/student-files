// The profiles will be store in an array containing all the information
let profiles =[];
//clickable card
let cards =[];
//index used to know with profile is currently being displayed
let profileIndex = 0;
const gallery = $("#gallery");
const searchBar= $('.search-container');

//regEx used to change the phone numbers and birthdays
const phoneRegEx=/^(\d{3})(\d{3})(\d{1,})/;
const onlyNumbers=/\D+/g;
const birthdayRegEx= /^(\d{4})(\d{2})(\d{2})(\d+)/;

//HTML code to display a message when no results where found. The paragraph starts hidden
const noResult =document.createElement("h1");
noResult.textContent='No results found'
gallery.append(noResult);
noResult.style.display ='none'

searchProfiles();
const searchInput=document.getElementById('search-input');
const searchButton=document.getElementById('search-submit');

//function to display a search bar 
function searchProfiles(){
    const searchHTML= `<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`
    searchBar.append(searchHTML);
}

//Search for the profile typed by the user
searchButton.addEventListener('click',(e)=>{
    const profileCards = $('.card');
    let capitalizeName =searchInput.value.toLowerCase();
    let numberOfProfilesMatching=0;
        for(let i = 0;i<profiles.length;i++){
            //If the search input field is empty all profiles are displayed
            if(searchInput.value===''){
                profileCards[i].style.display ='flex'
                noResult.style.display = 'none';
            }
            //Only the profiles containing the letters inserted by the user are displayed
            if(!profiles[i].name.first.toLowerCase().includes(capitalizeName)){
                profileCards[i].style.display ='none'
               noResult.style.display = 'none';
                numberOfProfilesMatching++;
           }
           //If no profiles match the user's input a "no results" message will be displayed
           if(numberOfProfilesMatching==12){
               noResult.style.display = 'block';
           }
        }
})


//function that will create the HTML code to display the requested Profiles
function profileText(data){
    const profileToAppend =`<div class="card">
    <div class="card-img-container">
        <img class="card-img" src="${data.picture.medium}" alt="profile picture">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">${data.name.first} ${data.name.last}</h3>
        <p class="card-text">${data.email}</p>
        <p class="card-text cap">${data.location.city}, ${data.location.state}</p>
    </div>
    </div>`;
    //The HTML code will be placed on the gallery div
    gallery.append(profileToAppend);
}
//Function that will get 12 profile results and store them in a array
$.ajax({
    url: "https://randomuser.me/api?results=12",
}).done(function(data) {
    data.results.forEach(user => {
        profiles.push(user);
    });
});
//When all the profiles are received this function will then generate the proflies on the web page
$( document ).ajaxStop(function() {
    for(let i = 0;i<profiles.length;i++){
        profileText(profiles[i]);
    };
    cards = $(".card");
    showModal();
  });
//Function that creates an eventListener for each card profile,
function showModal(){
    for(let i=0;i<cards.length;i++){
        cards[i].addEventListener('click',()=>{
            //When the user clicks on one of the profiles a modal window containing the information from the selected profile
            modalText(i);
            profileIndex = i;
        })
    }
 }

//Function to generate the HTML code that will display a modal Window containing the profile's information
 function modalText(i){
    const result=profiles[i];
    //RegEx to display the phone number and birthday with the requested format
    const number =result.cell.replace(onlyNumbers,"");
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

 //Event Listener to handle the interaction with the modal window
 document.addEventListener('click',(e)=>{
     if(e.target.type==='button' ||e.target.parentNode.id === 'modal-close-btn'){
        let modalCloseButton = document.getElementById('modal-close-btn');
        let bodyDiv =modalCloseButton.parentNode.parentNode.parentNode;
        //interaction to close the modal window
        if (e.target.id === 'modal-close-btn' || e.target.parentNode.id === 'modal-close-btn'){
           bodyDiv.removeChild(bodyDiv.children[2]);
        }
        //interaction to display the next profile
        else if(e.target.id === 'modal-next'){
           profileIndex++;
           if(profileIndex>profiles.length-1){
               profileIndex=0;
           }
           bodyDiv.removeChild(bodyDiv.children[2]);
           modalText(profileIndex);
        }
        //interaction to display the previous profile
        else if(e.target.id === 'modal-prev'){
           bodyDiv.removeChild(bodyDiv.children[2]);
           profileIndex--;
           if(profileIndex<0){
               profileIndex = profiles.length-1;
           }
           modalText(profileIndex);
        }
     }

 })