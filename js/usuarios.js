import {usuario} from "./class.js"

document.addEventListener('DOMContentLoaded', () => {
    const admin = new usuario('admin@example.com', 'admin1234', 'admin');
    const invitado = new usuario('invitado@example.com', 'invitado1234', 'invitado');

    const adminData = { email: admin.getEmail(), contraseña: admin.getContraseña(), rol: admin.getRol() };
    const invitadoData = { email: invitado.getEmail(), contraseña: invitado.getContraseña(), rol: invitado.getRol() };

    localStorage.setItem('admin', JSON.stringify(adminData));
    localStorage.setItem('invitado', JSON.stringify(invitadoData));
});