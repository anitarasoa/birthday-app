import { modalOuter,  filterForm } from './element.js';
import { fetchPeople } from './script.js';

export const resetFilters = e => {
    filterForm.reset();
    fetchPeople();
};

function wait(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function destroyPopup(popup) {
    popup.classList.remove('open');
    await wait(500);
    popup.remove();
    //remove it from the javascript memory
    popup = null;
};   

//Close modal 
export const closeModal = () => {
    modalOuter.classList.remove('open');
}

//Close modal when you click outside
export const handleClickOutside = (e) => {
    const clickOutside = !e.target.closest('.modal_inner');
    if (clickOutside) {
        closeModal();
    }
}

export const handleEscapeKey = (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
}