import { people } from './index.js';
import { tbody } from './element.js';

export const displayPeople = (e, filterName, filterMonth) => {
    let sortedBirthday = people.sort((a, b) => {
        const dateA = new Date(a.birthday);
        const dateB = new Date(b.birthday);
        return dateA.getTime() - dateB.getTime();
      });
    if (filterName) {
       sortedBirthday = sortedBirthday.filter(person => {
            let lowerCaseTitle = person.lastName.toLowerCase();
            let lowerCaseFilter = filterName.toLowerCase();
            if (lowerCaseTitle.includes(lowerCaseFilter)) {
                return true;
            } else { 
                return false;
            }
        })
    }

    if (filterMonth) {
        sortedBirthday = sortedBirthday.filter(person => {
            let myDateBirth = new Date(person.birthday); 
            let month = myDateBirth.toLocaleString("en-us", { month: "long" } );
            let monthLowerCase = month.toLowerCase();
            let lowerCaseMonth = filterMonth.toLowerCase();
            if (monthLowerCase == lowerCaseMonth) {
                return true;
            } else {
                return false;
            }
        });
    }
   
    tbody.innerHTML = sortedBirthday.map((person) => {
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

        let month = myDate.toLocaleString("en-us", { month: "long" });

        let myBirthday = [myDateDay, myDateMonth];
        let myBirthdayDay = new Date(today.getFullYear(), myBirthday[1] - 1, myBirthday[0]);

        if (today.getTime() > myBirthdayDay.getTime()) {
            myBirthdayDay.setFullYear(myBirthdayDay.getFullYear() + 1);
        }
        let different = myBirthdayDay.getTime() - today.getTime();
        let days = Math.round(different / (1000 * 60 * 60 * 24));

        //Create html for the data and put into dom.
        return `
        <tr data-id="${person.id}" class="tr_container">
            <td><img class="picture" src="${person.picture}" alt="${person.firstName + ' ' + person.lastName}"/></td>
            <td class="lastname">${person.lastName} ${person.firstName}</td>
            <td>${bithdayResult}</td>
            <td>Turn ${age} on ${month} ${myDateDay}<sup>${suffixDay(myDateDay)}</sup></td>
            <td>After ${days} Days</td>
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