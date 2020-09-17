const buttonAdd = document.querySelector('.btn-primary');
console.log(buttonAdd);
const modalOuter = document.querySelector('.modal_outer');
const modalInner = document.querySelector('.modal_inner');
console.log(modalInner);
const tbody = document.querySelector('tbody');

function wait(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchPeople() {
    const response = await fetch("./people.json");
    const data = await response.json();
    let people = data;

    const displayPeople = () => {
        const sortedBirthday = people.sort((a, b) => b.birthday - a.birthday);
        tbody.innerHTML = sortedBirthday.map((person, index) => {
            function suffixDay(day) {
                if (day > 3 && day < 21 ) return "th";
                switch (day % 2) {
                    case 1: return "st";
                    case 2: return "nd";
                    case 3: return "rd";
                    default: return "th";
                }
            }
            var myDate = new Date(person.birthday);
            var today = new Date();
            var myDateYear = myDate.getFullYear();
            var myDateMonth = myDate.getMonth();
            var myDateDay = myDate.getDay();
            var bithdayResult = `${myDateYear}/${myDateMonth}/${myDateDay}`;
            var age = today.getFullYear() - myDate.getFullYear();
            var month = [null, "January", "February", "March", "April", "May", "June", "Jolay", "August", "Septamber", "October", "November", "Desamber"]
            [myDate.getMonth()];

            const birthdayDay = myDateDay;
            const birthdayMonth = myDateMonth;
            const myBirthdayThisYear = new Date(new Date().getFullYear(), myDateDay, myDateMonth);

            const daysUntilBirthday = () => {
                const addToYear = myBirthdayThisYear > Date.now() ? 0 : 1;
                const oneDay = 24 * 60 * 60 * 1000;
                const secondDate = new Date(new Date().getFullYear() + addToYear, birthdayMonth, birthdayDay);
                const firstDate = new Date();
                const days = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
                const daysOrDay = days === 1 ? 'day' : '';
                if (days !== 365) {
                    return `${days} ${daysOrDay}`;
                }
            };

            return `
            <tr data-id="${person.id}" class="${index % 2 ? 'even' : ''} tr_container">
                <td><img class="picture" src="${person.picture}" alt="${person.firstName + ' ' + person.lastName}"/></td>
                <td class="lastname">${person.lastName}</td>
                <td>${person.firstName}</td>
                <td>${bithdayResult}</td>
                <td>Turn ${age} on ${month} ${myDateDay}<sup>${suffixDay(myDateDay)}</sup></td>
                <td>${daysUntilBirthday()} Days</td>
                <td>
                    <button class="edit" value="${person.id}"> Edit</button>
                </td>
                <td>
                    <button class="delete" value="${person.id}"> Delete</button>
                </td>
            </tr>
            `;
        })
        .join('');
    }

    async function destroyPopup(popup) {
        popup.classList.remove('open');
        await wait(500);
        popup.remove();
        //remove it from the javascript memory
        popup = null;
    };    

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
   function displayEditBtn(idToEdit) {
        const findPeople = people.find(people => people.id == idToEdit);
            var myDate = new Date(findPeople.birthday);
            var myDateYear = myDate.getFullYear();
            var myDateMonth = myDate.getMonth();
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
            })

            popup.addEventListener('submit', (e) => {
                console.log(popup);
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
            console.log(popup);
            popup.classList.add('open');
    };

    function displayDeleteBtn(idToDelete) {
        console.log(idToDelete);
        const lastName = document.querySelector('.lastname').textContent;
        return new Promise(async function(resolve) {
			// First we need to create a popp with all the fields in it
			const popup = document.createElement('form');
			popup.classList.add('popup');
			popup.insertAdjacentHTML('afterbegin', 
    
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
                    const removeLi = people.filter(people => people.id != idToDelete);
                    const btndelete = removeLi;
                    people = btndelete;
                    displayPeople(btndelete);
                    tbody.dispatchEvent(new CustomEvent('updatedTheList'));
                    destroyPopup(popup);
                }
            });
            document.body.appendChild(popup);
            popup.classList.add('open');
        });
    }

    const closeModal = () => {
        modalOuter.classList.remove('open');
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
    
    const addNewPeople = e => {
        e.preventDefault();
        const form = e.target;
        console.log(form);
        const newPeople = {
            id: Date.now(),
            picture: form.picture.value,
            lastName: form.lastname.value,
            firstName: form.firstname.value,
            birthday: form.birthday.value,
        }
        people.push(newPeople);
        console.log(people);
        form.reset();
        tbody.dispatchEvent(new CustomEvent('updatedTheList'));
        closeModal();
        console.log(newPeople);
    }

    const initialStorage = () => {
        const stringFromLs = localStorage.getItem('people');
        const lsItems = JSON.parse(stringFromLs);
        console.log(lsItems);
        if (lsItems) {
            people = lsItems;
            tbody.dispatchEvent(new CustomEvent('updatedTheList'));
        } else {
            people = [];
        }
    };
    
//     // we want to update the local storage each time we update, delete or add an attirbute
    const updateLocalStorage = () => {
        localStorage.setItem('people', JSON.stringify(people));
    };
    
    tbody.addEventListener('updatedTheList', displayPeople);
    tbody.addEventListener('updatedTheList', updateLocalStorage);
    buttonAdd.addEventListener('click', handleNewPeople);
    modalInner.addEventListener('submit', addNewPeople);
    tbody.addEventListener('click', editandDeleteButtons);
    displayPeople();
    initialStorage();
}

fetchPeople();