document.addEventListener('DOMContentLoaded', function () {
    const formLogin = document.getElementById('formLogin');
    const emailInput = document.getElementById('form-control-mail');
    const passwordInput = document.getElementById('form-control-password');
    const errorMail = document.getElementById('errorMail');
    const errorPassword = document.getElementById('errorPassword');

    // Lista de dominios permitidos
    const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];

    // Usuarios de prueba con las nuevas reglas
    const usuarios = [
        { email: "admin@duoc.cl", password: "admin", rol: "admin" },
        { email: "profesor@profesor.duoc.cl", password: "1234", rol: "admin" },
        { email: "cliente@gmail.com", password: "hola1", rol: "cliente" }
    ];

    formLogin.addEventListener('submit', function (event) {
        event.preventDefault();

        let esValido = true;

        // Limpiar mensajes y estilos de error
        errorMail.textContent = '';
        errorPassword.textContent = '';
        emailInput.classList.remove('is-invalid');
        passwordInput.classList.remove('is-invalid');

        const correo = emailInput.value.trim().toLowerCase();
        const clave = passwordInput.value.trim();

        
        // VALIDACIÓN DEL CORREO
    
        if (correo === '') {
            errorMail.textContent = 'El correo electrónico es requerido.';
            emailInput.classList.add('is-invalid');
            esValido = false;
        } else if (correo.length > 100) {
            errorMail.textContent = 'El correo no puede superar los 100 caracteres.';
            emailInput.classList.add('is-invalid');
            esValido = false;
        } else {
            // Verificar si el correo termina en uno de los dominios autorizados
            const dominioValido = dominiosPermitidos.some(dominio => correo.endsWith(dominio));
            
            if (!dominioValido) {
                errorMail.textContent = 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.';
                emailInput.classList.add('is-invalid');
                esValido = false;
            }
        }

        
        // VALIDACIÓN DE LA CONTRASEÑA
        
        if (clave === '') {
            errorPassword.textContent = 'La contraseña es requerida.';
            passwordInput.classList.add('is-invalid');
            esValido = false;
        } else if (clave.length < 4 || clave.length > 10) {
            errorPassword.textContent = 'La contraseña debe tener entre 4 y 10 caracteres.';
            passwordInput.classList.add('is-invalid');
            esValido = false;
        }

        
        // REDIRECCIÓN SI PASA TODAS LAS REGLAS
        
        if (esValido) {
            const usuarioEncontrado = usuarios.find(
                user => user.email === correo && user.password === clave
            );

            if (usuarioEncontrado) {
                sessionStorage.setItem('usuarioRol', usuarioEncontrado.rol);
                if (usuarioEncontrado.rol === 'admin') {
                    window.location.href = 'admin-home.html';
                } else {
                    window.location.href = 'index.html';
                }
            } else {
                errorPassword.textContent = 'Correo o contraseña incorrectos.';
                passwordInput.classList.add('is-invalid');
            }
        }
    });
});