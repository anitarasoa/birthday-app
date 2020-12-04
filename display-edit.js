import { people } from './index.js';
import { tbody } from './element.js';
import { destroyPopup } from './utils.js';
import { displayPeople } from './display.js';

export function displayEditBtn(idToEdit) {
    const findPeople = people.find(people => people.id == idToEdit);
        var myDate = new Date(findPeople.birthday);
        var myDateYear = myDate.getFullYear();
        var myDateMonth = myDate.getMonth() + 1;
        var myDateDay = myDate.getDay();
        var bithdayResult = `${myDateYear}/${myDateMonth}/${myDateDay}`;
        // First we need to create a popp with all the fields in it
        const popup = document.createElement('form');
        popup.classList.add('popup');
        popup.insertAdjacentHTML('afterbegin', 
        `
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
                <input type="text" id="birthDay" name="birthDay" value="${bithdayResult}" required>
            </fieldset>
            <div class="buttons">
                <button type="submit" class="submitbtn">Submit</button>
                <button type="button" class="cancelEdit">Cancel</button>
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

        popup.addEventListener('submit', (e) => {
            e.preventDefault();
            
            findPeople.lastName = popup.lastName.value,
            findPeople.firstName = popup.firstName.value,
            findPeople.picture = popup.pictures.value,
            findPeople.birthday = popup.birthDay.value, 

            displayPeople();
            destroyPopup(popup);
            tbody.dispatchEvent(new CustomEvent('updatedTheList'));
        }, { once: true });

        document.body.appendChild(popup);
        popup.classList.add('open');
};
