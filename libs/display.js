export function displayPeople(people) {
    return people
        .sort( function(a, b) {
            return new Date(a.birthday).getMonth() - new Date(b.birthday).getMonth();
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
        const fullDate = `${myDateDay}${nthDate(myDateDay)} / ${myDateMonth + 1} / ${myDateYear}`;
        const futureAge = today.getFullYear() - myDateYear;

        // Counting how many days left untill the person's birthday
        const momentYear = today.getFullYear();
        const birthDayDate = new Date(momentYear, myDateMonth, myDateDay );
        let oneDay = 1000 * 60 * 60 * 24;
        const getTheDate = birthDayDate.getTime() - today.getTime();
        const dayLeft = Math.ceil(getTheDate / oneDay);

        //Create html for the data and put into dom.
        return `
        <tr data-id="${person.id}" class="tr_container">
            <td><img class="picture" src="${person.picture}" alt="${person.firstName + ' ' + person.lastName}"/></td>
            <td 
                <span class="lastname">${person.lastName} ${person.firstName}</span>
                    <p>
                    Turns ${futureAge <= 1 ? futureAge + " " + "year" : futureAge + " " + "years"} old on the 
                    ${new Date(person.birthday)
                        .toLocaleString("en-US", 
                    { month: "long" })}
                    <time datetime="${fullDate}">
                        ${new Date(person.birthday)
                            .toLocaleString("en-US", 
                            { day: "numeric" })}<sup>${nthDate(myDateDay)}</sup>
                    </time> 
                </p>
            </td>
            <td><time datetime="${fullDate}"> ${fullDate}</time></td>
            <td>${dayLeft < 0 ? dayLeft * -1 + " " + "days ago" :
                dayLeft <= 1 ? dayLeft + " " + "day" :
                dayLeft + 'days'}
            </td>
            <td>
                <button class="edit" data-id="${person.id}"> Edit</button>
            </td>
            <td>
                <button class="delete" data-id="${person.id}"> Delete</button>
            </td>
        </tr>
        `;
    })
    .join('');
}    