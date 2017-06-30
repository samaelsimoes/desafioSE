import {isEnabled} from './lib/feature';

export function render(el, state) {
    const todoItems = state.todos.map(renderTodoItem).join('');
    el.innerHTML = renderApp(
        renderInput(),
        renderTodos(todoItems)
    );
}

function renderTodoTitle() {

    return `<h1 class="todo--title">SoftExpert</h1>`;
}

function renderApp(input, todoList,todoFilter) {

    if(isEnabled('renderBottom')&& !isEnabled('filter')) { // minha url com o final #renderBottom
        
        return renderAddTodoAtBottom(input, todoList);
    }else
        if(isEnabled('filter') && !isEnabled('renderBottom')) { // url final com filter3renderBottom
            
            return renderAddFilter(input, todoList);
        }else  // url filter#renderBottom#filterTop
            if(isEnabled('filter') && isEnabled('renderBottom') && isEnabled('filterTop')) {
                
                //alert("filter#renderBottom#filterTop" + input + "  " +  todoList + "  " + todoFilters + );
                return renderAddFilterTop(input, todoList);
            }else{
                
                alert("seila o valor");
                return renderAddTodoAtTop(input, todoList); //sem url correta do #renderBottom
            }


/*
### WEB-104: Adicione um TESTE para mudar a posição do filtro -- la no state ? adiciona com id 4 

Nós gostaríamos de testar a posição do filtro no topo da interface, quando o input -- fazer
está posicionado na posição de baixo na aplicação ("renderBottom").

Este teste, pode se chamar "filterTop" e só pode ser ativado quando os testes "filter" e "renderBottom"
estão ativos também. A hash da URL deve estar mais ou menos assim "index.html#filter#renderBottom#filterTop".
    
*/
    
}

function renderAddTodoAtTop(input, todoList) { // aqui estou montando o html do sem #renderBottom 
    return `<section class="section"> 
                <div class="container">
                    
                    <div class="row">
                        <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 navbar-left">
                           
                                <div id="app"> 

                                    <h2> Desafio SoftExpert: sem#RenderBottom </h3> <Br>

                                    ${input}
                                    <h3>${todoList}</h3>
                                </div>
                            
                        </div>
                    </div>
                </div>
            </section>`;
}

function renderAddTodoAtBottom(input, todoList) { // aqui estou montando o html do #renderBottom
    return `<section class="section"> 
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                            
                                <div class="row">
                                    <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 navbar-left">
                                        <h3> Desafio SoftExpert: #RenderBottom</h3> <br>
                                        <h3>${todoList}</h3>
                                        ${input}
                                    </div>
                                </div>
                            
                        </div>
                    </div>
                </div>
            </section>`;
}

function getfilter(){
    return `<section> 
                <div class="container">
                    <div class="row">
                        <div class="col-lg-11 col-lg-offset-2 col-md-10 col-md-offset-1 ">
                            <form class="filter">

                                <div className="filter navbar-center" onChange={onChange}>
                                    <label className="radio-inline align="middle"">

                                        <input type="radio" name="filter" value="all" id="all" checked/> Mostrar todos<br/>
                                    </label><br>
                                    <label className="radio-inline align="middle"">

                                        <input type="radio" name="filter" value="open" id="open" /> Abertos<br/>
                                    </label><br>
                                    <label className="checkbox-inline align="middle"">

                                        <input type="radio" name="filter" value="closed" id="close" /> Fechados<br/>
                                    </label>
                                </div>
                            </form>            
                            </div>
                        </div>
                    </div>
                </div>
            </section>`;
}

function renderInput() {
    return `<div class="todo__input">
                <input type="text" id="todoInput">
                <button  class="btn btn-primary" id="addTodo" type="onclick">Add</button>
            </div>`;
}
function renderAddFilter(input, todoList) { // montando html do FILTRO
    return `<section> 
                <div class="container">
                    <div class="row">
                        <div class="col-lg-11 col-lg-offset-2 col-md-10 col-md-offset-1 ">
                           

                                 <h2> Desafio SoftExpert: #filter </h3> <Br>
                                    
                                <div id="app">
                                    ${todoList}`
                                    + getfilter() +
                                `</div>    
                        </div>
                    </div>
                </div>
            </section>`;
}

function renderAddFilterTop(input, todoList) {
    return `<div id="app">`

            + getfilter() +
            `${todoList} </div>`
            + renderInput();
}

function renderTodos(todoItems) {
    return `<ul class="todo">${todoItems}</ul>`;
}

function renderTodoItem(todo) {

    const todoClass = `todo__item todo__item--${todo.done ? 'done' : 'open'}`;

    return `   <link href = "./src/css/bootstrap.css" rel="stylesheet">    
            <li class="${todoClass}">
                <input class="js_toggle_todo" type="checkbox" data-id="${todo.id}" ${todo.done ? ' checked' : ''}>
                ${todo.text}
            </li>`;
}
