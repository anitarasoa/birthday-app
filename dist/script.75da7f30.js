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
var buttonAdd = document.querySelector('.btn-add');
exports.buttonAdd = buttonAdd;
var modalOuter = document.querySelector('.modal_outer');
exports.modalOuter = modalOuter;
var modalInner = document.querySelector('.modal_inner');
exports.modalInner = modalInner;
var tbody = document.querySelector('tbody');
exports.tbody = tbody;
var filterNameInput = document.querySelector("#search_name");
exports.filterNameInput = filterNameInput;
var filterMonthBirthday = document.querySelector("#month_birthday");
exports.filterMonthBirthday = filterMonthBirthday;
var filterForm = document.querySelector('.form_filter');
exports.filterForm = filterForm;
var resetBtn = document.querySelector('.reset_filter');
exports.resetBtn = resetBtn;
},{}],"display.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayPeople = void 0;

var _script = require("./script.js");

var _element = require("./element.js");

var displayPeople = function displayPeople(e, filterName, filterMonth) {
  var sortedBirthday = _script.people.sort(function (a, b) {
    var dateA = new Date(a.birthday);
    var dateB = new Date(b.birthday);
    return dateA.getTime() - dateB.getTime();
  });

  if (filterName) {
    sortedBirthday = sortedBirthday.filter(function (person) {
      var lowerCaseTitle = person.lastName.toLowerCase();
      var lowerCaseFilter = filterName.toLowerCase();

      if (lowerCaseTitle.includes(lowerCaseFilter)) {
        return true;
      } else {
        return false;
      }
    });
  }

  if (filterMonth) {
    sortedBirthday = sortedBirthday.filter(function (person) {
      var myDateBirth = new Date(person.birthday);
      var month = myDateBirth.toLocaleString("en-us", {
        month: "long"
      });
      var monthLowerCase = month.toLowerCase();
      var lowerCaseMonth = filterMonth.toLowerCase();

      if (monthLowerCase == lowerCaseMonth) {
        return true;
      } else {
        return false;
      }
    });
  }

  _element.tbody.innerHTML = sortedBirthday.map(function (person) {
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

    var myDate = new Date(person.birthday);
    var today = new Date();
    var myDateYear = myDate.getFullYear();
    var myDateMonth = myDate.getMonth() + 1;
    var myDateDay = myDate.getDay();
    var bithdayResult = "".concat(myDateYear, "/").concat(myDateMonth, "/").concat(myDateDay);
    var age = today.getFullYear() - myDateYear;
    var month = myDate.toLocaleString("en-us", {
      month: "long"
    });
    var myBirthday = [myDateDay, myDateMonth];
    var myBirthdayDay = new Date(today.getFullYear(), myBirthday[1] - 1, myBirthday[0]);

    if (today.getTime() > myBirthdayDay.getTime()) {
      myBirthdayDay.setFullYear(myBirthdayDay.getFullYear() + 1);
    }

    var different = myBirthdayDay.getTime() - today.getTime();
    var days = Math.round(different / (1000 * 60 * 60 * 24)); //Create html for the data and put into dom.

    return "\n        <tr data-id=\"".concat(person.id, "\" class=\"tr_container\">\n            <td><img class=\"picture\" src=\"").concat(person.picture, "\" alt=\"").concat(person.firstName + ' ' + person.lastName, "\"/></td>\n            <td class=\"lastname\">").concat(person.lastName, " ").concat(person.firstName, "</td>\n            <td>").concat(bithdayResult, "</td>\n            <td>Turn ").concat(age, " on ").concat(month, " ").concat(myDateDay, "<sup>").concat(suffixDay(myDateDay), "</sup></td>\n            <td>After ").concat(days, " Days</td>\n            <td>\n                <button class=\"edit\" value=\"").concat(person.id, "\"> Edit</button>\n            </td>\n            <td>\n                <button class=\"delete\" value=\"").concat(person.id, "\"> Delete</button>\n            </td>\n        </tr>\n        ");
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

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var resetFilters = function resetFilters(e) {
  _element.filterForm.reset();

  (0, _script.fetchPeople)();
};

exports.resetFilters = resetFilters;

var filter = function filter(e) {
  (0, _display.displayPeople)(e, _element.filterNameInput.value, _element.filterMonthBirthday.value);
};

exports.filter = filter;

function wait() {
  var ms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
}

function destroyPopup(_x) {
  return _destroyPopup.apply(this, arguments);
}

function _destroyPopup() {
  _destroyPopup = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(popup) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            popup.classList.remove('open');
            _context.next = 3;
            return wait(500);

          case 3:
            popup.remove(); //remove it from the javascript memory

            popup = null;

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _destroyPopup.apply(this, arguments);
}

; //Close modal 

var closeModal = function closeModal() {
  _element.modalOuter.classList.remove('open');
}; //Close modal when you click outside


exports.closeModal = closeModal;

var handleClickOutside = function handleClickOutside(e) {
  var clickOutside = !e.target.closest('.modal_inner');

  if (clickOutside) {
    closeModal();
  }
};

exports.handleClickOutside = handleClickOutside;

var handleEscapeKey = function handleEscapeKey(e) {
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
var handleNewPeople = function handleNewPeople() {
  _element.modalInner.innerHTML = "\n    <form action=\"\" class=\"form_submit\">\n        <fieldset>\n            <label for=\"picture\">Picture</label>\n            <input type=\"url\" id=\"picture\" name=\"picture\" required>\n        </fieldset>\n        <fieldset>\n            <label for=\"lastname\">Last name</label>\n            <input type=\"text\" id=\"lastname\" name=\"lastname\" required>\n        </fieldset>\n        <fieldset>\n            <label for=\"firstname\">First name</label>\n            <input type=\"text\" id=\"firstname\" name=\"firstname\" required>\n        </fieldset>\n        <fieldset>\n            <label for=\"birthday\">Days</label>\n            <input type=\"date\" id=\"birthday\" name=\"birthday\" required>\n        </fieldset>\n        <div class=\"buttons\">\n            <button type=\"submit\" class=\"submit\">Submit</button>\n        </div>\n        </form>\n    ";

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
  var findPeople = _script.people.find(function (people) {
    return people.id == idToEdit;
  });

  var myDate = new Date(findPeople.birthday);
  var myDateYear = myDate.getFullYear();
  var myDateMonth = myDate.getMonth() + 1;
  var myDateDay = myDate.getDay();
  var bithdayResult = "".concat(myDateYear, "/").concat(myDateMonth, "/").concat(myDateDay); // First we need to create a popp with all the fields in it

  var popup = document.createElement('form');
  popup.classList.add('popup');
  popup.insertAdjacentHTML('afterbegin', "\n            <fieldset>\n                <label for=\"pictures\">Picture</label>\n                <input type=\"url\" id=\"pictures\" name=\"pictures\" value=\"".concat(findPeople.picture, "\" required>\n            </fieldset>\n            <fieldset>\n                <label for=\"lastName\">Last name</label>\n                <input type=\"text\" id=\"lastName\" name=\"lastName\" value=\"").concat(findPeople.lastName, "\" required>\n            </fieldset>\n            <fieldset>\n                <label for=\"firstName\">First name</label>\n                <input type=\"text\" id=\"firstName\" name=\"firstName\" value=\"").concat(findPeople.firstName, "\" required>\n            </fieldset>\n            <fieldset>\n                <label for=\"birthDay\">Days</label>\n                <input type=\"text\" id=\"birthDay\" name=\"birthDay\" value=\"").concat(bithdayResult, "\" required>\n            </fieldset>\n            <div class=\"buttons\">\n                <button type=\"submit\" class=\"submitbtn\">Submit</button>\n                <button type=\"button\" class=\"cancelEdit\">Cancel</button>\n            </div>\n        "));
  window.addEventListener('click', function (e) {
    if (e.target.closest('button.cancelEdit')) {
      (0, _utils.destroyPopup)(popup);
    }
  });
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      (0, _utils.destroyPopup)(popup);
    }
  });
  popup.addEventListener('submit', function (e) {
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
var addNewPeople = function addNewPeople(e) {
  e.preventDefault();
  var form = e.target;
  console.log(form);
  var newPeople = {
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
},{"./script.js":"script.js","./element.js":"element.js","./utils.js":"utils.js"}],"script.js":[function(require,module,exports) {
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

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var people = []; //Fetch the data from the people.json files

exports.people = people;

function fetchPeople() {
  return _fetchPeople.apply(this, arguments);
}

function _fetchPeople() {
  _fetchPeople = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var response, data, editandDeleteButtons, displayDeleteBtn, initialStorage, updateLocalStorage;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            displayDeleteBtn = function _displayDeleteBtn(idToDelete) {
              return new Promise( /*#__PURE__*/function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve) {
                  var delPopup;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          // First we need to create a popp with all the fields in it
                          delPopup = document.createElement('div');
                          delPopup.classList.add('delPopup');
                          delPopup.insertAdjacentHTML('afterbegin', "\t\n                <h3>Are you sure that you want to delete this partener ?</h3>\n                <div class=\"deletebtns\">\n                    <button type=\"button\" class=\"yes\">yes</button>\n                    <button type=\"button\" class=\"cancelDelete\">Cancel</button>\n                </div>\n            ");
                          delPopup.classList.add('open');
                          window.addEventListener('click', function (e) {
                            var cancelBtn = e.target.closest('.cancelDelete');

                            if (cancelBtn) {
                              (0, _utils.destroyPopup)(delPopup);
                            }

                            window.addEventListener('keydown', function (e) {
                              if (e.key === 'Escape') {
                                (0, _utils.destroyPopup)(delPopup);
                              }
                            });
                            var yesBtn = e.target.closest('button.yes');

                            if (yesBtn) {
                              var removeLi = people.filter(function (people) {
                                return people.id != idToDelete;
                              });
                              var btndelete = removeLi;
                              exports.people = people = btndelete;
                              (0, _display.displayPeople)(btndelete);

                              _element.tbody.dispatchEvent(new CustomEvent('updatedTheList'));

                              (0, _utils.destroyPopup)(delPopup);
                            }
                          });
                          document.body.appendChild(delPopup);
                          delPopup.classList.add('open');

                        case 7:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                return function (_x) {
                  return _ref.apply(this, arguments);
                };
              }());
            };

            editandDeleteButtons = function _editandDeleteButtons(e) {
              if (e.target.closest('button.edit')) {
                var closer = e.target.closest('.tr_container');
                var editBtn = closer.querySelector('button.edit');
                var id = editBtn.value;
                (0, _displayEdit.displayEditBtn)(id);
              }

              if (e.target.closest('button.delete')) {
                var deleteBtn = e.target.closest('button.delete');
                var _id = deleteBtn.value;
                displayDeleteBtn(_id);
              }
            };

            _context2.next = 4;
            return fetch("./people.json");

          case 4:
            response = _context2.sent;
            _context2.next = 7;
            return response.json();

          case 7:
            data = _context2.sent;
            exports.people = people = data;

            // //To get the items from the local storage
            initialStorage = function initialStorage() {
              var stringFromLs = localStorage.getItem('people');
              var lsItems = JSON.parse(stringFromLs);
              console.log(lsItems);

              if (lsItems) {
                exports.people = people = lsItems;

                _element.tbody.dispatchEvent(new CustomEvent('updatedTheList'));
              } else {
                exports.people = people = [];
              }
            }; // To set the item in the local storage.


            updateLocalStorage = function updateLocalStorage() {
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

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _fetchPeople.apply(this, arguments);
}

_element.buttonAdd.addEventListener('click', _handler.handleNewPeople);

window.addEventListener('keydown', _utils.handleEscapeKey);
fetchPeople();
},{"./element.js":"element.js","./utils.js":"utils.js","./handler.js":"handler.js","./display.js":"display.js","./display-edit.js":"display-edit.js","./add.js":"add.js"}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49965" + '/');

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
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map