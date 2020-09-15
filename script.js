console.log("It works");

const container = document.querySelector('.list_items');
const buttonAdd = document.querySelector('.btn-primary');
const modalOuter = document.querySelector('.modal_outer');
const modalInner = document.querySelector('.modal_inner');

async function fetchPeople() {
    const response = await fetch("./people.json");
    const data = await response.json();
   return data;
}

const initialStorage = () => {
    const items = localStorage.getItem('data');
    const isItems = JSON.parse(items);
    if (isItems) {
        data = isItems;
        container.dispatchEvent(new CustomEvent('updatedLocalStorage'));
    } else {
     data = [];
    }
}

const updateLocalStorage = () => {
    localStorage.getItem('data', JSON.stringify(data));
}

async function displayPeople() {
    const displayFetch = await fetchPeople();
    const sortedBirthday = displayFetch.sort((a, b) => a.birthday - b.birthday);
    const html = sortedBirthday
    
    .map((person, index) => {
        return `
        <li data-id="${person.id}" class="container ${index % 2 ? "even" : " "}">
            <div class="row">
                <div class="col">
                    <img class="rounded-circle" src="${person.picture}" alt=""/>
                </div>
                <div class="col-6 align-self-center">
                    <h3>${person.lastName} ${person.firstName}</h3>
                </div>
                <div class="col align-self-center">
                    <p> ${person.birthday}</p>
                </div>
                <div class="col align-self-center">
                    <button class="edit" value="${person.id}"> Edit</button>
                </div>  
                <div class="col align-self-center">
                    <button class="delete" value="${person.id}"> Delete</button>
                </div> 
            </div>
        </li>
        `;
    })
    .join('');
    container.innerHTML = html;
}

const closeModal = () => {
    modalOuter.classList.remove('open');
}

const clickOutside = (e) => {
    const isOutside = !e.target.closest('.modal_inner');
    if (isOutside) {
        closeModal();
    }
}

const escapeKey = (e) => {
    if (e.key === "Escape") {
        closeModal();
    }
}

//Edit button
function editButton(e) {
    if (e.target.closest('button.edit')) {
        const editBtn = e.target.closest('button.edit');
        const id = editBtn.value;
        displayEditBtn(id);
    }
}
function displayEditBtn(idToEdit) {
    const findPeople = data.find(people => people.id === idToEdit);
    modalInner.innerHTML =
    `
        <form action="" class="form_submit">
        <fieldset>
            <label for="picture">Picture</label>
            <input type="url" id="picture" name="picture" value="${findPeople.picture}" required>
        </fieldset>
        <fieldset>
            <label for="lastname">Last name</label>
            <input type="text" id="lastname" name="lastname" value="${findPeople.lastName}" required>
        </fieldset>
        <fieldset>
            <label for="firstname">First name</label>
            <input type="text" id="firstname" name="firstname" value="${findPeople.firstName}" required>
        </fieldset>
        <fieldset>
            <label for="birthday">Days</label>
            <input type="number" id="birthday" name="birthday" value="${findPeople.birthday}" required>
        </fieldset>
        <div class="buttons">
            <button type="submit" class="submitbtn">Submit</button>
        </div>
        </form>
    `;
    modalInner.addEventListener('submit', e => {
        e.priventDefault();
        console.log(e.target);
    })
    modalOuter.classList.add('open');
}

//Delete button
function deleteButton(e) {
    if (e.target.closest('button.delete')) {
        const deleteBtn = e.target.closest('button.delete');
        const id = deleteBtn.value;
        displayDeleteBtn(id);
    }
}

function displayDeleteBtn(idToDelete) {
    console.log(idToDelete);
    const filteredPeople = data.filter(people => people.id !== idToDelete);
    console.log(filteredPeople);
    container.dispatchEvent(new CustomEvent('updatedLocalStorage'));

		// First we need to create a popp with all the fields in it
		modalInner.innerHTML =    
		`	
			<h3>Are you sure that you want to delete this partener</h3>
			<p class="lastname">${filteredPeople.lastName}</p>
			<div class="deletebtns">
				<button type="button" class="yes">yes</button>
				<button type="button" class="cancelDelete">Cancel</button>
			</div>
        `;
        modalOuter.classList.add('open');
        window.addEventListener('click', e => {
            const cancelBtn = e.target.closest('.cancelDelete');
            if (cancelBtn) {
                closeModal();
            }
            const yesBtn = e.target.closest('button.yes');
            if (yesBtn) {
                const listEl = document.querySelector('.container');
                listEl.remove();
            }
    });
}

// const handleNewPeople = () => {
//     modalInner.innerHTML =    
//     `
//     <form action="" class="form_submit">
//         <fieldset>
//             <label for="picture">Picture</label>
//             <input type="url" id="picture" name="picture" required>
//         </fieldset>
//         <fieldset>
//             <label for="lastname">Last name</label>
//             <input type="text" id="lastname" name="lastname" required>
//         </fieldset>
//         <fieldset>
//             <label for="firstname">First name</label>
//             <input type="text" id="firstname" name="firstname" required>
//         </fieldset>
//         <fieldset>
//             <label for="birthday">Days</label>
//             <input type="date" id="birthday" name="birthday" required>
//         </fieldset>
//         <div class="buttons">
//             <button type="submit" class="submitbtn">Submit</button>
//         </div>
//         </form>
//     `;
//     modalOuter.classList.add('open');
// }

// const addNewPeople = (e) => {
//     e.preventDefault();
//     const form = e.target;
//     console.log(form);
//     const newPeople = {
//         id: Date.now(),
//         picture: form.picture.value,
//         lastName: form.lastname.value,
//         firstName: form.firstname.value,
//         birthday: form.birthday.value,
//     }
//     handlePeople.push(newPeople);
//     console.log(handlePeople);
//     form.reset();
//     container.dispatchEvent(new CustomEvent('updatedLocalStorage'));
// }

// buttonAdd.addEventListener('click', handleNewPeople);
container.addEventListener('updatedLocalStorage', updateLocalStorage);
container.addEventListener('updatedLocalStorage', displayPeople);
window.addEventListener('DOMContentLoaded', displayPeople);
modalOuter.addEventListener('click', clickOutside);
window.addEventListener('keydown', escapeKey);
//window.addEventListener('submit', addNewPeople);
window.addEventListener('click', deleteButton);
container.addEventListener('click', editButton);
//displayPeople();

initialStorage();