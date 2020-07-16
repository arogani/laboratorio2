//Importamos los Estilos
import './styles.css';

//Importamos las clases desde Class y desde JS
import { Todo, TodoList } from './class';
import { crearTodoHtml } from './js/componentes';

//Exportamos la inicializacion del TodoList
export const todoList = new TodoList();

todoList.todos.forEach( crearTodoHtml ); //todo y mandamos a llamar (=>) al crearTodoHtml

