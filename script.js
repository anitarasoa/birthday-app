
const listContainer = document.querySelector('.list_items');
const buttonAdd = document.querySelector('.btn-primary');
const modalOuter = document.querySelector('.modal_outer');
const modalInner = document.querySelector('.modal_inner');

function wait(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchPeople() {
    const response = await fetch("./people.json");
    const data = await response.json();
    let people = data;

    const displayPeople = () => {
        const sortedBirthday = people.sort((a, b) => b.birthday - a.birthday);
        const html = sortedBirthday.map((person, index) => {
            var myDate = new Date();
            var today = new Date(person.birthday);
            var day = today.getDay();
            var month = today.getMonth() + 1;
            var year = today.getFullYear();
            var bithdayResult = `${day} - ${month} - ${year}`;
            var daysLeft = myDate.getFullYear() - today.getFullYear();
            return `
            <li data-id="${person.id}" class="container ${index % 2 ? "even" : " "}">
                <div class="row">
                    <div class="col">
                        <img class="rounded-circle" src="${person.picture}" alt=""/>
                    </div>
                    <div class="col-4 align-self-center">
                        <h3>${person.lastName} ${person.firstName}</h3>
                        <p>${bithdayResult}</p>
                    </div>
                    <div class="col align-self-center">
                        <p> ${daysLeft} <br> Days</p>
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
        listContainer.innerHTML = html;
    }

    async function destroyPopup(popup) {
        popup.classList.remove('open');
        await wait(1000);
        popup.remove();
        //remove it from the javascript memory
        popup = null;
    };    

   function editandDeleteButtons(e) {
       console.log(e.target);
        if (e.target.closest('button.edit')) {
            const closer = e.target.closest('li');
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
   function displayEditBtn(idToEdit) {
        const findPeople = people.find(people => people.id === idToEdit);
        return new Promise(async function(resolve) {
			// First we need to create a popp with all the fields in it
			const popup = document.createElement('form');
			popup.classList.add('popup');
			popup.insertAdjacentHTML('afterbegin', 
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
                    <button type="button" class="cancelEdit">Cancel</button>
                </div>
                </form>
            `);

            window.addEventListener('click', e => {
                if (e.target.closest('button.cancelEdit')) {
                    destroyPopup(popup);
                }
            })

            popup.addEventListener('submit', (e) => {
                console.log(e.target);
                e.preventDefault();
                
                findPeople.lastName = e.target.lastname.value,
                findPeople.firstName = e.target.firstname.value,
                findPeople.picture = e.target.picture.value,
                findPeople.birthday = e.target.birthday.value,

                displayPeople(findPeople);
                destroyPopup(popup);

            }, { once: true });

            document.body.appendChild(popup);
            console.log(popup);
            await wait(500);
            popup.classList.add('open');
        });
    };

    function displayDeleteBtn(idToDelete) {
        console.log(idToDelete);
        const lastName = document.querySelector('h3').textContent;
        return new Promise(async function(resolve) {
			// First we need to create a popp with all the fields in it
			const popup = document.createElement('form');
			popup.classList.add('popup');
			popup.insertAdjacentHTML('afterbegin', 
    
            // First we need to create a popp with all the fields in it   
            `	
                <h3>Are you sure that you want to delete this partener</h3>
                <p class="lastname">${lastName}</p>
                <div class="deletebtns">
                    <button type="button" class="yes">yes</button>
                    <button type="button" class="cancelDelete">Cancel</button>
                </div>
            `);
            popup.classList.add('open');

            window.addEventListener('click', e => {
                const cancelBtn = e.target.closest('.cancelDelete');
                if (cancelBtn) {
                    destroyPopup(popup);
                }
                const yesBtn = e.target.closest('button.yes');
                if (yesBtn) {
                    const removeLi = people.filter(people => people.id !== idToDelete);
                   const btndelete = removeLi;
                   people = btndelete;
                   displayPeople(btndelete);
                   destroyPopup(popup);
                }
            });
            document.body.appendChild(popup);
            popup.classList.add('open');
        });
    }
    
    listContainer.addEventListener('click', editandDeleteButtons);
    displayPeople();
}

fetchPeople();