// Variables globales para almacenar datos cargados dinámicamente
let filosofosData = [];
let quizData = {};
let quizActual = {
    categoria: '',
    preguntas: [],
    preguntaActual: 0,
    puntuacion: 0,
    respondida: false
};

// FUNCIÓN PRINCIPAL: Cargar filósofos dinámicamente desde filosofos.json
async function cargarFilosofosDesdeJSON() {
    try {
        console.log('🔄 Cargando filósofos desde filosofos.json...');
        const response = await fetch('filosofos.json');

        if (!response.ok) {
            throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (!Array.isArray(data) || data.length === 0) {
            throw new Error('El archivo filosofos.json no contiene datos válidos');
        }

        filosofosData = data;
        console.log(`✅ Cargados ${filosofosData.length} filósofos desde filosofos.json`);
        return filosofosData;

    } catch (error) {
        console.error('❌ Error al cargar filosofos.json:', error);
        throw new Error(`No se pudo cargar filosofos.json: ${error.message}`);
    }
}

// Cargar preguntas del quiz desde philosophers_data_complete.json
async function cargarQuizDesdeJSON() {
    try {
        console.log('🔄 Cargando quiz desde philosophers_data_complete.json...');
        const response = await fetch('philosophers_data_complete.json');

        if (!response.ok) {
            throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.quiz_questions) {
            throw new Error('No se encontraron quiz_questions en el archivo');
        }

        quizData = data.quiz_questions;
        console.log('✅ Preguntas del quiz cargadas correctamente');
        return quizData;

    } catch (error) {
        console.error('❌ Error al cargar quiz:', error);
        throw new Error(`No se pudo cargar el quiz: ${error.message}`);
    }
}

// Función para formatear períodos de vida
function formatearPeriodo(nacimiento, muerte) {
    const formatFecha = (fecha) => {
        if (typeof fecha === 'number') {
            return fecha < 0 ? `${Math.abs(fecha)} a.C.` : `${fecha} d.C.`;
        }
        if (typeof fecha === 'string' && fecha.trim() === '') {
            return 'presente';
        }
        return fecha || 'presente';
    };

    return `${formatFecha(nacimiento)} - ${formatFecha(muerte)}`;
}

// Crear elemento de filósofo
function crearElementoFilosofo(filosofo) {
    const div = document.createElement('div');
    div.className = 'filosofo-item';

    const periodo = formatearPeriodo(filosofo.nacimiento, filosofo.muerte);

    div.innerHTML = `
        <a href="${filosofo.url_pagina}" target="_blank" rel="noopener noreferrer" class="filosofo-nombre">
            ${filosofo.nombre}
        </a>
        <div class="filosofo-periodo">${periodo}</div>
        <div class="filosofo-movimiento">${filosofo.movimiento}</div>
        <div class="tooltip">${filosofo.nombre} (${periodo}) - ${filosofo.movimiento}</div>
    `;

    return div;
}

// RENDERIZAR FILÓSOFOS DESTACADOS DINÁMICAMENTE
function renderizarFilosofosDestacados() {
    const container = document.getElementById('filosofos-container');

    if (!container) {
        console.error('❌ Contenedor #filosofos-container no encontrado');
        return;
    }

    try {
        container.innerHTML = '';

        if (!filosofosData || filosofosData.length === 0) {
            container.innerHTML = '<p class="error-message">No hay filósofos para mostrar</p>';
            return;
        }

        // Ordenar cronológicamente por fecha de nacimiento
        const filosofosOrdenados = [...filosofosData].sort((a, b) => {
            const fechaA = typeof a.nacimiento === 'number' ? a.nacimiento : parseInt(a.nacimiento) || 0;
            const fechaB = typeof b.nacimiento === 'number' ? b.nacimiento : parseInt(b.nacimiento) || 0;
            return fechaA - fechaB;
        });

        // Crear elementos para cada filósofo
        filosofosOrdenados.forEach(filosofo => {
            if (filosofo.nombre && filosofo.url_pagina) {
                const elemento = crearElementoFilosofo(filosofo);
                container.appendChild(elemento);
            }
        });

        console.log(`✅ Renderizados ${filosofosOrdenados.length} filósofos destacados`);

    } catch (error) {
        console.error('❌ Error al renderizar filósofos:', error);
        container.innerHTML = '<p class="error-message">Error al mostrar los filósofos</p>';
    }
}

// Función para filtrar filósofos
function filtrarFilosofos(termino) {
    const container = document.getElementById('filosofos-container');

    if (!container) return;

    if (!termino || termino.trim() === '') {
        renderizarFilosofosDestacados();
        return;
    }

    const terminoLower = termino.toLowerCase();
    const filosofosFiltrados = filosofosData.filter(filosofo =>
        filosofo.nombre.toLowerCase().includes(terminoLower) ||
        filosofo.movimiento.toLowerCase().includes(terminoLower)
    );

    container.innerHTML = '';

    if (filosofosFiltrados.length === 0) {
        container.innerHTML = `<p class="no-results">No se encontraron filósofos que coincidan con "${termino}"</p>`;
        return;
    }

    const filosofosOrdenados = filosofosFiltrados.sort((a, b) => {
        const fechaA = typeof a.nacimiento === 'number' ? a.nacimiento : parseInt(a.nacimiento) || 0;
        const fechaB = typeof b.nacimiento === 'number' ? b.nacimiento : parseInt(b.nacimiento) || 0;
        return fechaA - fechaB;
    });

    filosofosOrdenados.forEach(filosofo => {
        const elemento = crearElementoFilosofo(filosofo);
        container.appendChild(elemento);
    });

    console.log(`🔍 Filtrados ${filosofosFiltrados.length} filósofos para: "${termino}"`);
}

// INICIALIZACIÓN PRINCIPAL DINÁMICA
async function inicializarAplicacion() {
    try {
        console.log('🚀 Iniciando aplicación con carga dinámica...');

        mostrarCargando(true);

        // Cargar datos en paralelo
        await Promise.all([
            cargarFilosofosDesdeJSON(),
            cargarQuizDesdeJSON()
        ]);

        // Renderizar interfaz
        renderizarFilosofosDestacados();
        configurarEventos();

        mostrarCargando(false);

        console.log('✅ Aplicación inicializada correctamente con datos dinámicos');

    } catch (error) {
        console.error('❌ Error crítico al inicializar:', error);
        mostrarError(error.message);
    }
}

// Configurar eventos de interfaz
function configurarEventos() {
    // Buscador de filósofos
    const buscador = document.getElementById('buscar-filosofo');
    if (buscador) {
        buscador.addEventListener('input', (e) => {
            filtrarFilosofos(e.target.value.trim());
        });
    }

    // Botones del quiz
    document.querySelectorAll('.categoria-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const categoria = btn.dataset.categoria;
            iniciarQuiz(categoria);
        });
    });

    // Controles del quiz
    const siguienteBtn = document.getElementById('siguiente-pregunta');
    if (siguienteBtn) {
        siguienteBtn.addEventListener('click', siguientePregunta);
    }

    const reiniciarBtn = document.getElementById('reiniciar-quiz');
    if (reiniciarBtn) {
        reiniciarBtn.addEventListener('click', reiniciarQuiz);
    }

    // Navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// [... RESTO DE FUNCIONES DEL QUIZ MANTIENEN LA LÓGICA EXISTENTE ...]

// Funciones auxiliares para UI
function mostrarCargando(mostrar) {
    const loadingElement = document.getElementById('cargando-filosofos');
    if (loadingElement) {
        loadingElement.style.display = mostrar ? 'block' : 'none';
        loadingElement.textContent = mostrar ? 'Cargando filósofos dinámicamente...' : '';
    }
}

function mostrarError(mensaje) {
    const container = document.getElementById('filosofos-container');
    if (container) {
        container.innerHTML = `
            <div class="error-container">
                <h3>❌ Error de Carga Dinámica</h3>
                <p>${mensaje}</p>
                <div class="error-help">
                    <h4>Soluciones:</h4>
                    <ul>
                        <li>Verifica que <code>filosofos.json</code> esté en la misma carpeta</li>
                        <li>Usa un servidor HTTP local (no file://)</li>
                        <li>Live Server de VS Code o: <code>python -m http.server</code></li>
                    </ul>
                    <button onclick="location.reload()" class="btn btn--primary">Recargar</button>
                </div>
            </div>
        `;
    }
    mostrarCargando(false);
}

// INICIALIZAR CUANDO EL DOM ESTÉ LISTO
document.addEventListener('DOMContentLoaded', inicializarAplicacion);
