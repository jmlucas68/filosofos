document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENTOS DEL DOM ---
    const filosofoNombreEl = document.getElementById('filosofo-nombre');
    const filosofoFotoEl = document.getElementById('filosofo-foto');
    const chatMessagesEl = document.getElementById('chat-messages');
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('pregunta-usuario');

    // --- CONFIGURACIÓN ---
    // ¡¡¡IMPORTANTE!!! Reemplaza esta URL por la URL de tu backend desplegado en Vercel.
    const PROXY_URL = 'https://perplexity-proxy-backend.vercel.app/api/proxy';

    let filosofoSeleccionado = null;

    // --- INICIALIZACIÓN ---
    async function inicializarChat() {
        // 1. Obtener el nombre del filósofo de la URL
        const params = new URLSearchParams(window.location.search);
        const nombreFilosofo = decodeURIComponent(params.get('filosofo'));

        if (!nombreFilosofo) {
            filosofoNombreEl.textContent = 'Error';
            anadirMensaje('No se ha especificado un filósofo.', 'ai');
            return;
        }

        // 2. Cargar los datos de los filósofos y encontrar al correcto
        try {
            const response = await fetch('filosofos.json');
            const data = await response.json();
            filosofoSeleccionado = data.find(f => f.nombre === nombreFilosofo);

            if (filosofoSeleccionado) {
                // 3. Actualizar la cabecera del chat
                filosofoNombreEl.textContent = `Hablando con ${filosofoSeleccionado.nombre}`;
                filosofoFotoEl.src = filosofoSeleccionado.url_foto;
                filosofoFotoEl.alt = filosofoSeleccionado.nombre;

                // 4. Añadir un mensaje de bienvenida
                const saludo = `Hola, soy ${filosofoSeleccionado.nombre}. ¿Sobre qué te gustaría reflexionar hoy?`;
                anadirMensaje(saludo, 'ai');
            } else {
                throw new Error('Filósofo no encontrado');
            }
        } catch (error) {
            console.error('Error al inicializar el chat:', error);
            filosofoNombreEl.textContent = 'Error';
            anadirMensaje('No se pudieron cargar los datos del filósofo. Intenta volver al buscador.', 'ai');
        }
    }

    // --- MANEJO DEL FORMULARIO ---
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const pregunta = userInput.value.trim();

        if (!pregunta || !filosofoSeleccionado) return;

        // Añadir el mensaje del usuario a la UI
        anadirMensaje(pregunta, 'user');
        userInput.value = '';

        // Mostrar indicador de "escribiendo..."
        const typingIndicator = anadirMensaje('...', 'typing');

        try {
            // Construir el prompt para la IA
            const prompt = `Eres ${filosofoSeleccionado.nombre}. Responde a la siguiente pregunta en primera persona, manteniendo tu estilo, tus ideas y tu perspectiva filosófica. Sé conciso y directo en tu respuesta. La pregunta es: "${pregunta}"`;

            // Llamar al proxy de Vercel
            const response = await fetch(PROXY_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: prompt }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error en la respuesta del servidor');
            }

            const data = await response.json();
            const respuestaIA = data.choices[0].message.content;

            // Reemplazar el indicador con la respuesta real
            typingIndicator.textContent = respuestaIA;
            typingIndicator.classList.remove('typing-indicator');
            typingIndicator.classList.add('ai-message');

        } catch (error) {
            console.error('Error al contactar la IA:', error);
            typingIndicator.textContent = `Lo siento, ha ocurrido un error. ${error.message}`;
            typingIndicator.classList.remove('typing-indicator');
            typingIndicator.classList.add('ai-message');
        }
    });

    // --- FUNCIÓN UTILITARIA PARA AÑADIR MENSAJES ---
    function anadirMensaje(texto, tipo) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = texto;

        if (tipo === 'user') {
            messageDiv.className = 'message user-message';
        } else if (tipo === 'ai') {
            messageDiv.className = 'message ai-message';
        } else if (tipo === 'typing') {
            messageDiv.className = 'message typing-indicator';
        }

        chatMessagesEl.appendChild(messageDiv);
        // Hacer scroll hacia el último mensaje
        chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
        return messageDiv; // Devolver el elemento para poder modificarlo (ej: typing indicator)
    }

    // Iniciar todo
    inicializarChat();
});