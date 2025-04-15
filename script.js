document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('main');
    const navLinks = document.querySelectorAll('nav a');
    const botonesDetalles = document.querySelectorAll('.course-button');

    // Animación de carga inicial
    main.classList.add('loaded');

    // Transición entre páginas
    navLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const href = link.href;

            // Verificar si el enlace apunta a la página actual
            if (href === window.location.href) {
                return; // No hacer nada si el enlace apunta a la página actual
            }

            // Animación de fundido de salida
            main.animate(
                [{ opacity: 1 }, { opacity: 0 }],
                { duration: 300, easing: 'ease-in-out' }
            ).finished.then(() => {
                // Cargar el contenido de la nueva página
                fetch(href)
                    .then(response => response.text())
                    .then(html => {
                        const newMain = new DOMParser().parseFromString(html, 'text/html').querySelector('main');
                        main.innerHTML = newMain.innerHTML;

                        // Animación de fundido de entrada
                        main.animate(
                            [{ opacity: 0 }, { opacity: 1 }],
                            { duration: 300, easing: 'ease-in-out' }
                        );

                        // Actualizar la URL y el historial
                        history.pushState({}, '', href);
                    });
            });
        });
    });

    // Navegación a la página de detalles del curso
    botonesDetalles.forEach(boton => {
        boton.addEventListener('click', event => {
            event.preventDefault();
            const nombreCurso = boton.dataset.curso;
            window.location.href = `detalle-curso.html?curso=${nombreCurso}`;
        });
    });
});