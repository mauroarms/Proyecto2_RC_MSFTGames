export default class juego{
    #codigo;
    #titulo;
    #descripcion;
    #imagen;
    #genero;
    #creador;
    #lanzamiento;
    #edad;
    constructor(codigo = uuidv4(), titulo, description,imagen,genero,creador,lanzamiento,edad){
        this.#codigo = codigo;
        this.#titulo = titulo;
        this.#description = description;
        this.#imagen= imagen;
        this.#genero = genero;
        this.#creador = creador;
        this.#lanzamiento = lanzamiento;
        this.#edad = edad;
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

    toJSON() {
        return {
            codigo: this.#codigo,
            titulo: this.#titulo,
            descripcion: this.#descripcion,
            imagen: this.#imagen,
            genero: this.#genero,
            creador: this.#creador,
            lanzamiento: this.#lanzamiento,
            edad: this.#edad
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
        this.email = email
    }
    setConstraseña(contraseña){
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