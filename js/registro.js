document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-registro');

    // Referencias
    const inputs = {
        nombre: document.getElementById('nombre'),
        password: document.getElementById('password'),
        confirmarPassword: document.getElementById('confirmar-password'),
        correo: document.getElementById('correo'),
        telefono: document.getElementById('telefono'),
        direccion: document.getElementById('direccion'),
        comuna: document.getElementById('comuna'),
        region: document.getElementById('region')
    };

    const mostrarError = (campo, mensaje) => {
        const inputElem = inputs[campo];
        const errorId = `err-${campo === 'confirmarPassword' ? 'confirmar-password' : campo}`;
        const errorElem = document.getElementById(errorId);
        
        if (inputElem) inputElem.classList.add('input-error');
        if (errorElem) errorElem.textContent = mensaje;
    };

    const limpiarError = (campo) => {
        const inputElem = inputs[campo];
        const errorId = `err-${campo === 'confirmarPassword' ? 'confirmar-password' : campo}`;
        const errorElem = document.getElementById(errorId);
        
        if (inputElem) inputElem.classList.remove('input-error');
        if (errorElem) errorElem.textContent = '';
    };

    // VALIDACIONES

    //NOMBRE COMPLETO
    const validarNombre = () => {
        const valor = inputs.nombre.value.trim();
        if (valor === '') {
            mostrarError('nombre', 'El nombre es obligatorio.');
            return false;
        } else if (valor.length < 3) {
            mostrarError('nombre', 'El nombre debe tener al menos 3 caracteres.');
            return false;
        } else if (valor.length > 100) {
            mostrarError('nombre', 'El nombre no puede exceder los 100 caracteres.');
            return false;
        }
        limpiarError('nombre');
        return true;
    };

    //CONTRASEÑA
    const validarPassword = () => {
        const valor = inputs.password.value;
        if (valor === '') {
            mostrarError('password', 'La contraseña es obligatoria.');
            return false;
        } else if (valor.length < 8) {
            mostrarError('password', 'La contraseña debe tener al menos 8 caracteres.');
            return false;
        }
        limpiarError('password');
        return true;
    };

    //CONFIRMAR CONTRASEÑA
    const validarConfirmarPassword = () => {
        const pass = inputs.password.value;
        const confirmPass = inputs.confirmarPassword.value;

        if (confirmPass === '') {
            mostrarError('confirmarPassword', 'Por favor confirma tu contraseña.');
            return false;
        } else if (pass !== confirmPass) {
            mostrarError('confirmarPassword', 'Las contraseñas no coinciden.');
            return false;
        }
        limpiarError('confirmarPassword');
        return true;
    };

    //CORREO
    const validarCorreo = () => {
        const valor = inputs.correo.value.trim().toLowerCase();
        const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];

        if (valor === '') {
            mostrarError('correo', 'El correo es obligatorio.');
            return false;
        }

        // Verifica si el correo termina en alguno de los 3 dominios permitidos
        const esDominioValido = dominiosPermitidos.some(dominio => valor.endsWith(dominio));

        if (!esDominioValido) {
            mostrarError('correo', 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl y @gmail.com');
            return false;
        }

        limpiarError('correo');
        return true;
    };

    //TELÉFONO
    const validarTelefono = () => {
        const valor = inputs.telefono.value.trim();
        // Extrae solo los dígitos numéricos
        const soloNumeros = valor.replace(/\D/g, '');

        if (valor === '') {
            mostrarError('telefono', 'El teléfono es obligatorio.');
            return false;
        } else if (soloNumeros.length !== 11) {
            mostrarError('telefono', 'El teléfono debe contener exactamente 11 números (ej: 56912345678).');
            return false;
        }
        limpiarError('telefono');
        return true;
    };

    //DIRECCIÓN
    const validarDireccion = () => {
        const valor = inputs.direccion.value.trim();
        if (valor === '') {
            mostrarError('direccion', 'La dirección es obligatoria.');
            return false;
        } else if (valor.length > 300) {
            mostrarError('direccion', 'La dirección no puede exceder los 300 caracteres.');
            return false;
        }
        limpiarError('direccion');
        return true;
    };

    const validarComuna = () => {
        const valor = inputs.comuna.value.trim();
        if (valor === '') {
            mostrarError('comuna', 'Selecciona una comuna.');
            return false;
        }
        limpiarError('comuna');
        return true;
    };

    const validarRegion = () => {
        const valor = inputs.region.value.trim();
        if (valor === '') {
            mostrarError('region', 'Selecciona una región.');
            return false;
        }
        limpiarError('region');
        return true;
    };

    // SUPERVISIÓN EN TIEMPO REAL
    inputs.nombre.addEventListener('input', validarNombre);
    inputs.password.addEventListener('input', () => {
        validarPassword();
        if (inputs.confirmarPassword.value !== '') validarConfirmarPassword();
    });
    inputs.confirmarPassword.addEventListener('input', validarConfirmarPassword);
    inputs.correo.addEventListener('input', validarCorreo);
    inputs.telefono.addEventListener('input', validarTelefono);
    inputs.direccion.addEventListener('input', validarDireccion);
    inputs.comuna.addEventListener('change', validarComuna);
    inputs.region.addEventListener('change', validarRegion);

    // VALIDACIÓN GENERAL AL ENVIAR
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const vNombre = validarNombre();
        const vPass = validarPassword();
        const vConfPass = validarConfirmarPassword();
        const vCorreo = validarCorreo();
        const vTel = validarTelefono();
        const vDir = validarDireccion();
        const vCom = validarComuna();
        const vReg = validarRegion();

        // Si todas las validaciones son verdaderas
        if (vNombre && vPass && vConfPass && vCorreo && vTel && vDir && vCom && vReg) {
            alert('¡Registro exitoso! Tu cuenta ha sido creada correctamente.');
            form.reset();
        }
    });
});