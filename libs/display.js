export function displayPeople(people) {
    return people
        .sort((a, b) => {
            function peopleBirthday(month, day) {
                let today = new Date(),
                currentYear = today.getFullYear(),
                next = new Date(currentYear, month - 1, day);
                today.setHours(0, 0, 0, 0);
                if (today > next) next.setFullYear(currentYear + 1);
                return Math.round((next - today) / 8.64e7);
            }
            let birthdayA = peopleBirthday(new Date(a.birthday).getMonth()+1,new Date(a.birthday).getDate());
            let birthdayB = peopleBirthday(new Date(b.birthday).getMonth()+1,new Date(b.birthday).getDate());
            return birthdayA - birthdayB;
        })
        .map((person) => {
        function nthDate(day) {
            if (day > 3 && day < 21 ) return "th";
            switch (day % 10) {
                case 1: return "st";
                case 2: return "nd";
                case 3: return "rd";
                default: return "th";
            }
        }
        let today = new Date();
        let myDate = new Date(person.birthday);
        let myDateYear = myDate.getFullYear();
        let myDateMonth = myDate.getMonth() + 1;
        let myDateDay = myDate.getDate();
        const fullDate = `${myDateDay}${nthDate(myDateDay)} / ${myDateMonth} / ${myDateYear}`;
        const futureAge = today.getFullYear() - myDateYear;
    
        var bday = new Date(today.getFullYear(),myDateMonth-1,myDateDay);
        if( today.getTime() > bday.getTime()) {
            bday.setFullYear(bday.getFullYear()+1);
        }
        var diff = bday.getTime()-today.getTime();
        var days = Math.floor(diff/(1000*60*60*24));

        //Create html for the data and put into dom.
        return `
        <li data-id="${person.id}" class="tr_container">
           <div class="first_section">
                <div><img class="picture" src="${person.picture}" alt="${person.firstName + ' ' + person.lastName}"/></div>
                <div class="first_section__content">
                    <span class="person_name">${person.lastName} ${person.firstName}</span>
                    <p class="person_birthday">
                        Turns <span class="days"> ${futureAge}</span> on 
                        ${new Date(person.birthday)
                            .toLocaleString("en-US", 
                        { month: "long" })}
                        <time datetime="${fullDate}">
                            ${new Date(person.birthday)
                                .toLocaleString("en-US", 
                                { day: "numeric" })}<sup>${nthDate(myDateDay)}</sup>
                        </time> 
                    </p>
                </div>
           </div>
            <div class="last_section">
                <p class="person_birthday_date">${days > 0 ? 'in' + " " + days + " " + 'days' : "Happy birthday"}
                </p>
                <div>
                    <button class="edit" data-id="${person.id}"> Edit</button>
                    <button class="delete" data-id="${person.id}"> Delete</button>
                </div>
            </div>
        </li>
        `;
    })
    .join('');
}    