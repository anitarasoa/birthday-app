console.log("It works");

const container = document.querySelector('.list_items');
const buttonAdd = document.querySelector('.btn-primary');
const modalOuter = document.querySelector('.modal_outer');
const modalInner = document.querySelector('.modal_inner');
let handlePeople = [];

async function fetchPeople() {
    const response = await fetch("./people.json");
    const data = await response.json();
    return data;
}

async function displayPeople() {
    const fetchBirthday = await fetchPeople();
    const html = fetchBirthday
    
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
                    <button class="edit"> Edit</button>
                </div>  
                <div class="col align-self-center">
                    <button class="delete"> Delete</button>
                </div> 
            </div>
        </li>
        `;
    })
    .join('');
    handlePeople.push(html);
    container.innerHTML = html;
}

const handleNewPeople = () => {
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
            <label for="jobTitle">Days</label>
            <input type="text" id="jobTitle" name="jobTitle" required>
        </fieldset>
        <div class="buttons">
            <button type="submit" class="submitbtn">Submit</button>
        </div>
        </form>
    `;
    modalOuter.classList.add('open');
}

const addNewPeople = () => {
    container.dispatchEvent(new CustomEvent('updatedLocalStorage'));
}

const initialStorage = () => {
    const items = localStorage.getItem("handlePeople");
    const isItems = JSON.parse(items);
    if (isItems) {
        handlePeople = isItems;
        container.dispatchEvent(new CustomEvent('updatedLocalStorage'));
    } else {
        handlePeople = [];
    }
}

const updateLocalStorage = () => {
    localStorage.getItem('handlePeople', JSON.stringify(handlePeople));
}

buttonAdd.addEventListener('click', handleNewPeople);
container.addEventListener('updatedLocalStorage', updateLocalStorage);
container.addEventListener('updatedLocalStorage', displayPeople);
window.addEventListener('DOMContentLoaded', displayPeople);

initialStorage();