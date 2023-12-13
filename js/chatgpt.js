class Usuario {
    constructor(nombre, correo) {
      this.nombre = nombre;
      this.correo = correo;
    }
  }
  
  class Comentario {
    constructor(usuario, titulo, descripcion, fecha, cantidadEstrellas) {
      this.usuario = usuario;
      this.titulo = titulo;
      this.descripcion = descripcion;
      this.fecha = fecha;
      this.cantidadEstrellas = cantidadEstrellas;
    }
  
    // Método toJSON para serializar el objeto Comentario a JSON
    toJSON() {
      return {
        usuario: this.usuario,
        titulo: this.titulo,
        descripcion: this.descripcion,
        fecha: this.fecha.toISOString().split('T')[0], // Solo la fecha en formato ISO sin la hora.
        cantidadEstrellas: this.cantidadEstrellas
      };
    }
  }
  
  // Función para obtener la fecha actual sin la hora
  function obtenerFechaSinHora() {
    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0); // Ajustar la hora a medianoche
    return fechaActual;
  }
  
  // Función para obtener la clave en el localStorage para un juego específico
  function obtenerClaveLocalStorage(idJuego) {
    return `comentarios-${idJuego}`;
  }
  
  // Función para guardar un comentario en el localStorage para un juego específico
  function guardarComentarioEnLocalStorage(idJuego, comentario) {
    const claveLocalStorage = obtenerClaveLocalStorage(idJuego);
    let comentarios = JSON.parse(localStorage.getItem(claveLocalStorage)) || [];
    comentarios.push(comentario);
    localStorage.setItem(claveLocalStorage, JSON.stringify(comentarios));
  }
  
  // Ejemplo de uso
  const usuarioEjemplo = new Usuario("Ejemplo", "ejemplo@example.com");
  const idJuegoEjemplo = 123; // Reemplaza esto con el ID real del juego
  
  const comentarioConFechaActual = new Comentario(
    usuarioEjemplo,
    "Título del comentario",
    "Este es un comentario de ejemplo.",
    obtenerFechaSinHora(),
    4
  );
  
  guardarComentarioEnLocalStorage(idJuegoEjemplo, comentarioConFechaActual);
  
  // Para obtener los comentarios almacenados para un juego específico:
  const comentariosAlmacenados = JSON.parse(localStorage.getItem(obtenerClaveLocalStorage(idJuegoEjemplo)));
  console.log(comentariosAlmacenados);
  