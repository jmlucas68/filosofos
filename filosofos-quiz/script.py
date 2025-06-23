# Crear el index.html modificado con el botón de Estudio
index_html = """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🏛️ Galería de Filósofos</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            color: #333;
        }

        .header {
            background: rgba(255, 255, 255, 0.95);
            padding: 20px;
            box-shadow: 0 2px 20px rgba(0,0,0,0.1);
            backdrop-filter: blur(10px);
        }

        .header h1 {
            text-align: center;
            color: #4a5568;
            font-size: 2.5rem;
            margin-bottom: 20px;
        }

        .nav-container {
            display: flex;
            justify-content: center;
            gap: 15px;
            flex-wrap: wrap;
            margin-bottom: 20px;
        }

        .nav-btn, .study-btn {
            background: linear-gradient(45deg, #4CAF50, #45a049);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
        }

        .study-btn {
            background: linear-gradient(45deg, #FF6B6B, #FF5252);
            font-size: 18px;
            padding: 15px 30px;
            box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
        }

        .nav-btn:hover, .study-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        .study-btn:hover {
            box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
        }

        .controls {
            display: flex;
            justify-content: center;
            gap: 15px;
            flex-wrap: wrap;
            margin-top: 20px;
        }

        .search-container {
            text-align: center;
            margin: 20px 0;
        }

        .search-input {
            padding: 12px 20px;
            border: 2px solid #ddd;
            border-radius: 25px;
            font-size: 16px;
            width: 300px;
            max-width: 90%;
            outline: none;
            transition: border-color 0.3s ease;
        }

        .search-input:focus {
            border-color: #667eea;
        }

        .philosophers-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 25px;
            padding: 40px 20px;
            max-width: 1400px;
            margin: 0 auto;
        }

        .philosopher-card {
            background: rgba(255, 255, 255, 0.9);
            border-radius: 15px;
            padding: 25px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
            cursor: pointer;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .philosopher-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.2);
        }

        .philosopher-name {
            font-size: 1.4rem;
            font-weight: bold;
            color: #2d3748;
            margin-bottom: 8px;
        }

        .philosopher-dates {
            color: #718096;
            font-size: 0.9rem;
            margin-bottom: 10px;
        }

        .philosopher-school {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            display: inline-block;
            margin-bottom: 15px;
        }

        .philosopher-description {
            color: #4a5568;
            line-height: 1.6;
            font-size: 0.95rem;
        }

        .timeline {
            position: relative;
            max-width: 1200px;
            margin: 40px auto;
            padding: 0 20px;
        }

        .timeline-item {
            background: rgba(255, 255, 255, 0.9);
            margin: 20px 0;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            position: relative;
        }

        .hidden {
            display: none;
        }

        @media (max-width: 768px) {
            .header h1 {
                font-size: 2rem;
            }
            
            .nav-container {
                flex-direction: column;
                align-items: center;
            }
            
            .philosophers-grid {
                grid-template-columns: 1fr;
                padding: 20px 10px;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🏛️ Galería de Filósofos</h1>
        <p style="text-align: center; color: #666; margin-bottom: 20px;">
            Explora el pensamiento de los grandes filósofos de la historia
        </p>
        
        <!-- Botón prominente de Estudio -->
        <div style="text-align: center; margin: 20px 0;">
            <a href="estudio/estudio.html" class="study-btn">
                📚 Ir al Quiz de Estudio
            </a>
        </div>

        <div class="nav-container">
            <button class="nav-btn" onclick="sortChronological()">⏰ Orden Cronológico</button>
            <button class="nav-btn" onclick="sortAlphabetical()">📝 Orden Alfabético</button>
            <button class="nav-btn" onclick="toggleTimeline()">⏳ Línea del Tiempo</button>
        </div>

        <div class="search-container">
            <input type="text" class="search-input" id="searchInput" placeholder="🔎 Buscar filósofo...">
        </div>
    </div>

    <div class="philosophers-grid" id="philosophersGrid">
        <!-- Los filósofos se cargarán aquí -->
    </div>

    <div class="timeline hidden" id="timeline">
        <!-- La línea del tiempo se cargará aquí -->
    </div>

    <script>
        // Base de datos de filósofos
        const philosophers = [
            {
                name: "Anaxímenes de Mileto",
                dates: "585-525 a.C.",
                school: "Filosofía Presocrática",
                description: "Filósofo presocrático que propuso el aire como principio originario (arché) de todas las cosas.",
                period: -550
            },
            {
                name: "Anaxágoras de Clazómenas",
                dates: "500-428 a.C.",
                school: "Filosofía Presocrática",
                description: "Introdujo el concepto del Nous (mente cósmica) como principio ordenador del universo.",
                period: -464
            },
            {
                name: "Aristóteles",
                dates: "384-322 a.C.",
                school: "Filosofía Clásica",
                description: "Discípulo de Platón, fundó el Liceo y desarrolló un sistema comprehensivo que abarca lógica, ética y metafísica.",
                period: -353
            },
            {
                name: "San Agustín de Hipona",
                dates: "354-430 d.C.",
                school: "Filosofía Cristiana",
                description: "Figura central de la filosofía cristiana que sintetizó el platonismo con el cristianismo.",
                period: 392
            },
            {
                name: "Boecio",
                dates: "477-524 d.C.",
                school: "Neoplatonismo",
                description: "Filósofo romano que escribió 'La Consolación de la Filosofía' y tradujo obras aristotélicas.",
                period: 501
            },
            {
                name: "Avicena (Ibn Sina)",
                dates: "980-1037 d.C.",
                school: "Aristotelismo Islámico",
                description: "Polímata persa conocido como el 'Príncipe de los Sabios', escribió el Canon de Medicina.",
                period: 1009
            },
            {
                name: "Averroes (Ibn Rushd)",
                dates: "1126-1198 d.C.",
                school: "Aristotelismo Islámico",
                description: "Filósofo andalusí conocido como 'el Comentador' por sus análisis de Aristóteles.",
                period: 1162
            },
            {
                name: "San Buenaventura",
                dates: "1221-1274 d.C.",
                school: "Escolástica Franciscana",
                description: "Doctor Seráfico que desarrolló la síntesis agustiniano-franciscana y la teoría de los tres ojos del alma.",
                period: 1248
            },
            {
                name: "George Berkeley",
                dates: "1685-1753 d.C.",
                school: "Empirismo Irlandés",
                description: "Desarrolló el inmaterialismo filosófico con su famosa máxima 'Esse est percipi' (Ser es ser percibido).",
                period: 1719
            },
            {
                name: "John Locke",
                dates: "1632-1704 d.C.",
                school: "Empirismo Inglés",
                description: "Padre del liberalismo clásico, desarrolló la teoría de la 'tabula rasa' y los derechos naturales.",
                period: 1668
            },
            {
                name: "Walter Benjamin",
                dates: "1892-1940 d.C.",
                school: "Escuela de Frankfurt",
                description: "Teórico crítico alemán que desarrolló conceptos sobre el 'aura' y la reproductibilidad técnica.",
                period: 1916
            },
            {
                name: "Theodor Adorno",
                dates: "1903-1969 d.C.",
                school: "Teoría Crítica",
                description: "Miembro de la Escuela de Frankfurt, desarrolló la crítica de la razón instrumental.",
                period: 1936
            },
            {
                name: "Hannah Arendt",
                dates: "1906-1975 d.C.",
                school: "Filosofía Política",
                description: "Teórica política que desarrolló el concepto de 'banalidad del mal' y analizó el totalitarismo.",
                period: 1941
            },
            {
                name: "John Langshaw Austin",
                dates: "1911-1960 d.C.",
                school: "Filosofía Analítica",
                description: "Pionero en la filosofía del lenguaje ordinario, desarrolló la teoría de los actos de habla.",
                period: 1936
            },
            {
                name: "Simone de Beauvoir",
                dates: "1908-1986 d.C.",
                school: "Existencialismo Feminista",
                description: "Filósofa existencialista y pionera del feminismo moderno, autora de 'El segundo sexo'.",
                period: 1947
            }
        ];

        let currentSort = 'chronological';
        let isTimelineView = false;

        function renderPhilosophers(philosopherList = philosophers) {
            const grid = document.getElementById('philosophersGrid');
            grid.innerHTML = '';

            philosopherList.forEach(philosopher => {
                const card = document.createElement('div');
                card.className = 'philosopher-card';
                card.innerHTML = `
                    <div class="philosopher-name">${philosopher.name}</div>
                    <div class="philosopher-dates">${philosopher.dates}</div>
                    <div class="philosopher-school">${philosopher.school}</div>
                    <div class="philosopher-description">${philosopher.description}</div>
                `;
                grid.appendChild(card);
            });
        }

        function sortChronological() {
            currentSort = 'chronological';
            const sorted = [...philosophers].sort((a, b) => a.period - b.period);
            renderPhilosophers(sorted);
        }

        function sortAlphabetical() {
            currentSort = 'alphabetical';
            const sorted = [...philosophers].sort((a, b) => a.name.localeCompare(b.name));
            renderPhilosophers(sorted);
        }

        function toggleTimeline() {
            const grid = document.getElementById('philosophersGrid');
            const timeline = document.getElementById('timeline');
            
            isTimelineView = !isTimelineView;
            
            if (isTimelineView) {
                grid.classList.add('hidden');
                timeline.classList.remove('hidden');
                renderTimeline();
            } else {
                grid.classList.remove('hidden');
                timeline.classList.add('hidden');
            }
        }

        function renderTimeline() {
            const timeline = document.getElementById('timeline');
            const sorted = [...philosophers].sort((a, b) => a.period - b.period);
            
            timeline.innerHTML = '';
            sorted.forEach(philosopher => {
                const item = document.createElement('div');
                item.className = 'timeline-item';
                item.innerHTML = `
                    <h3>${philosopher.name}</h3>
                    <p><strong>${philosopher.dates}</strong> - ${philosopher.school}</p>
                    <p>${philosopher.description}</p>
                `;
                timeline.appendChild(item);
            });
        }

        function searchPhilosophers() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            const filtered = philosophers.filter(philosopher => 
                philosopher.name.toLowerCase().includes(searchTerm) ||
                philosopher.school.toLowerCase().includes(searchTerm) ||
                philosopher.description.toLowerCase().includes(searchTerm)
            );
            
            if (!isTimelineView) {
                renderPhilosophers(filtered);
            }
        }

        // Event listeners
        document.getElementById('searchInput').addEventListener('input', searchPhilosophers);

        // Inicializar la aplicación
        sortChronological();
    </script>
</body>
</html>"""

# Guardar el archivo
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(index_html)

print("✅ Archivo index.html principal creado con botón de Estudio")
print("📍 Ubicación del botón: Prominente en la parte superior, lleva a estudio/estudio.html")