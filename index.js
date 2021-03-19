import { endpoint, buttonAdd, modalOuter, modalInner, tbody, filterNameInput, filterMonthBirthday, filterForm } from "./libs/element.js";
import { handleClickOutside, destroyPopup, handleEscapeKey, closeModal } from './libs/utils.js';
import { displayPeople } from './libs/display.js';

//Fetch the data from the people.json files
export async function fetchPeople() {
    const response = await fetch(endpoint);
    const data = await response.json();
    let people = data;

    function displayLists() {
        const html = displayPeople(people);
        tbody.innerHTML = html;
    }

    displayLists();
    
   function editandDeleteButtons(e) {
        if (e.target.closest('button.edit')) {
            const tableToEdit = e.target.closest('li');
            const id = tableToEdit.dataset.id;
            displayEditBtn(id);
        }
        if (e.target.closest('button.delete')) {
            const rowToDelete = e.target.closest('li');
            const id = rowToDelete.dataset.id;
            displayDeleteBtn(id);
        }
    }

    function displayEditBtn(idToEdit) {
        const maxDate = new Date().toISOString().slice(0,10);
        const findPeople = people.find(people => people.id == idToEdit);
            let fullDate = new Date(findPeople.birthday).toISOString().slice(0, 10);

            const popup = document.createElement('form');
            popup.classList.add('popup');
            popup.insertAdjacentHTML('afterbegin', 
            `
            <div class="container_container">
                <div class="edit_container">
                    <h3 class="edit-heading">Edit <span class="person_to_edit">${findPeople.firstName} ${findPeople.lastName}</span></h3>
                    <div class="edit_fieldset">
                        <fieldset>
                            <label for="pictures">Picture</label>
                            <input type="url" id="pictures" name="pictures" value="${findPeople.picture}" required>
                        </fieldset>
                        <fieldset>
                            <label for="lastName">Last name</label>
                            <input type="text" id="lastName" name="lastName" value="${findPeople.lastName}" required>
                        </fieldset>
                        <fieldset>
                            <label for="firstName">First name</label>
                            <input type="text" id="firstName" name="firstName" value="${findPeople.firstName}" required>
                        </fieldset>
                        <fieldset>
                            <label for="birthDay">Days</label>
                            <input type="date" id="birthDay" max=${maxDate} value="${fullDate}" name="birthDay" required>
                        </fieldset>
                    </div>
                    <div class="buttons">
                        <button type="submit" class="save">Save changes</button>
                        <button type="button" class="cancelEdit cancel">Cancel</button>
                    </div>
                    <button class="close_edit"></button>
                </div>
            </div>  
            `);
    
            window.addEventListener('click', e => {
                if (e.target.closest('button.cancelEdit')) {
                    destroyPopup(popup);
                }
            });
    
            window.addEventListener('keydown', e => {
                if (e.key === 'Escape') {
                    destroyPopup(popup);                }
            })

            window.addEventListener('click', e => {
                if (e.target.closest('button.close_edit')) {
                    destroyPopup(popup);
                }
            })
    
            popup.addEventListener('submit', (e) => {
                e.preventDefault();
                
                findPeople.lastName = popup.lastName.value,
                findPeople.firstName = popup.firstName.value,
                findPeople.picture = popup.pictures.value,
                findPeople.birthday = popup.birthDay.value,

                displayLists(findPeople);
                destroyPopup(popup);
                tbody.dispatchEvent(new CustomEvent('updatedTheList'));
            }, { once: true });
    
            document.body.appendChild(popup);
            popup.classList.add('open');
            document.body.style.overflow = "hidden";
    };    

    //Html for the delete button
    function displayDeleteBtn(idToDelete) {
        return new Promise(async function(resolve) {
            const findPeopleToDelete = people.find(people => people.id == idToDelete);
            console.log(findPeopleToDelete);
			// First we need to create a popp with all the fields in it
			const delPopup = document.createElement('div');
			delPopup.classList.add('delPopup');
			delPopup.insertAdjacentHTML('afterbegin',
            `	
            <div class="delete_container_container">
               <div class="delete_container">
                    <h2 class="delete_heading">Are you sure that you want to delete <span class="person_to_delete">${findPeopleToDelete.firstName} ${findPeopleToDelete.lastName}?</span></h2>
                    <div class="deletebtns">
                        <button type="button" class="yes">yes</button>
                        <button type="button" class="cancelDelete cancel">Cancel</button>
                    </div>
               </div>
            </div>
            `);
            delPopup.classList.add('open');

            window.addEventListener('click', e => {
                const cancelBtn = e.target.closest('button.cancelDelete');
                if (cancelBtn) {
                    destroyPopup(delPopup);
                }

                window.addEventListener('keydown', e => {
                    if (e.key === 'Escape') {
                        destroyPopup(delPopup);                }
                })
    
                const yesBtn = e.target.closest('button.yes');
                if (yesBtn) {
                    const removeLi = people.filter(people => people.id != idToDelete);
                    people = removeLi;
                    displayLists(removeLi);
                    tbody.dispatchEvent(new CustomEvent('updatedTheList'));
                    destroyPopup(delPopup);
                }
            });
           
            document.body.appendChild(delPopup);
            delPopup.classList.add('open');
            document.body.style.overflow = "hidden";
        });
    }

    const handleNewPeople = () => {
        const maxDate = new Date().toISOString().slice(0,10);

        modalInner.innerHTML =    
        `
        <div class="modal_container">
            <form action="" class="form_submit">
                <h2 class="add_heading">Add new people</h2>
                <fieldset>
                    <label for="picture">Picture</label>
                    <input type="url" id="picture" name="picture" required>
                </fieldset>
                <fieldset>
                    <label for="lastname">Last name</label>
                    <input type="text" id="lastname" name="lastname" required>
                </fieldset>
                <fieldset>
                    <label for="firstname">First name</label>
                    <input type="text" id="firstname" name="firstname" required>
                </fieldset>
                <fieldset>
                    <label for="birthday">Days</label>
                    <input type="date" id="birthday" max=${maxDate} name="birthday" required>
                </fieldset>
                <div class="buttons">
                    <button type="submit" class="submit">Submit</button>
                    <button type="button" class="cancel-add cancel">Cancel</button>
                </div>
            </form>
            <button class="close_modal"></button>
        </div>
        `;
        modalOuter.classList.add('open');
        document.body.style.overflow = "hidden";
    }

    // Add new person to the list
    const addNewPeople = (e) => {
        e.preventDefault();
        const form = e.target;
        const newPeople = {
            id: Date.now(),
            picture: form.picture.value,
            lastName: form.lastname.value,
            firstName: form.firstname.value,
            birthday: form.birthday.value,
        }
        people.push(newPeople);
        displayLists(people);
        //Reset the form
        form.reset();
        tbody.dispatchEvent(new CustomEvent('updatedTheList'));
        closeModal();
    }

    const cancelAddNewPeople = (e) => {
        if (e.target.closest('button.cancel-add')) {
            closeModal();
        }
    }

    const closeButton = (e) => {
        if(e.target.closest('button.close_modal')) {
            closeModal();
        }
    }

    const filterPersonByName = (people) => {
        // Get the value of the input
        const input = filterNameInput.value;
        const inputSearch = input.toLowerCase();
        // Filter the list by the firstname or lastname
        const searchPerson = people.filter(person => person.lastName.toLowerCase().includes(inputSearch) || 
            person.firstName.toLowerCase().includes(inputSearch));
        return searchPerson;
    }

    // Filter by month
    const filterPersonMonth = (people) => {
        // Get the value of the select input
        const select = filterMonthBirthday.value;
        const filterPerson = people.filter(person => {
            // Change the month of birth into string
            const getMonthOfBirth = new Date(person.birthday)
            .toLocaleString("en-US", 
            { month: "long" }); 

            // Filter the list by the month of birth
            return getMonthOfBirth.toLowerCase().includes(select.toLowerCase());
        });
        return filterPerson;
    }

    const filterNameAndMonth = () => {
        const filteredByName = filterPersonByName(people);
        const filtedByNameAndMonth = filterPersonMonth(filteredByName);
        const myHTML = displayPeople(filtedByNameAndMonth);
        tbody.innerHTML = myHTML;
    }

    // //To get the items from the local storage
    const initialStorage = () => {
        const lsItems = JSON.parse(localStorage.getItem('people'));
        if (lsItems) {
            people = lsItems;
            displayLists();
        }
        tbody.dispatchEvent(new CustomEvent('updatedTheList'));
    };
    
    // To set the item in the local storage.
    const updateLocalStorage = () => {
        localStorage.setItem('people', JSON.stringify(people));
    };
    
    //************* EVENT LISTENER **********
    buttonAdd.addEventListener('click', handleNewPeople);
    // resetBtn.addEventListener('click', resetFilters);
    filterNameInput.addEventListener('keyup', filterNameAndMonth);
    filterMonthBirthday.addEventListener('change', filterNameAndMonth);
    tbody.addEventListener('updatedTheList', updateLocalStorage);
    modalInner.addEventListener('submit', addNewPeople);
    modalInner.addEventListener('click', cancelAddNewPeople);
    modalInner.addEventListener('click', closeButton);
    modalOuter.addEventListener('click', handleClickOutside);
    tbody.addEventListener('click', editandDeleteButtons);
    initialStorage();
}
window.addEventListener('keydown', handleEscapeKey);

fetchPeople();