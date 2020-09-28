 import { modalInner, modalOuter } from './element.js';

 // To create the html for the new pople
 export const handleNewPeople = () => {
    modalInner.innerHTML =    
    `
    <form action="" class="form_submit">
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
            <input type="date" id="birthday" name="birthday" required>
        </fieldset>
        <div class="buttons">
            <button type="submit" class="submit">Submit</button>
        </div>
        </form>
    `;
    modalOuter.classList.add('open');
}
