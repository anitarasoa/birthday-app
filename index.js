
import { buttonAdd, modalOuter, modalInner, tbody, filterNameInput, filterMonthBirthday, resetBtn } from "./element.js";
import { handleClickOutside, resetFilters, destroyPopup, handleEscapeKey, filter } from './utils.js';
import { handleNewPeople } from './handler.js';
import { displayPeople } from './display.js';
import { displayEditBtn } from './display-edit.js';
import { addNewPeople } from './add.js';
// import { peoples } from './people';
// console.log(peoples);

export let people = [];
//Fetch the data from the people.json files
export async function fetchPeople() {
    const response = await fetch("./people.json");
    const data = await response.json();
    people = data;

    console.log(data);
   function editandDeleteButtons(e) {
        if (e.target.closest('button.edit')) {
            const closer = e.target.closest('.tr_container');
            const editBtn = closer.querySelector('button.edit');
            const id = editBtn.value;
            displayEditBtn(id);
        }
        if (e.target.closest('button.delete')) {
            const deleteBtn = e.target.closest('button.delete');
            const id = deleteBtn.value;
            displayDeleteBtn(id);
        }
    }

    //Html for the delete button
    function displayDeleteBtn(idToDelete) {
        return new Promise(async function(resolve) {
			// First we need to create a popp with all the fields in it
			const delPopup = document.createElement('div');
			delPopup.classList.add('delPopup');
			delPopup.insertAdjacentHTML('afterbegin', 
    
            `	
                <h3>Are you sure that you want to delete this partener ?</h3>
                <div class="deletebtns">
                    <button type="button" class="yes">yes</button>
                    <button type="button" class="cancelDelete">Cancel</button>
                </div>
            `);
            delPopup.classList.add('open');

            window.addEventListener('click', e => {
                const cancelBtn = e.target.closest('.cancelDelete');
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
                    const btndelete = removeLi;
                    people = btndelete;
                    displayPeople(btndelete);
                    tbody.dispatchEvent(new CustomEvent('updatedTheList'));
                    destroyPopup(delPopup);
                }
            });
           
            document.body.appendChild(delPopup);
            delPopup.classList.add('open');
        });
    }

    // //To get the items from the local storage
    const initialStorage = () => {
        const stringFromLs = localStorage.getItem('people');
        const lsItems = JSON.parse(stringFromLs);
      
        if (lsItems) {
            people = lsItems;
            tbody.dispatchEvent(new CustomEvent('updatedTheList'));
        } else {
            people =  people;
        }
    };
    
    // To set the item in the local storage.
    const updateLocalStorage = () => {
        localStorage.setItem('people', JSON.stringify(people));
    };
    
    //************* EVENT LISTENER **********
    resetBtn.addEventListener('click', resetFilters);
    filterNameInput.addEventListener('keyup', filter);
    filterMonthBirthday.addEventListener('change', filter);
    tbody.addEventListener('updatedTheList', displayPeople);
    tbody.addEventListener('updatedTheList', updateLocalStorage);
    modalInner.addEventListener('submit', addNewPeople);
    modalOuter.addEventListener('click', handleClickOutside);
    tbody.addEventListener('click', editandDeleteButtons);
    initialStorage();
}

buttonAdd.addEventListener('click', handleNewPeople);
window.addEventListener('keydown', handleEscapeKey);

fetchPeople();