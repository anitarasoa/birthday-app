// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"element.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetBtn = exports.filterForm = exports.filterMonthBirthday = exports.filterNameInput = exports.tbody = exports.modalInner = exports.modalOuter = exports.buttonAdd = void 0;
const buttonAdd = document.querySelector('.btn-add');
exports.buttonAdd = buttonAdd;
const modalOuter = document.querySelector('.modal_outer');
exports.modalOuter = modalOuter;
const modalInner = document.querySelector('.modal_inner');
exports.modalInner = modalInner;
const tbody = document.querySelector('tbody');
exports.tbody = tbody;
const filterNameInput = document.querySelector("#search_name");
exports.filterNameInput = filterNameInput;
const filterMonthBirthday = document.querySelector("#month_birthday");
exports.filterMonthBirthday = filterMonthBirthday;
const filterForm = document.querySelector('.form_filter');
exports.filterForm = filterForm;
const resetBtn = document.querySelector('.reset_filter');
exports.resetBtn = resetBtn;
},{}],"display.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayPeople = void 0;

var _script = require("./script.js");

var _element = require("./element.js");

const displayPeople = (e, filterName, filterMonth) => {
  let sortedBirthday = _script.people.sort((a, b) => {
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
    });
  }

  if (filterMonth) {
    sortedBirthday = sortedBirthday.filter(person => {
      let myDateBirth = new Date(person.birthday);
      let month = myDateBirth.toLocaleString("en-us", {
        month: "long"
      });
      let monthLowerCase = month.toLowerCase();
      let lowerCaseMonth = filterMonth.toLowerCase();

      if (monthLowerCase == lowerCaseMonth) {
        return true;
      } else {
        return false;
      }
    });
  }

  _element.tbody.innerHTML = sortedBirthday.map(person => {
    function suffixDay(day) {
      if (day > 3 && day < 21) return "th";

      switch (day % 10) {
        case 1:
          return "st";

        case 2:
          return "nd";

        case 3:
          return "rd";

        default:
          return "th";
      }
    }

    let myDate = new Date(person.birthday);
    let today = new Date();
    let myDateYear = myDate.getFullYear();
    let myDateMonth = myDate.getMonth() + 1;
    let myDateDay = myDate.getDay();
    let bithdayResult = `${myDateYear}/${myDateMonth}/${myDateDay}`;
    let age = today.getFullYear() - myDateYear;
    let month = myDate.toLocaleString("en-us", {
      month: "long"
    });
    let myBirthday = [myDateDay, myDateMonth];
    let myBirthdayDay = new Date(today.getFullYear(), myBirthday[1] - 1, myBirthday[0]);

    if (today.getTime() > myBirthdayDay.getTime()) {
      myBirthdayDay.setFullYear(myBirthdayDay.getFullYear() + 1);
    }

    let different = myBirthdayDay.getTime() - today.getTime();
    let days = Math.round(different / (1000 * 60 * 60 * 24)); //Create html for the data and put into dom.

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
  }).join('');
};

exports.displayPeople = displayPeople;
},{"./script.js":"script.js","./element.js":"element.js"}],"utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroyPopup = destroyPopup;
exports.handleEscapeKey = exports.handleClickOutside = exports.closeModal = exports.filter = exports.resetFilters = void 0;

var _element = require("./element.js");

var _script = require("./script.js");

var _display = require("./display.js");

const resetFilters = e => {
  _element.filterForm.reset();

  (0, _script.fetchPeople)();
};

exports.resetFilters = resetFilters;

const filter = e => {
  (0, _display.displayPeople)(e, _element.filterNameInput.value, _element.filterMonthBirthday.value);
};

exports.filter = filter;

function wait(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function destroyPopup(popup) {
  popup.classList.remove('open');
  await wait(500);
  popup.remove(); //remove it from the javascript memory

  popup = null;
}

; //Close modal 

const closeModal = () => {
  _element.modalOuter.classList.remove('open');
}; //Close modal when you click outside


exports.closeModal = closeModal;

const handleClickOutside = e => {
  const clickOutside = !e.target.closest('.modal_inner');

  if (clickOutside) {
    closeModal();
  }
};

exports.handleClickOutside = handleClickOutside;

const handleEscapeKey = e => {
  if (e.key === 'Escape') {
    closeModal();
  }
};

exports.handleEscapeKey = handleEscapeKey;
},{"./element.js":"element.js","./script.js":"script.js","./display.js":"display.js"}],"handler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleNewPeople = void 0;

var _element = require("./element.js");

// To create the html for the new pople
const handleNewPeople = () => {
  _element.modalInner.innerHTML = `
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

  _element.modalOuter.classList.add('open');
};

exports.handleNewPeople = handleNewPeople;
},{"./element.js":"element.js"}],"display-edit.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayEditBtn = displayEditBtn;

var _script = require("./script.js");

var _element = require("./element.js");

var _utils = require("./utils.js");

var _display = require("./display.js");

function displayEditBtn(idToEdit) {
  const findPeople = _script.people.find(people => people.id == idToEdit);

  var myDate = new Date(findPeople.birthday);
  var myDateYear = myDate.getFullYear();
  var myDateMonth = myDate.getMonth() + 1;
  var myDateDay = myDate.getDay();
  var bithdayResult = `${myDateYear}/${myDateMonth}/${myDateDay}`; // First we need to create a popp with all the fields in it

  const popup = document.createElement('form');
  popup.classList.add('popup');
  popup.insertAdjacentHTML('afterbegin', `
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
      (0, _utils.destroyPopup)(popup);
    }
  });
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      (0, _utils.destroyPopup)(popup);
    }
  });
  popup.addEventListener('submit', e => {
    e.preventDefault();
    findPeople.lastName = popup.lastName.value, findPeople.firstName = popup.firstName.value, findPeople.picture = popup.pictures.value, findPeople.birthday = popup.birthDay.value, (0, _display.displayPeople)();
    (0, _utils.destroyPopup)(popup);

    _element.tbody.dispatchEvent(new CustomEvent('updatedTheList'));
  }, {
    once: true
  });
  document.body.appendChild(popup);
  popup.classList.add('open');
}

;
},{"./script.js":"script.js","./element.js":"element.js","./utils.js":"utils.js","./display.js":"display.js"}],"add.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addNewPeople = void 0;

var _script = require("./script.js");

var _element = require("./element.js");

var _utils = require("./utils.js");

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
    birthday: form.birthday.value
  };

  _script.people.push(newPeople);

  console.log(_script.people); //Reset the form

  form.reset();

  _element.tbody.dispatchEvent(new CustomEvent('updatedTheList'));

  (0, _utils.closeModal)();
  console.log(newPeople);
};

exports.addNewPeople = addNewPeople;
},{"./script.js":"script.js","./element.js":"element.js","./utils.js":"utils.js"}],"people.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.peoples = void 0;
const peoples = [{
  "id": "1fbef8c1-9823-4cb5-b138-259fed0fb2b1",
  "lastName": "Kihn",
  "firstName": "Effie",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/jpenico/128.jpg",
  "birthday": 92614674399
}, {
  "id": "567084f7-b7e8-41ba-90cb-be5ff8d78b68",
  "lastName": "Spinka",
  "firstName": "Adriel",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/balintorosz/128.jpg",
  "birthday": 1093495104944
}, {
  "id": "35194943-2f14-4066-89c7-e3101ad5bde1",
  "lastName": "Schaefer",
  "firstName": "Ricky",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/stefanotirloni/128.jpg",
  "birthday": 117168543755
}, {
  "id": "f972f811-1fb5-4a12-b64b-23a6c41d8673",
  "lastName": "Jones",
  "firstName": "Laila",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/colirpixoil/128.jpg",
  "birthday": 166977747202
}, {
  "id": "2ebb247d-271c-4ead-a71f-7663824ada00",
  "lastName": "Lebsack",
  "firstName": "Drake",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/aoimedia/128.jpg",
  "birthday": 1566102146696
}, {
  "id": "2b60062b-2bbb-4ea4-a139-33b8fc2aad9a",
  "lastName": "Pfeffer",
  "firstName": "Jennie",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/chaensel/128.jpg",
  "birthday": 1011935832093
}, {
  "id": "faed72a5-986d-43ec-8579-423e5b76f5f2",
  "lastName": "Kunde",
  "firstName": "Jolie",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/alagoon/128.jpg",
  "birthday": 1401888987134
}, {
  "id": "9d180b9b-2601-4a1e-b4a1-9e8fded6f394",
  "lastName": "O'Keefe",
  "firstName": "Joseph",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/zvchkelly/128.jpg",
  "birthday": 1037798625865
}, {
  "id": "1ea7ab1f-1eb2-4a56-ad45-df5cf1ec85cc",
  "lastName": "O'Reilly",
  "firstName": "Jameson",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/arishi_/128.jpg",
  "birthday": 826879604467
}, {
  "id": "e535a43c-5271-4257-812f-76be426bae67",
  "lastName": "Wilkinson",
  "firstName": "Kenyon",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/itsajimithing/128.jpg",
  "birthday": 1402692289892
}, {
  "id": "cca604b9-8e16-4f9a-a37e-deebe0de505f",
  "lastName": "Mertz",
  "firstName": "Claude",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/megdraws/128.jpg",
  "birthday": 317143779641
}, {
  "id": "cac8615a-0730-4519-b4b7-34c9592d2470",
  "lastName": "Harvey",
  "firstName": "Shyanne",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/thehacker/128.jpg",
  "birthday": 592513896097
}, {
  "id": "f838e9aa-56d2-4f03-ab11-47673a217fc5",
  "lastName": "Gleason",
  "firstName": "Orpha",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/blakesimkins/128.jpg",
  "birthday": 706617912851
}, {
  "id": "dc93f4ff-3eae-426e-a40f-1e0d189f7a43",
  "lastName": "Greenholt",
  "firstName": "Florine",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/switmer777/128.jpg",
  "birthday": 1297302808569
}, {
  "id": "c81b341a-e9f4-4a12-978a-6a412780946f",
  "lastName": "Lind",
  "firstName": "Ryder",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/g3d/128.jpg",
  "birthday": 753139681691
}, {
  "id": "9b760e4e-56d4-4e75-9cf1-277fc35d6083",
  "lastName": "Spinka",
  "firstName": "Alicia",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/baluli/128.jpg",
  "birthday": 469245384916
}, {
  "id": "11e72616-7db2-4729-ba7b-1bef4271947b",
  "lastName": "Bogan",
  "firstName": "Garret",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/mds/128.jpg",
  "birthday": 1554677632443
}, {
  "id": "48ca5747-006c-45e5-bc6b-d2e188f2057a",
  "lastName": "Boyer",
  "firstName": "Leonora",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/borantula/128.jpg",
  "birthday": 440480006308
}, {
  "id": "6ab44432-0347-4aa7-9011-b2d9a263e941",
  "lastName": "Nikolaus",
  "firstName": "Melvin",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/meelford/128.jpg",
  "birthday": 1232166787673
}, {
  "id": "32067372-10b1-47d9-85fa-05c37f34bf79",
  "lastName": "Keeling",
  "firstName": "Sherwood",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/jefffis/128.jpg",
  "birthday": 1264333932408
}, {
  "id": "d6b9cf39-d584-4e45-9d38-991515a0bc1a",
  "lastName": "Cummings",
  "firstName": "Tamia",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/hiemil/128.jpg",
  "birthday": 664906190643
}, {
  "id": "a2794f53-c333-4913-97a7-42c0c31569c2",
  "lastName": "Kozey",
  "firstName": "Bill",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/jarsen/128.jpg",
  "birthday": 360186233472
}, {
  "id": "c54f8e30-1abe-4191-86e3-221763991ec0",
  "lastName": "Haley",
  "firstName": "Providenci",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/petar_prog/128.jpg",
  "birthday": 659156440897
}, {
  "id": "30c4ba46-c123-4789-bc87-b9cd342a08e7",
  "lastName": "Wisozk",
  "firstName": "Estella",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/baliomega/128.jpg",
  "birthday": 1556884005680
}, {
  "id": "00ba8ca2-84b6-49ee-adb1-5c27191f1af1",
  "lastName": "McDermott",
  "firstName": "Simone",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/jm_denis/128.jpg",
  "birthday": 1466166470473
}, {
  "id": "6aae79f4-6e0e-4fa4-a75a-06b1097c1bff",
  "lastName": "Bergnaum",
  "firstName": "Jermain",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/amywebbb/128.jpg",
  "birthday": 550478426776
}, {
  "id": "1d91be69-1b89-488c-90b8-96ad0e9eb302",
  "lastName": "Boehm",
  "firstName": "Harmony",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/woodsman001/128.jpg",
  "birthday": 116497780210
}, {
  "id": "6cc1fc84-7faf-464d-a920-3a81793bbc1c",
  "lastName": "Kuvalis",
  "firstName": "Anastasia",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/herkulano/128.jpg",
  "birthday": 739887840848
}, {
  "id": "04960dd8-1cf8-4f20-b4d2-fa3521cfed2c",
  "lastName": "Pacocha",
  "firstName": "Jermaine",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/chrismj83/128.jpg",
  "birthday": 1541837035997
}, {
  "id": "d510f4ba-5ab9-4f41-9e2f-0a3f8da46fe9",
  "lastName": "Robel",
  "firstName": "Orlando",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/_dwite_/128.jpg",
  "birthday": 1147565321291
}, {
  "id": "cd4c7108-296e-43e2-b1bd-cf9e7e0d5222",
  "lastName": "Paucek",
  "firstName": "Tracy",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/sandywoodruff/128.jpg",
  "birthday": 169963737077
}, {
  "id": "b40e991c-8cee-44ef-a7a2-ce1fd6bee646",
  "lastName": "Ledner",
  "firstName": "Providenci",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/alterchuca/128.jpg",
  "birthday": 17617819249
}, {
  "id": "19efeb1b-2c56-4c7b-902c-7d46efc263c4",
  "lastName": "Rowe",
  "firstName": "Khalil",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/doooon/128.jpg",
  "birthday": 1453397714156
}, {
  "id": "4b545228-2d36-49df-a71f-65c245713137",
  "lastName": "Kuphal",
  "firstName": "Elmo",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/gabrielizalo/128.jpg",
  "birthday": 1446407787878
}, {
  "id": "99538f88-ab0f-4be2-b574-21874a5d9f88",
  "lastName": "Littel",
  "firstName": "Eldridge",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/zvchkelly/128.jpg",
  "birthday": 162542910895
}, {
  "id": "dfdee642-465d-4786-baec-ab3fbf5a6eac",
  "lastName": "Turner",
  "firstName": "Cletus",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/missaaamy/128.jpg",
  "birthday": 129709713903
}, {
  "id": "994a8152-6c94-44ea-ae7f-6be56700376f",
  "lastName": "Hoeger",
  "firstName": "Melany",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/fabbrucci/128.jpg",
  "birthday": 1177729119656
}, {
  "id": "bd45b053-454c-47d6-afe5-6b8f8c82d751",
  "lastName": "Waelchi",
  "firstName": "Brooklyn",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/mandalareopens/128.jpg",
  "birthday": 1157960290996
}, {
  "id": "c650e8c6-8326-4bc0-9f56-15eaea0a14b1",
  "lastName": "Corwin",
  "firstName": "Zane",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/doronmalki/128.jpg",
  "birthday": 1544760408259
}, {
  "id": "9f1b2352-7af2-4019-a035-b6459155a15f",
  "lastName": "Purdy",
  "firstName": "Terry",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/imsoper/128.jpg",
  "birthday": 621418612875
}, {
  "id": "9af6b30e-4624-4c54-965f-8c7d5fc13a64",
  "lastName": "Rosenbaum",
  "firstName": "Monica",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/gregrwilkinson/128.jpg",
  "birthday": 547296222344
}, {
  "id": "091e513a-0a56-49f8-a293-34a4f1931c22",
  "lastName": "Erdman",
  "firstName": "Aiden",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/jeremyshimko/128.jpg",
  "birthday": 472075142095
}, {
  "id": "3458830f-76ae-43ca-83b3-7325b47c729a",
  "lastName": "Hermann",
  "firstName": "Jovan",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/nandini_m/128.jpg",
  "birthday": 1228116803428
}, {
  "id": "fcc014e9-6158-40cb-8f2d-847c1f7d2445",
  "lastName": "O'Connell",
  "firstName": "Gerda",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/jitachi/128.jpg",
  "birthday": 965765455414
}, {
  "id": "e5c01b19-1e3a-4e99-abc3-5a4180c51c28",
  "lastName": "Greenholt",
  "firstName": "Tod",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/nandini_m/128.jpg",
  "birthday": 175348787477
}, {
  "id": "24fc248e-a710-43b5-be85-a07178380f80",
  "lastName": "Hirthe",
  "firstName": "Enid",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/maximsorokin/128.jpg",
  "birthday": 991237731056
}, {
  "id": "77e343dc-b870-4cea-adf0-a83216f6dc1f",
  "lastName": "Jaskolski",
  "firstName": "Abe",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/danpliego/128.jpg",
  "birthday": 460305517098
}, {
  "id": "c4784fb3-a9d7-489a-9a9a-4481921c67e9",
  "lastName": "Goodwin",
  "firstName": "Estevan",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/ffbel/128.jpg",
  "birthday": 1205001068753
}, {
  "id": "ccd71923-eef2-4b16-8d76-37d89f62d2ed",
  "lastName": "Schinner",
  "firstName": "Fay",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/syropian/128.jpg",
  "birthday": 1034738251297
}, {
  "id": "e2b1470f-f6d4-4885-9f05-71037f9622e4",
  "lastName": "Keebler",
  "firstName": "Alexis",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/bruno_mart/128.jpg",
  "birthday": 917244318988
}, {
  "id": "6477cb17-9d8b-4be6-a426-924903cbb4ab",
  "lastName": "Littel",
  "firstName": "Reynold",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/dshster/128.jpg",
  "birthday": 747966972202
}, {
  "id": "a506e67f-269e-47a0-b486-3925874f6ec8",
  "lastName": "Deckow",
  "firstName": "Wilfrid",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/ManikRathee/128.jpg",
  "birthday": 1574625676754
}, {
  "id": "2397dbbe-09ad-4863-966a-08e99734a96b",
  "lastName": "Daniel",
  "firstName": "Aglae",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/markretzloff/128.jpg",
  "birthday": 1475093885653
}, {
  "id": "12a33a94-c500-4b8a-944f-45ec046aa56b",
  "lastName": "Heidenreich",
  "firstName": "Cade",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/klimmka/128.jpg",
  "birthday": 659966463878
}, {
  "id": "bc4cf231-30f3-4a5b-85ca-f1e9a68ad1bb",
  "lastName": "Kunde",
  "firstName": "Chanelle",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/samscouto/128.jpg",
  "birthday": 771719125520
}, {
  "id": "51e3d5ab-2ddb-410b-adfc-0af340f1151e",
  "lastName": "Kiehn",
  "firstName": "Lilly",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/Talbi_ConSept/128.jpg",
  "birthday": 76090599167
}, {
  "id": "9c2aa110-8705-4c2a-b185-8f9f6e878070",
  "lastName": "Baumbach",
  "firstName": "Lina",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/calebjoyce/128.jpg",
  "birthday": 276975856643
}, {
  "id": "b3f8d2a9-2abe-4926-85d4-0d10fa6e944b",
  "lastName": "Stanton",
  "firstName": "Jamel",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/linkibol/128.jpg",
  "birthday": 515128025486
}, {
  "id": "795b28bf-7854-49ba-a210-454cd6165e5f",
  "lastName": "Erdman",
  "firstName": "Jovani",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/buddhasource/128.jpg",
  "birthday": 892704071397
}, {
  "id": "cc909ed2-d0f8-40c1-bce3-52911e27e76e",
  "lastName": "Reilly",
  "firstName": "Halle",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/_williamguerra/128.jpg",
  "birthday": 902445552435
}, {
  "id": "3eb41f9e-7794-4e3d-bfb1-67a9ec6194c9",
  "lastName": "Johnson",
  "firstName": "Cayla",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/andrewarrow/128.jpg",
  "birthday": 248897227496
}, {
  "id": "15703468-1fc9-446e-b67c-77f860f3968e",
  "lastName": "Nitzsche",
  "firstName": "Torey",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/aroon_sharma/128.jpg",
  "birthday": 533273249724
}, {
  "id": "28c64999-0521-47b9-9cb7-6aff60637284",
  "lastName": "Hagenes",
  "firstName": "Justen",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/abdots/128.jpg",
  "birthday": 1204806653040
}, {
  "id": "56e87b8a-b61a-4951-8e99-a37ad285033d",
  "lastName": "Muller",
  "firstName": "Winfield",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/chris_witko/128.jpg",
  "birthday": 487799206165
}, {
  "id": "c6369189-0b8e-44ac-b5bb-16b53ea64fed",
  "lastName": "Lynch",
  "firstName": "Gilberto",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/nellleo/128.jpg",
  "birthday": 348905534786
}, {
  "id": "38343781-8e60-4bab-82e5-40689cb146c3",
  "lastName": "Bartoletti",
  "firstName": "Archibald",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/ajaxy_ru/128.jpg",
  "birthday": 1196990571546
}, {
  "id": "b2cf0b37-ab94-49e6-8663-3acc5573aab6",
  "lastName": "Green",
  "firstName": "Pasquale",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/geobikas/128.jpg",
  "birthday": 591364313394
}, {
  "id": "1d0a6153-90b5-413a-ad77-9fbc93b6743b",
  "lastName": "Schroeder",
  "firstName": "Cullen",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/homka/128.jpg",
  "birthday": 648765505104
}, {
  "id": "848c76f0-5eda-407b-9741-a57a239fff88",
  "lastName": "Rowe",
  "firstName": "Sheldon",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/ddggccaa/128.jpg",
  "birthday": 602135119331
}, {
  "id": "45c13c58-42f5-49f3-bda9-8eefaaf837cc",
  "lastName": "Tremblay",
  "firstName": "Demetris",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/j2deme/128.jpg",
  "birthday": 523837449396
}, {
  "id": "48bd55de-5562-494e-9121-dd49b81ebbce",
  "lastName": "Brekke",
  "firstName": "Pierce",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/liminha/128.jpg",
  "birthday": 1260467670757
}, {
  "id": "557860a1-6d76-4ce1-b7fc-0e3b53e44504",
  "lastName": "Parker",
  "firstName": "Ashleigh",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/prinzadi/128.jpg",
  "birthday": 80635078856
}, {
  "id": "06502f93-66e0-4b6e-bbcb-b6eef5af8445",
  "lastName": "Gaylord",
  "firstName": "Dayne",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/leonfedotov/128.jpg",
  "birthday": 783687290088
}, {
  "id": "1f8c27a1-dfc9-4074-beb9-101eb92fbc70",
  "lastName": "Becker",
  "firstName": "Obie",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/BroumiYoussef/128.jpg",
  "birthday": 529678676359
}, {
  "id": "e9432b38-addd-4723-9d3c-7f731b7cc8dd",
  "lastName": "McCullough",
  "firstName": "Millie",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/jeremyworboys/128.jpg",
  "birthday": 750084890351
}, {
  "id": "9c28486b-55e5-4a58-860e-0b2f723bac18",
  "lastName": "Bednar",
  "firstName": "Esmeralda",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/pechkinator/128.jpg",
  "birthday": 518566842049
}, {
  "id": "bf660b5d-6673-4a1b-b5df-763022867098",
  "lastName": "Murray",
  "firstName": "Kristopher",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/manekenthe/128.jpg",
  "birthday": 726792705575
}, {
  "id": "d18e09ae-1b08-4c10-a7af-0ad76f525169",
  "lastName": "McGlynn",
  "firstName": "Ray",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/lebronjennan/128.jpg",
  "birthday": 1184062794388
}, {
  "id": "23fa30e1-72a5-4290-bc46-27200ff07d29",
  "lastName": "Boyer",
  "firstName": "Rene",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/ryankirkman/128.jpg",
  "birthday": 1413512281834
}, {
  "id": "a2b63b0a-a062-4902-9f7e-cc3a20494c49",
  "lastName": "Windler",
  "firstName": "Trevor",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/petrangr/128.jpg",
  "birthday": 1528734074991
}, {
  "id": "400771e8-4c67-45ca-a4fd-063b45b2e837",
  "lastName": "Schultz",
  "firstName": "Jannie",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/beshur/128.jpg",
  "birthday": 1451520121222
}, {
  "id": "2b1d9c28-fd0a-4708-91d4-de05c51197c8",
  "lastName": "Grady",
  "firstName": "Orval",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/shinze/128.jpg",
  "birthday": 990181241566
}, {
  "id": "1d7ad419-3a23-4426-8fcc-fa961f006be6",
  "lastName": "Wuckert",
  "firstName": "Columbus",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/lu4sh1i/128.jpg",
  "birthday": 348264676149
}, {
  "id": "43fbe560-9404-41c8-82ec-8e26ebb3fd21",
  "lastName": "Monahan",
  "firstName": "Logan",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/harry_sistalam/128.jpg",
  "birthday": 505395295801
}, {
  "id": "f5e911d2-65c4-46c2-8e2a-f51a9cada7b0",
  "lastName": "Corwin",
  "firstName": "Elliot",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/sur4dye/128.jpg",
  "birthday": 1404719180215
}, {
  "id": "be2030de-8587-4e4a-a9fd-bba5cc153752",
  "lastName": "Yost",
  "firstName": "Augustus",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/prheemo/128.jpg",
  "birthday": 1062538395454
}, {
  "id": "37ebdb68-518e-4825-9143-9b312da2dd47",
  "lastName": "Larson",
  "firstName": "Bud",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/bereto/128.jpg",
  "birthday": 661268988883
}, {
  "id": "546dc03d-a05c-4e05-80a4-cd0ba29de142",
  "lastName": "Sanford",
  "firstName": "Harvey",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/jeremiaha/128.jpg",
  "birthday": 410752382309
}, {
  "id": "2f35eec9-2325-4863-baa4-61aa4df6830e",
  "lastName": "Beahan",
  "firstName": "Helene",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/mufaddal_mw/128.jpg",
  "birthday": 1486397531786
}, {
  "id": "6613b55c-db5e-4435-9eee-eff4b7f3547f",
  "lastName": "Feest",
  "firstName": "Kailey",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/bobwassermann/128.jpg",
  "birthday": 1066423464923
}, {
  "id": "fa3cade3-fb19-4c20-b293-de5e22b1fdfb",
  "lastName": "Lowe",
  "firstName": "Clark",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/gavr1l0/128.jpg",
  "birthday": 313154778249
}, {
  "id": "912bf8d0-2759-44dc-8793-009be5c13cd7",
  "lastName": "Ferry",
  "firstName": "Precious",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/kuldarkalvik/128.jpg",
  "birthday": 138625637951
}, {
  "id": "76f9ca58-3c48-431c-8ef3-54cfdf19b23d",
  "lastName": "Weber",
  "firstName": "Naomie",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/jesseddy/128.jpg",
  "birthday": 981981239566
}, {
  "id": "4c8d9127-60ec-4bd6-a94e-ecd6cd621287",
  "lastName": "Boyer",
  "firstName": "Margret",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/jimmuirhead/128.jpg",
  "birthday": 1168677240324
}, {
  "id": "a5b05e3f-5cec-46e0-97b2-c844a341f6f3",
  "lastName": "Bechtelar",
  "firstName": "Evan",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/linux29/128.jpg",
  "birthday": 1139906216637
}, {
  "id": "fcc119ac-1cfe-4c20-b0bb-49ebc48dcf08",
  "lastName": "Kling",
  "firstName": "Colleen",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/naitanamoreno/128.jpg",
  "birthday": 159259345234
}, {
  "id": "8f224d1e-560d-46c2-b88d-73fc2d63b901",
  "lastName": "Anderson",
  "firstName": "Vito",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/safrankov/128.jpg",
  "birthday": 937078493840
}, {
  "id": "00a3bf38-3ae8-4641-bffa-339c93eaf844",
  "lastName": "Huels",
  "firstName": "Rae",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/benoitboucart/128.jpg",
  "birthday": 1052164956751
}, {
  "id": "db2b0e20-f0a3-40d3-8fc0-00a45524f83e",
  "lastName": "Krajcik",
  "firstName": "Felix",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/ademilter/128.jpg",
  "birthday": 892895123355
}, {
  "id": "c90b8f62-7b31-433f-9e5e-a46ec7358cf6",
  "lastName": "Carter",
  "firstName": "Gerald",
  "picture": "https://s3.amazonaws.com/uifaces/faces/twitter/kurafire/128.jpg",
  "birthday": 1372161498194
}];
exports.peoples = peoples;
},{}],"script.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchPeople = fetchPeople;
exports.people = void 0;

var _element = require("./element.js");

var _utils = require("./utils.js");

var _handler = require("./handler.js");

var _display = require("./display.js");

var _displayEdit = require("./display-edit.js");

var _add = require("./add.js");

var _people = require("./people");

console.log(_people.peoples);
let people = []; //Fetch the data from the people.json files

exports.people = people;

async function fetchPeople() {
  const response = await fetch("./people.json");
  const data = await response.json();
  exports.people = people = data;
  console.log(data);

  function editandDeleteButtons(e) {
    if (e.target.closest('button.edit')) {
      const closer = e.target.closest('.tr_container');
      const editBtn = closer.querySelector('button.edit');
      const id = editBtn.value;
      (0, _displayEdit.displayEditBtn)(id);
    }

    if (e.target.closest('button.delete')) {
      const deleteBtn = e.target.closest('button.delete');
      const id = deleteBtn.value;
      displayDeleteBtn(id);
    }
  } //Html for the delete button


  function displayDeleteBtn(idToDelete) {
    return new Promise(async function (resolve) {
      // First we need to create a popp with all the fields in it
      const delPopup = document.createElement('div');
      delPopup.classList.add('delPopup');
      delPopup.insertAdjacentHTML('afterbegin', `	
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
          (0, _utils.destroyPopup)(delPopup);
        }

        window.addEventListener('keydown', e => {
          if (e.key === 'Escape') {
            (0, _utils.destroyPopup)(delPopup);
          }
        });
        const yesBtn = e.target.closest('button.yes');

        if (yesBtn) {
          const removeLi = people.filter(people => people.id != idToDelete);
          const btndelete = removeLi;
          exports.people = people = btndelete;
          (0, _display.displayPeople)(btndelete);

          _element.tbody.dispatchEvent(new CustomEvent('updatedTheList'));

          (0, _utils.destroyPopup)(delPopup);
        }
      });
      document.body.appendChild(delPopup);
      delPopup.classList.add('open');
    });
  } // //To get the items from the local storage


  const initialStorage = () => {
    const stringFromLs = localStorage.getItem('people');
    const lsItems = JSON.parse(stringFromLs);

    if (lsItems) {
      exports.people = people = lsItems;

      _element.tbody.dispatchEvent(new CustomEvent('updatedTheList'));
    } else {
      exports.people = people = people;
    }
  }; // To set the item in the local storage.


  const updateLocalStorage = () => {
    localStorage.setItem('people', JSON.stringify(people));
  }; //************* EVENT LISTENER **********


  _element.resetBtn.addEventListener('click', _utils.resetFilters);

  _element.filterNameInput.addEventListener('keyup', _utils.filter);

  _element.filterMonthBirthday.addEventListener('change', _utils.filter);

  _element.tbody.addEventListener('updatedTheList', _display.displayPeople);

  _element.tbody.addEventListener('updatedTheList', updateLocalStorage);

  _element.modalInner.addEventListener('submit', _add.addNewPeople);

  _element.modalOuter.addEventListener('click', _utils.handleClickOutside);

  _element.tbody.addEventListener('click', editandDeleteButtons);

  initialStorage();
}

_element.buttonAdd.addEventListener('click', _handler.handleNewPeople);

window.addEventListener('keydown', _utils.handleEscapeKey);
fetchPeople();
},{"./element.js":"element.js","./utils.js":"utils.js","./handler.js":"handler.js","./display.js":"display.js","./display-edit.js":"display-edit.js","./add.js":"add.js","./people":"people.js"}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50883" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map