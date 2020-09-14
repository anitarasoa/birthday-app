console.log("It works");
const container = document.querySelector('.list_items')

async function fetchPeople() {
    const response = await fetch("./people.json");
    console.log(response);
    const data = await response.json();
    return data;
}

async function displayPeople() {
    const fetchBirthday = await fetchPeople();
    console.log(fetchBirthday);
    const html = fetchBirthday.map(person => {
        return `
        <li data-id="${person.id}" class="container">
            <div class="row">
                <div class="col">
                    <img class="rounded-circle" src="${person.picture}" alt=""/>
                </div>
                <div class="col-6">
                    <p>${person.lastName} ${person.firstName}</p>
                </div>
                <div class="col">
                    <p> ${person.birthday}</p>
                </div>
                <div class="col">
                    <button class="edit"> Edit</button>
                </div>  
                <div class="col">
                    <button class="delete"> Delete</button>
                </div> 
            </div>
        </li>
        `;
    })
    container.innerHTML = html;
}

displayPeople();