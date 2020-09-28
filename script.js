const buttonAdd = document.querySelector('.btn-add');
const modalOuter = document.querySelector('.modal_outer');
const modalInner = document.querySelector('.modal_inner');
const tbody = document.querySelector('tbody');
const filterNameInput = document.querySelector("#search_name");
// const filterMonthBirthday = document.querySelector("#month_birthday");
const filterForm = document.querySelector('.form_filter');
const resetBtn = document.querySelector('.reset_filter');

function wait(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const resetFilters = e => {
    filterForm.reset();
    fetchPeople();
};

//Fetch the data from the people.json files
async function fetchPeople() {
    const response = await fetch("./people.json");
    const data = await response.json();
    let people = data;
    console.log(people);

    const filter = (e) => {
        displayPeople(e, filterNameInput.value);
    }

    //loop through the data
    const displayPeople = (e, filterName) => {
        // const sortedBirthday = people.sort((a, b) => b.birthday - a.birthday);
        if (filterName) {
           people =people.filter(person => {
                let lowerCaseTitle = person.lastName.toLowerCase();
                let lowerCaseFilter = filterName.toLowerCase();
                if (lowerCaseTitle.includes(lowerCaseFilter)) {
                    return true;
                } else { 
                    return false;
                }
            })
        }
       
        tbody.innerHTML = people.map((person, index) => {
            function suffixDay(day) {
                if (day > 3 && day < 21 ) return "th";
                switch (day % 10) {
                    case 1: return "st";
                    case 2: return "nd";
                    case 3: return "rd";
                    default: return "th";
                }
            }
            let myDate = new Date(person.birthday);
            let today = new Date();
            let myDateYear = myDate.getFullYear();
            let myDateMonth = myDate.getMonth() + 1;
            let myDateDay = myDate.getDay();
            let bithdayResult = `${myDateYear}/${myDateMonth}/${myDateDay}`;
            let age = today.getFullYear() - myDateYear;
            let month = ["January", "February", "March", "April", "May", "June", "Jolay", "August", "Septamber", "October", "November", "Desamber"]
            [myDateMonth - 1];

            let myBirthday = [myDateDay, myDateMonth];
            let myBirthdayDay = new Date(today.getFullYear(), myBirthday[1] - 1, myBirthday[0]);

            if (today.getTime() > myBirthdayDay.getTime()) {
                myBirthdayDay.setFullYear(myBirthdayDay.getFullYear() + 1);
            }
            let different = myBirthdayDay.getTime() - today.getTime();
            let days = Math.floor(different / (1000 * 60 * 60 * 24));

            //Create html for the data and put into dom.
            return `
            <tr data-id="${person.id}" class="${index % 2 ? 'even' : ''} tr_container">
                <td><img class="picture" src="${person.picture}" alt="${person.firstName + ' ' + person.lastName}"/></td>
                <td class="lastname">${person.lastName}</td>
                <td>${person.firstName}</td>
                <td>${bithdayResult}</td>
                <td>Turn ${age} on ${month} ${myDateDay}<sup>${suffixDay(myDateDay)}</sup></td>
                <td>${days} Days</td>
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

    //Destroy popup when submit or cancel
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

    //Html for the edit button
   function displayEditBtn(idToEdit) {
        const findPeople = people.find(people => people.id == idToEdit);
        console.log(findPeople);
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

    //Html for the delete button
    function displayDeleteBtn(idToDelete) {
        console.log(idToDelete);
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

    //Close modal 
    const closeModal = () => {
        modalOuter.classList.remove('open');
    }

    //Close modal when you click outside
    const handleClickOutside = (e) => {
        const clickOutside = !e.target.closest('.modal_inner');
        if (clickOutside) {
            closeModal();
        }
    }

    // To create the html for the new pople
    
    //Create a form for the modal to add new person in the list
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
    
    // Add new person to the list
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

    //To get the items from the local storage
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
    
    // To set the item in the local storage.
    const updateLocalStorage = () => {
        localStorage.setItem('people', JSON.stringify(people));
    };
    
    //************* EVENT LISTENER **********
    resetBtn.addEventListener('click', resetFilters);
    filterNameInput.addEventListener('keyup', filter);
    // filterMonthBirthday.addEventListener('change', filter);
    tbody.addEventListener('updatedTheList', displayPeople);
    tbody.addEventListener('updatedTheList', updateLocalStorage);
    buttonAdd.addEventListener('click', handleNewPeople);
    modalInner.addEventListener('submit', addNewPeople);
    modalOuter.addEventListener('click', handleClickOutside);
    // window.addEventListener('keyup', handleEscapeKey);
    tbody.addEventListener('click', editandDeleteButtons);
    displayPeople();
    initialStorage();
}

fetchPeople();