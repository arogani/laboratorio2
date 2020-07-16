// CREAMOS LA CLASE TODOLIST en tonde se van trabajando las clases TODO (TAREA)
import { Todo } from './todo.class';

export class TodoList {
    constructor() {
        //this.todos = [];
        this.cargarLocalStorage(); //Carga el localStorage almacenado, el arreglo todos[] se inicializa ahi
    }

    nuevoTodo ( todo ) {
        this.todos.push( todo );
        this.guardarLocalStorage(); 
    }

    eliminarTodo( id ) {
        //va a regresar los Todos, exluyendo el arreglo que trae el ID y almacenamos ese valor, funcion que buscamos en internet
        this.todos = this.todos.filter( todo => todo.id != id );
        this.guardarLocalStorage(); 
    }

    marcarCompletado( id ){
        for( const todo of this.todos ) {
            if ( todo.id == id ) {
                todo.compleado = !todo.completado; // cambia el valor de completado a no completado o al reves 
                this.guardarLocalStorage(); 
                break;
            }
        }
    }

    eliminarCompletados(){
        this.todos = this.todos.filter( todo => !todo.compleado ); //trae todo los que NO ESTAN COMPLETADOS
        this.guardarLocalStorage(); 
    }

    guardarLocalStorage(){
        localStorage.setItem('todo', JSON.stringify(this.todos) ); //JSON.strinify te "desarma el arreglo"
    }

    cargarLocalStorage(){
        //Operacion ternaria (idem al IF), si CONDICION se cumple 
        //? Resultado (similar al entonces)
        //: Resultado (similar al else)
        this.todos = ( localStorage.getItem('todo') ) 
            ? this.todos = JSON.parse( localStorage.getItem('todo') ) // JSON.parse te "arma el arreglo"
            : []; // devuelvo el arreglo vacio
  
    }
}

