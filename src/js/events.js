import {todos} from './state';
import {listen} from './lib/events';
import {addTodo, toggleTodoState} from './actions';

export function registerEventHandlers() {

	 listen('keypress', '#todoInput', event => {

        let key = event.which || event.keyCode;

        if (key == '13') {
            todos.dispatch(addTodo(todoInput.value));
            document.getElementById("todoInput").focus();
            return false;
        }
    });

    listen('click', '.js_toggle_todo', event => {

        const id = Number.parseInt(event.target.getAttribute('data-id'), 10);
        todos.dispatch(toggleTodoState(id));
    });

    listen('click', '#addTodo', event => {

        const todoInput = document.getElementById('todoInput');
        todos.dispatch(addTodo(todoInput.value));
        event.stopPropagation();
    });

   
    listen('click', '#all', event => {

        let item = document.querySelectorAll('.todo__item');
        for(let i in item) {

            item[i].classList.remove('close'); //pode ser subistituido o close para o hidden
        }
    });

    listen('click', '#open', event => { // aberto
        const closes = document.querySelectorAll('.todo__item--done');
        const opens = document.querySelectorAll('.todo__item--open');

        for(let i in (opens + closes )) {
            closes[i].classList.add('close'); //pode ser subistituido o close para o hidden
        }
    });

     listen('click', '#close', event => { // fechado
       

        const closes = document.querySelectorAll('.todo__item--done');
        const opens = document.querySelectorAll('.todo__item--open');

        for(let i in (closes + opens)) {

            closes[i].classList.remove('close'); //pode ser subistituido o close para o hidden
            opens[i].classList.add('close'); //pode ser subistituido o close para o hidden
        }
    });

}

// Display all Todo items
export function showAllItems() {
    const elements = document.getElementsByClassName('todo__item');

    for(var i = 0; i < elements.length; i++){
        elements[i].style.display = "block";
    }
}

// Hide Todo items by type ('open' or 'done')
export function hideItems(type) {
    const elements = document.getElementsByClassName(`todo__item--${type}`);

    for(var i = 0; i < elements.length; i++){
        elements[i].style.display = "none";
    }
}