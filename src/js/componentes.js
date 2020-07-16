//EN COMPONENTES, trabajamos los eventos del HTML que utiliza el usuario

import { Todo } from '../class';
import { todoList } from '../index';

//Referencias en HTML
const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const btnBorrar     = document.querySelector('.clear-completed');
const ulFiltors     = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = ( todo ) => {
    const htmlTodo =  `
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li> `

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild );
    return div;
}

//Eventos: INGRESAR EL TEXTO Y LIMPIAR INPUT DEL TEXTO -- KEYUP ES EL EVENTO 'ENTER'
txtInput.addEventListener('keyup', (event) => {
    if ( event.keyCode === 13 && txtInput.value.length > 0 ) {
        const nuevoTodo = new Todo( txtInput.value );
        todoList.nuevoTodo ( nuevoTodo );
        crearTodoHtml( nuevoTodo );
        txtInput.value = '';
  }
});

//Eventos: Clic en las opciones "TILDE", "CRUZ" y LABEL y marca completado o eliminado
divTodoList.addEventListener('click',(event) => {
    
    const nombreElemento = event.target.localName; // input, label o button que hace clic el usuario lo guardamos
    const todoElemento   = event.target.parentElement.parentElement; //Toma el elemento ID (div) completo: input, label y button por si se tiene que borrar la activdad
    const todoId         = todoElemento.getAttribute('data-id'); // Recuperamos el ID 

    // si tiene elemento, significa que hizo clic en el chec
    if ( nombreElemento.includes('input') ){
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed'); // marca como compleatada la actividad
    } else if ( nombreElemento.includes( 'button')) {
        //borramos la actividad si toca la cruz del arreglo y despues del html
        todoList.eliminarTodo ( todoId );
        divTodoList.removeChild( todoElemento );
    }
});

//Eventos: Borramos todo los compleatods con el boton "BORRAR COMPLETADOS"
btnBorrar.addEventListener('click',() => {
    todoList.eliminarCompletados(); //borramos del arreglo
    //Recorremos todo el listado, de abajo para arriba por eso el length-1
    for( let i = divTodoList.children.length-1; i>=0; i-- ) {
        const elemento = divTodoList.children[i];
        if( elemento.classList.contains('completed') ){
            divTodoList.removeChild(elemento);
        }
    }
});

//Eventos: Comportamiento de los filtros
ulFiltors.addEventListener('click',(event) => {
    const filtro = event.target.text;
    if ( !filtro ) { return; }

    //Posicionamos con la marquita en que filtro estamois
    anchorFiltros.forEach( elem => elem.classList.remove('selected') );
    event.target.classList.add('selected');

    for ( const elemento of divTodoList.children ) {
        
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch( filtro ) {
            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden');
                }
            break;
            case 'Completados':
                if ( !completado ) {
                    elemento.classList.add('hidden');
                }
            break;
        }
    }
});