export default class Juego{
    #codigo;
    #titulo;
    #descripcion; 
    #imagen;
    #genero;
    #creador;
    #lanzamiento;
    #edad;
    #precio;

    constructor(codigo = uuidv4(), titulo, descripcion, imagen, genero, creador, lanzamiento, edad,precio) {
        this.#codigo = codigo;
        this.#titulo = titulo;
        this.#descripcion = descripcion;
        this.#imagen = imagen;
        this.#genero = genero;
        this.#creador = creador;
        this.#lanzamiento = lanzamiento;
        this.#edad = edad;
        this.#precio = precio;
    }

     getCodigo() {
        return this.#codigo;
    }

    getTitulo() {
        return this.#titulo;
    }

    getDescripcion() {
        return this.#descripcion;
    }

    getImagen() {
        return this.#imagen;
    }

    getGenero() {
        return this.#genero;
    }

    getCreador() {
        return this.#creador;
    }

    getLanzamiento() {
        return this.#lanzamiento;
    }

    getEdad() {
        return this.#edad;
    }
    getPrecio() {
        return this.#precio;
    }
    

    setCodigo(codigo) {
        this.#codigo = codigo;
    }

    setTitulo(titulo) {
        this.#titulo = titulo;
    }

    setDescripcion(descripcion) {
        this.#descripcion = descripcion;
    }

    setImagen(imagen) {
        this.#imagen = imagen;
    }

    setGenero(genero) {
        this.#genero = genero;
    }

    setCreador(creador) {
        this.#creador = creador;
    }

    setLanzamiento(lanzamiento) {
        this.#lanzamiento = lanzamiento;
    }

    setEdad(edad) {
        this.#edad = edad;
    }
    setPrecio(precio) {
        this.#precio = precio;
    }
    toJSON() {
        return {
            codigo: this.#codigo,
            titulo: this.#titulo,
            descripcion: this.#descripcion,
            imagen: this.#imagen,
            genero: this.#genero,
            creador: this.#creador,
            lanzamiento: this.#lanzamiento,
            edad: this.#edad,
            precio: this.#precio
        };
    }

}

export class usuario {
    #email;
    #contraseña;
    #rol;
    constructor(email,contraseña,rol){
        this.#email = email;
        this.#contraseña = contraseña;
        this.#rol= rol;
    }

    getEmail(){
        return this.#email
    }
    getContraseña(){
        return this.#contraseña
    }
    getRol(){
        return this.#rol
    }

    setEmail(email){
        this.#email = email
    }
    setContraseña(contraseña){
        this.#contraseña = contraseña
    }
    setRol(rol){
        this.#rol = rol
    }

    toJSON(){
        return{
            email: this.#email,
            constraseña: this.#contraseña,
            rol:this.#rol
        }
    }
}

export class Comentario{

    constructor(usuario, titulo, descripcion, fecha, cantidadEstrellas, idJuego) {
        this.usuario = usuario;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.cantidadEstrellas = cantidadEstrellas;
        this.idJuego = idJuego;
    }

    toJSON() {
        return {
            usuario: this.usuario,
            titulo: this.titulo,
            descripcion: this.descripcion,
            fecha: this.fecha, // Se convierte a formato ISO para facilitar la serialización/deserialización de fechas.
            cantidadEstrellas: this.cantidadEstrellas,
            idJuego: this.idJuego
        };
    }
}