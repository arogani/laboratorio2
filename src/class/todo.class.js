//Creamos la Clase TAREA con sus variables y exportamos para utilizar en otros archivos
export class Todo {
    constructor ( tarea ){
        this.tarea      = tarea;
        this.id         = new Date().getTime();
        this.completado = false;
        this.creado     = new Date();
    }
}