# JavaScript Completamente Dinámico para Filósofos

```javascript
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

// Función principal de carga dinámica de filósofos desde filosofos.json
async function cargarFilosofosDesdeJSON() {
    try {
        console.log('Cargando filósofos desde filosofos.json...');
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

// Función para cargar preguntas del quiz desde philosophers_data_complete.json
async function cargarQuizDesdeJSON() {
    try {
        console.log('Cargando preguntas del quiz desde philosophers_data_complete.json...');
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
        console.error('❌ Error al cargar quiz desde philosophers_data_complete.json:', error);
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

// Función para crear elemento de filósofo
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

// Función para renderizar filósofos destacados dinámicamente
function renderizarFilosofosDestacados() {
    const container = document.getElementById('filosofos-container');
    
    if (!container) {
        console.error('❌ Contenedor #filosofos-container no encontrado');
        return;
    }
    
    try {
        // Limpiar contenedor
        container.innerHTML = '';
        
        if (!filosofosData || filosofosData.length === 0) {
            container.innerHTML = '<p class="error-message">No hay filósofos para mostrar</p>';
            return;
        }
        
        // Ordenar filósofos cronológicamente por fecha de nacimiento
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
    
    // Si no hay término de búsqueda, mostrar todos
    if (!termino || termino.trim() === '') {
        renderizarFilosofosDestacados();
        return;
    }
    
    const terminoLower = termino.toLowerCase();
    const filosofosFiltrados = filosofosData.filter(filosofo => 
        filosofo.nombre.toLowerCase().includes(terminoLower) ||
        filosofo.movimiento.toLowerCase().includes(terminoLower)
    );
    
    // Limpiar contenedor
    container.innerHTML = '';
    
    if (filosofosFiltrados.length === 0) {
        container.innerHTML = `<p class="no-results">No se encontraron filósofos que coincidan con "${termino}"</p>`;
        return;
    }
    
    // Ordenar y mostrar resultados filtrados
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

// Funciones del Quiz (mantienen funcionalidad existente pero con datos dinámicos)
function iniciarQuiz(categoria) {
    if (!quizData[categoria] || !Array.isArray(quizData[categoria])) {
        console.error(`❌ Categoría de quiz "${categoria}" no encontrada`);
        return;
    }
    
    quizActual.categoria = categoria;
    quizActual.preguntas = [...quizData[categoria]];
    quizActual.preguntaActual = 0;
    quizActual.puntuacion = 0;
    quizActual.respondida = false;
    
    // Mezclar preguntas
    quizActual.preguntas = quizActual.preguntas.sort(() => Math.random() - 0.5);
    
    document.getElementById('quiz-inicio').classList.add('hidden');
    document.getElementById('quiz-pregunta').classList.remove('hidden');
    document.getElementById('quiz-resultados').classList.add('hidden');
    
    mostrarPregunta();
}

function mostrarPregunta() {
    if (quizActual.preguntaActual >= quizActual.preguntas.length) {
        mostrarResultados();
        return;
    }
    
    const pregunta = quizActual.preguntas[quizActual.preguntaActual];
    document.getElementById('quiz-question-text').textContent = pregunta.question;
    
    // Crear opciones dinámicamente
    const opciones = [pregunta.answer];
    
    // Añadir opciones incorrectas desde los datos de filósofos
    const otrosNombres = filosofosData
        .map(f => f.nombre)
        .filter(nombre => nombre !== pregunta.answer && !opciones.includes(nombre))
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
    
    opciones.push(...otrosNombres);
    opciones.sort(() => Math.random() - 0.5);
    
    const container = document.getElementById('opciones-container');
    container.innerHTML = '';
    
    opciones.forEach(opcion => {
        const button = document.createElement('button');
        button.className = 'opcion-btn';
        button.textContent = opcion;
        button.onclick = () => seleccionarOpcion(button, opcion, pregunta.answer);
        container.appendChild(button);
    });
    
    document.getElementById('quiz-feedback').classList.add('hidden');
    document.getElementById('siguiente-pregunta').classList.add('hidden');
    quizActual.respondida = false;
}

function seleccionarOpcion(button, opcionSeleccionada, respuestaCorrecta) {
    if (quizActual.respondida) return;
    
    quizActual.respondida = true;
    const esCorrecta = opcionSeleccionada === respuestaCorrecta;
    
    // Marcar todas las opciones
    const opciones = document.querySelectorAll('.opcion-btn');
    opciones.forEach(btn => {
        if (btn.textContent === respuestaCorrecta) {
            btn.classList.add('correcta');
        } else if (btn === button && !esCorrecta) {
            btn.classList.add('incorrecta');
        }
        btn.style.pointerEvents = 'none';
    });
    
    // Mostrar feedback
    const feedback = document.getElementById('quiz-feedback');
    if (esCorrecta) {
        feedback.textContent = '¡Correcto!';
        feedback.className = 'quiz-feedback correcto';
        quizActual.puntuacion++;
    } else {
        feedback.textContent = `Incorrecto. La respuesta correcta es: ${respuestaCorrecta}`;
        feedback.className = 'quiz-feedback incorrecto';
    }
    
    feedback.classList.remove('hidden');
    document.getElementById('siguiente-pregunta').classList.remove('hidden');
}

function siguientePregunta() {
    quizActual.preguntaActual++;
    
    // Restablecer estilos de opciones
    const opciones = document.querySelectorAll('.opcion-btn');
    opciones.forEach(btn => {
        btn.classList.remove('correcta', 'incorrecta');
        btn.style.pointerEvents = 'auto';
    });
    
    mostrarPregunta();
}

function mostrarResultados() {
    document.getElementById('quiz-pregunta').classList.add('hidden');
    document.getElementById('quiz-resultados').classList.remove('hidden');
    
    document.getElementById('quiz-puntuacion').textContent = quizActual.puntuacion;
    document.getElementById('quiz-total').textContent = quizActual.preguntas.length;
    
    // Mensaje personalizado según puntuación
    const porcentaje = (quizActual.puntuacion / quizActual.preguntas.length) * 100;
    let mensaje = '';
    
    if (porcentaje === 100) {
        mensaje = '¡Perfecto! Eres un experto en filosofía.';
    } else if (porcentaje >= 80) {
        mensaje = '¡Excelente! Tienes un gran conocimiento filosófico.';
    } else if (porcentaje >= 60) {
        mensaje = 'Bien hecho. Tienes buenos conocimientos de filosofía.';
    } else if (porcentaje >= 40) {
        mensaje = 'No está mal, pero puedes mejorar.';
    } else {
        mensaje = 'Necesitas estudiar más filosofía. ¡Inténtalo de nuevo!';
    }
    
    const resultadosDiv = document.getElementById('quiz-resultados');
    const mensajeElement = resultadosDiv.querySelector('p');
    mensajeElement.innerHTML = `Has obtenido <span id="quiz-puntuacion">${quizActual.puntuacion}</span> de <span id="quiz-total">${quizActual.preguntas.length}</span> puntos.<br><strong>${mensaje}</strong>`;
}

function reiniciarQuiz() {
    document.getElementById('quiz-inicio').classList.remove('hidden');
    document.getElementById('quiz-pregunta').classList.add('hidden');
    document.getElementById('quiz-resultados').classList.add('hidden');
}

// Función principal de inicialización dinámica
async function inicializarAplicacion() {
    try {
        console.log('🚀 Iniciando aplicación con carga dinámica...');
        
        // Mostrar indicador de carga
        mostrarCargando(true);
        
        // Cargar datos en paralelo para mejor rendimiento
        const promesas = [
            cargarFilosofosDesdeJSON(),
            cargarQuizDesdeJSON()
        ];
        
        await Promise.all(promesas);
        
        // Renderizar interfaz con datos cargados
        renderizarFilosofosDestacados();
        
        // Configurar eventos de interfaz
        configurarEventos();
        
        // Ocultar indicador de carga
        mostrarCargando(false);
        
        console.log('✅ Aplicación inicializada correctamente con datos dinámicos');
        
    } catch (error) {
        console.error('❌ Error crítico al inicializar la aplicación:', error);
        mostrarError(error.message);
    }
}

// Función para configurar eventos de la interfaz
function configurarEventos() {
    // Configurar buscador de filósofos
    const buscador = document.getElementById('buscar-filosofo');
    if (buscador) {
        buscador.addEventListener('input', (e) => {
            const termino = e.target.value.trim();
            filtrarFilosofos(termino);
        });
    }
    
    // Configurar botones del quiz
    document.querySelectorAll('.categoria-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const categoria = btn.dataset.categoria;
            iniciarQuiz(categoria);
        });
    });
    
    // Configurar controles del quiz
    const siguienteBtn = document.getElementById('siguiente-pregunta');
    if (siguienteBtn) {
        siguienteBtn.addEventListener('click', siguientePregunta);
    }
    
    const reiniciarBtn = document.getElementById('reiniciar-quiz');
    if (reiniciarBtn) {
        reiniciarBtn.addEventListener('click', reiniciarQuiz);
    }
    
    // Configurar navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

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
                <h3>❌ Error de Carga</h3>
                <p>${mensaje}</p>
                <div class="error-help">
                    <h4>Posibles soluciones:</h4>
                    <ul>
                        <li>Verifica que el archivo <code>filosofos.json</code> esté en la misma carpeta</li>
                        <li>Asegúrate de estar ejecutando desde un servidor HTTP (no file://)</li>
                        <li>Usa Live Server de VS Code o un servidor local como Python: <code>python -m http.server</code></li>
                    </ul>
                    <button onclick="location.reload()" class="btn btn--primary">Recargar Página</button>
                </div>
            </div>
        `;
    }
    
    mostrarCargando(false);
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializarAplicacion);

// Exportar funciones para depuración (opcional)
if (typeof window !== 'undefined') {
    window.filosofosApp = {
        filosofosData: () => filosofosData,
        quizData: () => quizData,
        reinicializar: inicializarAplicacion,
        filtrar: filtrarFilosofos
    };
}
```

## CSS Adicional para Estados de Error y Carga

```css
/* Estados de carga y error */
#cargando-filosofos {
    text-align: center;
    padding: 40px;
    font-size: 18px;
    color: var(--color-text-secondary);
    font-style: italic;
}

.error-container {
    text-align: center;
    padding: 40px;
    background: #f8d7da;
    border: 1px solid #f5c6cb;
    border-radius: var(--radius-lg);
    color: #721c24;
    margin: 20px 0;
}

.error-container h3 {
    color: #721c24;
    margin-bottom: 16px;
}

.error-container p {
    margin-bottom: 20px;
    font-size: 16px;
}

.error-help {
    background: white;
    padding: 20px;
    border-radius: var(--radius-base);
    margin-top: 20px;
    text-align: left;
}

.error-help h4 {
    color: #721c24;
    margin-bottom: 12px;
}

.error-help ul {
    margin-bottom: 20px;
    padding-left: 20px;
}

.error-help li {
    margin-bottom: 8px;
}

.error-help code {
    background: #e9ecef;
    padding: 2px 6px;
    border-radius: 3px;
    font-family: monospace;
}

.error-message {
    color: #721c24;
    text-align: center;
    padding: 20px;
    font-style: italic;
}

.no-results {
    text-align: center;
    color: var(--color-text-secondary);
    font-style: italic;
    padding: 20px;
}

/* Animación de carga */
@keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
}

#cargando-filosofos {
    animation: pulse 2s infinite;
}
```