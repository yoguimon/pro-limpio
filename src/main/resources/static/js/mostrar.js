// Recupera los datos almacenados en localStorage
        const email = localStorage.getItem('email');
        const pass = localStorage.getItem('pass');

        // Mostrar el email en el elemento lblemail
        const lblemail = document.getElementById('lblemail');
        lblemail.textContent = email;
        const lblpass = document.getElementById('lblpass');
        lblpass.textContent = pass;