import {usuario} from "./class.js"

document.addEventListener('DOMContentLoaded', () => {
    const admin = new usuario('admin@example.com', 'admin1234', 'admin');
    const invitado = new usuario('invitado@example.com', 'invitado1234', 'invitado');

    localStorage.setItem('admin', JSON.stringify(admin));
    localStorage.setItem('invitado', JSON.stringify(invitado));
});