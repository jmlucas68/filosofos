# Crear el archivo JSON con todos los filósofos
philosophers_data = {
    "filosofos": [
        {
            "nombre": "Anaxímenes de Mileto",
            "periodo": "585-525 a.C.",
            "nacionalidad": "Griega",
            "corriente": "Filosofía Presocrática",
            "obras": [
                "Sobre la naturaleza (fragmentos)",
                "Escritos cosmológicos (perdidos)"
            ],
            "citas": [
                "El aire infinito es el principio de todas las cosas",
                "Como nuestra alma, que es aire, nos sostiene, así el aliento y el aire rodean el mundo entero"
            ],
            "ideas": [
                "El aire como arché (principio originario)",
                "Teoría de la rarefacción y condensación",
                "Cosmología basada en procesos físicos"
            ]
        },
        {
            "nombre": "Anaxágoras de Clazómenas",
            "periodo": "500-428 a.C.",
            "nacionalidad": "Griega",
            "corriente": "Filosofía Presocrática",
            "obras": [
                "Sobre la naturaleza",
                "Investigaciones cosmológicas"
            ],
            "citas": [
                "Todas las cosas estaban juntas, luego vino la Mente y las ordenó",
                "En todo hay una porción de todo"
            ],
            "ideas": [
                "El Nous (mente cósmica) como principio ordenador",
                "Teoría de las homeomerías",
                "Pluralismo cosmológico"
            ]
        },
        {
            "nombre": "Aristóteles",
            "periodo": "384-322 a.C.",
            "nacionalidad": "Griega",
            "corriente": "Filosofía Clásica",
            "obras": [
                "Ética a Nicómaco",
                "Política",
                "Metafísica",
                "Organon",
                "Física"
            ],
            "citas": [
                "El hombre es por naturaleza un animal político",
                "La virtud está en el término medio",
                "Todos los hombres por naturaleza desean saber"
            ],
            "ideas": [
                "Teoría de las cuatro causas",
                "Lógica formal y silogística",
                "Ética de la virtud",
                "Teoría del acto y la potencia"
            ]
        },
        {
            "nombre": "San Agustín de Hipona",
            "periodo": "354-430 d.C.",
            "nacionalidad": "Romana del Norte de África",
            "corriente": "Filosofía Cristiana",
            "obras": [
                "Confesiones",
                "La Ciudad de Dios",
                "Sobre la Trinidad",
                "Contra los académicos"
            ],
            "citas": [
                "Ama y haz lo que quieras",
                "Te has hecho para Ti, y nuestro corazón está inquieto hasta que descanse en Ti",
                "La fe busca, el entendimiento encuentra"
            ],
            "ideas": [
                "Síntesis de platonismo y cristianismo",
                "Teoría de la iluminación divina",
                "Agustinismo político",
                "Interioridad y autoconocimiento"
            ]
        },
        {
            "nombre": "Boecio",
            "periodo": "477-524 d.C.",
            "nacionalidad": "Romana",
            "corriente": "Neoplatonismo cristiano",
            "obras": [
                "La Consolación de la Filosofía",
                "De institutione arithmetica",
                "De institutione musica"
            ],
            "citas": [
                "Nada más es la filosofía que la verdadera religión",
                "La felicidad es el bien perfecto que hace feliz al que lo posee"
            ],
            "ideas": [
                "Conciliación entre fe y razón",
                "Teoría del tiempo y la eternidad",
                "Transmisión del saber clásico al mundo medieval"
            ]
        },
        {
            "nombre": "Avicena (Ibn Sina)",
            "periodo": "980-1037 d.C.",
            "nacionalidad": "Persa",
            "corriente": "Aristotelismo Islámico",
            "obras": [
                "El Canon de Medicina",
                "El libro del saber (Donish-Nameh)",
                "La Curación (Al-Shifa)"
            ],
            "citas": [
                "Un médico ignorante es el ayudante de campo de la muerte",
                "La medicina es la ciencia por la cual aprendemos las diversas condiciones del cuerpo humano"
            ],
            "ideas": [
                "Síntesis de aristotelismo y teología islámica",
                "Teoría del hombre flotante",
                "Conciliación entre razón y fe",
                "Método científico experimental"
            ]
        },
        {
            "nombre": "Averroes (Ibn Rushd)",
            "periodo": "1126-1198 d.C.",
            "nacionalidad": "Andalusí",
            "corriente": "Aristotelismo Islámico",
            "obras": [
                "Comentarios a Aristóteles",
                "La destrucción de la destrucción",
                "Bidayat al-Mujtahid"
            ],
            "citas": [
                "La ignorancia lleva al miedo, el miedo lleva al odio, y el odio conduce a la violencia",
                "La doble verdad no existe; solo hay una verdad"
            ],
            "ideas": [
                "Defensa de la autonomía de la razón",
                "Comentarios exhaustivos de Aristóteles",
                "Compatibilidad entre filosofía y religión",
                "Influencia en la escolástica medieval"
            ]
        },
        {
            "nombre": "San Buenaventura",
            "periodo": "1221-1274 d.C.",
            "nacionalidad": "Italiana",
            "corriente": "Escolástica Franciscana",
            "obras": [
                "Itinerarium mentis in Deum",
                "Breviloquium",
                "Collationes in Hexaemeron"
            ],
            "citas": [
                "Como el ojo corporal no puede ver sin la luz del sol, así el ojo del alma no puede entender perfectamente las cosas creadas sin la luz divina",
                "Nadie entra en la verdad sino por la caridad"
            ],
            "ideas": [
                "Teoría de los tres ojos del alma",
                "Síntesis agustiniano-franciscana",
                "Ejemplarismo divino",
                "Misticismo intelectual"
            ]
        },
        {
            "nombre": "George Berkeley",
            "periodo": "1685-1753 d.C.",
            "nacionalidad": "Irlandesa",
            "corriente": "Empirismo irlandés",
            "obras": [
                "Tratado sobre los principios del conocimiento humano",
                "Tres diálogos entre Hylas y Philonus",
                "Alciphron"
            ],
            "citas": [
                "Esse est percipi (Ser es ser percibido)",
                "Existir es una cosa y ser percibido es otra"
            ],
            "ideas": [
                "Inmaterialismo filosófico",
                "Idealismo subjetivo",
                "Crítica al materialismo newtoniano",
                "Negación de la sustancia material"
            ]
        },
        {
            "nombre": "John Locke",
            "periodo": "1632-1704 d.C.",
            "nacionalidad": "Inglesa",
            "corriente": "Empirismo inglés",
            "obras": [
                "Ensayo sobre el entendimiento humano",
                "Dos tratados sobre el gobierno civil",
                "Carta sobre la tolerancia"
            ],
            "citas": [
                "No hay nada en el intelecto que no estuviera antes en los sentidos",
                "Donde no hay ley, no hay libertad"
            ],
            "ideas": [
                "Teoría de la tabula rasa",
                "Derechos naturales (vida, libertad, propiedad)",
                "Contractualismo social",
                "Separación de poderes"
            ]
        },
        {
            "nombre": "Walter Benjamin",
            "periodo": "1892-1940 d.C.",
            "nacionalidad": "Alemana",
            "corriente": "Escuela de Frankfurt",
            "obras": [
                "La obra de arte en la época de su reproductibilidad técnica",
                "Tesis sobre la filosofía de la historia",
                "El origen del drama barroco alemán"
            ],
            "citas": [
                "No hay documento de cultura que no sea a la vez documento de barbarie",
                "La tradición de los oprimidos nos enseña que el 'estado de excepción' es la regla"
            ],
            "ideas": [
                "Concepto del aura en el arte",
                "Reproductibilidad técnica",
                "Materialismo histórico mesiánico",
                "Crítica del progreso lineal"
            ]
        },
        {
            "nombre": "Theodor Adorno",
            "periodo": "1903-1969 d.C.",
            "nacionalidad": "Alemana",
            "corriente": "Teoría Crítica",
            "obras": [
                "Dialéctica de la Ilustración",
                "Mínima Moralia",
                "Teoría Estética",
                "Dialéctica Negativa"
            ],
            "citas": [
                "No hay vida correcta en la vida falsa",
                "La industria cultural ofrece como paraíso la misma vida cotidiana"
            ],
            "ideas": [
                "Crítica de la razón instrumental",
                "Teoría de la industria cultural",
                "Dialéctica negativa",
                "Crítica de la sociedad administrada"
            ]
        },
        {
            "nombre": "Hannah Arendt",
            "periodo": "1906-1975 d.C.",
            "nacionalidad": "Alemana-Estadounidense",
            "corriente": "Filosofía Política",
            "obras": [
                "Los orígenes del totalitarismo",
                "La condición humana",
                "Sobre la violencia",
                "Eichmann en Jerusalén"
            ],
            "citas": [
                "La banalidad del mal",
                "El poder corresponde a la capacidad humana no meramente para actuar sino para actuar concertadamente"
            ],
            "ideas": [
                "Análisis del totalitarismo",
                "Teoría de la vita activa (labor, trabajo, acción)",
                "Concepto de banalidad del mal",
                "Filosofía de la natalidad"
            ]
        },
        {
            "nombre": "John Langshaw Austin",
            "periodo": "1911-1960 d.C.",
            "nacionalidad": "Británica",
            "corriente": "Filosofía Analítica",
            "obras": [
                "Cómo hacer cosas con palabras",
                "Sentido y sensibilia",
                "Escritos filosóficos"
            ],
            "citas": [
                "Decir algo es hacer algo",
                "Las palabras son también acciones"
            ],
            "ideas": [
                "Teoría de los actos de habla",
                "Filosofía del lenguaje ordinario",
                "Actos locucionarios, ilocucionarios y perlocucionarios",
                "Crítica al lenguaje filosófico tradicional"
            ]
        },
        {
            "nombre": "Simone de Beauvoir",
            "periodo": "1908-1986 d.C.",
            "nacionalidad": "Francesa",
            "corriente": "Existencialismo feminista",
            "obras": [
                "El segundo sexo",
                "La ética de la ambigüedad",
                "Los mandarines"
            ],
            "citas": [
                "No se nace mujer, se llega a serlo",
                "La representación del mundo, como el mundo mismo, es obra de los hombres"
            ],
            "ideas": [
                "Teoría feminista existencialista",
                "Concepto de la mujer como 'Otro'",
                "Crítica de la construcción social del género",
                "Ética de la situación"
            ]
        },
        {
            "nombre": "Rudolf Carnap",
            "periodo": "1891-1970 d.C.",
            "nacionalidad": "Alemana-Estadounidense",
            "corriente": "Positivismo lógico",
            "obras": [
                "La estructura lógica del mundo",
                "La superación de la metafísica mediante el análisis lógico del lenguaje",
                "Significado y necesidad"
            ],
            "citas": [
                "Las proposiciones de la metafísica carecen completamente de sentido",
                "No existe algo que pueda llamarse lenguaje o lógica 'correctos' o 'verdaderos'"
            ],
            "ideas": [
                "Positivismo lógico",
                "Análisis lógico del lenguaje",
                "Verificacionismo",
                "Tolerancia lingüística"
            ]
        },
        {
            "nombre": "Gustavo Bueno",
            "periodo": "1924-2016 d.C.",
            "nacionalidad": "Española",
            "corriente": "Materialismo filosófico",
            "obras": [
                "El papel de la filosofía en el conjunto del saber",
                "Teoría del cierre categorial",
                "El mito de la cultura"
            ],
            "citas": [
                "La filosofía no es un saber sobre objetos, sino un saber de segundo grado",
                "No hay cultura humana en general"
            ],
            "ideas": [
                "Materialismo filosófico",
                "Teoría del cierre categorial",
                "Crítica del concepto de cultura",
                "Ontología materialista"
            ]
        },
        {
            "nombre": "Judith Butler",
            "periodo": "1956-presente",
            "nacionalidad": "Estadounidense",
            "corriente": "Filosofía de género",
            "obras": [
                "El género en disputa",
                "Cuerpos que importan",
                "Marcos de guerra"
            ],
            "citas": [
                "El género es una construcción social que no tiene base natural",
                "No existe identidad de género detrás de las expresiones de género"
            ],
            "ideas": [
                "Teoría de la performatividad de género",
                "Crítica al sujeto cartesiano",
                "Deconstrucción de las categorías de sexo y género",
                "Filosofía queer"
            ]
        }
    ]
}

import json

# Guardar el JSON
with open('philosophers_data.json', 'w', encoding='utf-8') as f:
    json.dump(philosophers_data, f, ensure_ascii=False, indent=2)

print("✅ Base de datos JSON creada con 18 filósofos")
print("📊 Filósofos incluidos desde Anaxímenes (585 a.C.) hasta Judith Butler (presente)")