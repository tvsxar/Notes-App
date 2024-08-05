const popup = document.querySelector('.popup-container');
const cardList = document.querySelector('.cards');
const popupText = document.querySelector('.popup-text');
const addBtn = document.querySelector('.popup-add-btn');
const popupTitle = document.querySelector('.input-title');
const popupDescription = document.querySelector('.input-description');
let cardTitle, cardDescription;

function addNote() {
    if(!popupTitle.value || !popupDescription.value) return;

    let currentDate = new Date();
    let monthName = currentDate.toLocaleString('default', { month: 'long' });

    let newCard = `
            <li class="card">
                <div class="note">
                    <h1 class="card-title">${popupTitle.value}</h1>
                    <p class="card-text">${popupDescription.value}</p>
                </div>

                <div class="bottom-content">
                    <p class="date">${monthName} ${currentDate.getDate()}, ${currentDate.getFullYear()}</p>

                    <div class="settings">
                        <ion-icon name="menu-outline" class="settings-btn"></ion-icon>
                        <ul class="menu">
                            <li class="edit-btn"><ion-icon name="pencil-sharp"></ion-icon><span>Edit</span></li>
                            <li class="remove-btn"><ion-icon name="close-circle"></ion-icon><span>Remove</span></li>
                        </ul>
                    </div>
                </div>
            </li>`
    cardList.insertAdjacentHTML('beforeend', newCard);
    closePopup();
}

function editNote(event) {
    cardTitle = event.target.closest('.card').querySelector('.card-title');
    cardDescription = event.target.closest('.card').querySelector('.card-text');

    popupTitle.value = cardTitle.textContent;
    popupDescription.value = cardDescription.textContent;

    popupText.innerText = 'Update a note';
    addBtn.innerText = 'Accept';
    addBtn.classList.add('popup-accept-btn');
    addBtn.classList.remove('popup-add-btn');

    openPopup();

    document.addEventListener('click', (e) => {
        if(!e.target.classList.contains('popup-accept-btn')) return;
        if(!popupTitle.value || !popupDescription.value) return;

        popupTitle.focus();

        cardTitle.innerText = popupTitle.value;
        cardDescription.innerText = popupDescription.value;

        closePopup();

        addBtn.classList.add('popup-add-btn');
        addBtn.classList.remove('popup-accept-btn');
    })
}

function removeNote(event) {
    event.target.closest('.card').remove();
}

function openPopup() {
    popup.classList.remove('none');
    popupTitle.focus();
}

function closePopup() {
    popupTitle.value = '';
    popupDescription.value = '';
    popup.classList.add('none');

    popupText.innerText = 'Add a new';
    addBtn.innerText = 'Add note';
}

document.addEventListener('click', (e) => {
    e.preventDefault();
    if(e.target.classList.contains('add-card-btn') || e.target.closest('.add-card-btn')) openPopup();

    if(e.target.classList.contains('close')) closePopup();

    if(e.target.classList.contains('popup-add-btn')) addNote();

    if(e.target.className == 'edit-btn' || e.target.closest('.edit-btn')) editNote(e);

    if(e.target.className == 'remove-btn' || e.target.closest('.remove-btn')) removeNote(e);
});