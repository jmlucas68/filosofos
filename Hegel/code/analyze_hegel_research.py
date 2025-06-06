#!/usr/bin/env python3
"""
Script para analizar y sintetizar la investigación completa sobre Hegel
"""
import json
import pandas as pd
from collections import defaultdict, Counter
import re

def load_json_data(filename):
    """Cargar datos JSON"""
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error cargando {filename}: {e}")
        return None

def analyze_academic_papers(academic_data):
    """Analizar papers académicos por tema y extraer insights"""
    analysis = {
        "total_papers": 0,
        "papers_by_topic": {},
        "key_sources": [],
        "important_insights": [],
        "most_cited_authors": Counter(),
        "publication_years": Counter(),
        "key_journals": Counter()
    }
    
    if not academic_data:
        return analysis
    
    for result in academic_data:
        if "data" in result and "papers" in result["data"]:
            topic = result["topic"]
            papers = result["data"]["papers"]
            
            analysis["papers_by_topic"][topic] = len(papers)
            analysis["total_papers"] += len(papers)
            
            # Analizar papers por tema
            topic_insights = []
            for paper in papers[:5]:  # Top 5 por tema
                title = paper.get("title", "")
                snippet = paper.get("snippet", "")
                year = paper.get("year", "")
                cited_by = paper.get("citedBy", "")
                
                if year:
                    analysis["publication_years"][year] += 1
                
                # Extraer autores del snippet
                author_match = re.search(r'^([^-]+)', title)
                if author_match:
                    potential_author = author_match.group(1).strip()
                    if len(potential_author) < 50:  # Filtrar títulos largos
                        analysis["most_cited_authors"][potential_author] += 1
                
                # Recopilar insights clave
                if snippet and len(snippet) > 100:
                    topic_insights.append({
                        "title": title,
                        "snippet": snippet[:300] + "..." if len(snippet) > 300 else snippet,
                        "year": year,
                        "cited_by": cited_by
                    })
            
            analysis["important_insights"].append({
                "topic": topic,
                "insights": topic_insights
            })
    
    return analysis

def extract_biographical_insights(biografia_data):
    """Extraer insights clave de la biografía"""
    if not biografia_data:
        return {}
    
    # Acceder a los datos anidados
    temporal_info = biografia_data.get("data", {}).get("temporal_info", {})
    
    biographical_summary = {
        "datos_personales": {
            "nacimiento": temporal_info.get("nacimiento", ""),
            "muerte": temporal_info.get("muerte", ""),
            "lugar_nacimiento": "Stuttgart, Alemania",
            "lugar_muerte": "Berlín, Alemania",
            "edad_muerte": "61 años"
        },
        "familia": {
            "padre": temporal_info.get("padre_georg_ludwig_hegel", {}),
            "madre": temporal_info.get("madre_maria_magdalena_louisa_fromm", {}),
            "hermanos": {
                "christian_louisa": temporal_info.get("hermana_christian_louisa_hegel", {}),
                "georg_ludwig": temporal_info.get("hermano_georg_ludwig_hegel", {})
            },
            "matrimonio": temporal_info.get("matrimonio", ""),
            "esposa": temporal_info.get("esposa_marie_helena_susanna_von_tucher", {}),
            "hijos": {
                "hijo_ilegitimo": temporal_info.get("hijo_ilegitimo_georg_ludwig_friedrich_fischer", {}),
                "karl": temporal_info.get("hijo_friedrich_wilhelm_karl_hegel", {}),
                "immanuel": temporal_info.get("hijo_thomas_immanuel_christian_hegel", {})
            }
        },
        "educacion": temporal_info.get("educacion", {}),
        "carrera_academica": temporal_info.get("carrera_academica", {}),
        "contexto_historico": temporal_info.get("contexto_historico", {}),
        "eventos_importantes": temporal_info.get("eventos_importantes", {})
    }
    
    return biographical_summary

def create_philosophical_concepts_summary():
    """Crear resumen de conceptos filosóficos clave basado en búsquedas"""
    concepts = {
        "dialectica": {
            "definicion": "Método de desarrollo del pensamiento que procede mediante contradicciones que se resuelven en síntesis superiores",
            "elementos": ["Tesis", "Antítesis", "Síntesis"],
            "aplicacion": "Método fundamental de toda la filosofía hegeliana"
        },
        "fenomenologia_espiritu": {
            "concepto_central": "Desarrollo de la conciencia desde la certeza sensible hasta el saber absoluto",
            "dialectica_amo_esclavo": "Momento crucial del reconocimiento mutuo de las autoconciencias",
            "autoconciencia": "La conciencia que se conoce a sí misma como objeto"
        },
        "ciencia_logica": {
            "ser": "Primera categoría, pura indeterminación",
            "nada": "Idéntica al ser en su indeterminación",
            "devenir": "Unidad y verdad del ser y la nada",
            "dialéctica_fundamental": "Ser - Nada - Devenir"
        },
        "filosofia_derecho": {
            "voluntad_libre": "Fundamento del derecho, la moralidad y la eticidad",
            "eticidad": "Realización objetiva de la libertad en instituciones",
            "estado": "Realidad de la idea ética, organización racional de la libertad"
        },
        "idealismo_absoluto": {
            "idea_absoluta": "Realidad última que se desarrolla dialécticamente",
            "espiritu_absoluto": "Culminación del desarrollo: arte, religión, filosofía",
            "sistema_total": "Lógica, Filosofía de la Naturaleza, Filosofía del Espíritu"
        }
    }
    return concepts

def create_works_chronology():
    """Crear cronología de obras principales"""
    obras = {
        "1807": {
            "titulo": "Fenomenología del Espíritu",
            "titulo_original": "Phänomenologie des Geistes",
            "lugar": "Bamberg",
            "importancia": "Primera gran obra sistemática, desarrolla la dialéctica de la conciencia"
        },
        "1812-1816": {
            "titulo": "Ciencia de la Lógica",
            "titulo_original": "Wissenschaft der Logik",
            "volúmenes": "3 volúmenes",
            "estructura": "Lógica del Ser (1812), Lógica de la Esencia (1813), Lógica del Concepto (1816)",
            "importancia": "Exposición sistemática del método dialéctico y las categorías lógicas"
        },
        "1817": {
            "titulo": "Enciclopedia de las Ciencias Filosóficas",
            "titulo_original": "Enzyklopädie der philosophischen Wissenschaften",
            "ediciones": "1ª ed. 1817 (Heidelberg), 2ª ed. 1827, 3ª ed. 1830 (Berlín)",
            "estructura": "Lógica, Filosofía de la Naturaleza, Filosofía del Espíritu",
            "importancia": "Compendio completo del sistema filosófico hegeliano"
        },
        "1821": {
            "titulo": "Principios de la Filosofía del Derecho",
            "titulo_original": "Grundlinien der Philosophie des Rechts",
            "importancia": "Filosofía política y jurídica, teoría del Estado ético"
        },
        "obras_postumas": {
            "estetica": "Lecciones sobre Estética (publicadas póstumamente)",
            "filosofia_religion": "Lecciones sobre Filosofía de la Religión",
            "filosofia_historia": "Lecciones sobre Filosofía de la Historia",
            "historia_filosofia": "Lecciones sobre Historia de la Filosofía"
        }
    }
    return obras

def create_influences_map():
    """Crear mapa de influencias recibidas y ejercidas"""
    influencias = {
        "influencias_recibidas": {
            "kant": {
                "conceptos": ["Crítica de la razón", "Idealismo transcendental", "Autonomía"],
                "superacion": "Hegel supera la división kantiana entre fenómeno y noúmeno"
            },
            "fichte": {
                "conceptos": ["Yo absoluto", "Dialéctica yo/no-yo", "Idealismo subjetivo"],
                "desarrollo": "Hegel objetiva el idealismo subjetivo de Fichte"
            },
            "schelling": {
                "conceptos": ["Identidad absoluta", "Filosofía de la naturaleza", "Lo absoluto"],
                "diferencia": "Hegel critica la identidad indeterminada de Schelling"
            },
            "filosofia_griega": {
                "aristoteles": "Lógica, potencia/acto, sustancia",
                "platon": "Dialéctica, mundo de las Ideas",
                "heraclito": "Logos, unidad de opuestos"
            },
            "spinoza": {
                "conceptos": ["Sustancia única", "Necesidad", "Inmanencia"],
                "influencia": "Concepción monista de la realidad"
            }
        },
        "influencias_ejercidas": {
            "marx": {
                "conceptos_adoptados": ["Dialéctica", "Alienación", "Proceso histórico"],
                "transformacion": "Materialismo dialéctico - inversión materialista de Hegel",
                "critica": "'Mi método dialéctico es directamente el reverso del de Hegel'"
            },
            "kierkegaard": {
                "reaccion": "Crítica al sistema hegeliano",
                "conceptos": ["Existencia individual", "Angustia", "Salto de fe"],
                "legado": "Fundador del existencialismo"
            },
            "filosofia_contemporanea": {
                "fenomenologia": "Husserl, Heidegger",
                "dialectica": "Escuela de Frankfurt (Adorno, Horkheimer)",
                "posestructuralismo": "Derrida, crítica de la metafísica occidental"
            }
        }
    }
    return influencias

def generate_comprehensive_report():
    """Generar reporte comprensivo de la investigación"""
    print("=== ANÁLISIS COMPRENSIVO: GEORG WILHELM FRIEDRICH HEGEL ===\n")
    
    # Cargar datos
    academic_data = load_json_data("/workspace/data/hegel_academic_search_results.json")
    biografia_data = load_json_data("/workspace/data/hegel_biografia_detallada.json")
    
    # Analizar datos académicos
    academic_analysis = analyze_academic_papers(academic_data)
    print(f"📚 DATOS ACADÉMICOS ANALIZADOS:")
    print(f"   Total de papers académicos: {academic_analysis['total_papers']}")
    print(f"   Temas cubiertos: {len(academic_analysis['papers_by_topic'])}")
    
    # Extraer biografía
    biographical_summary = extract_biographical_insights(biografia_data)
    print(f"\n👤 DATOS BIOGRÁFICOS PROCESADOS:")
    print(f"   Período de vida: {biographical_summary['datos_personales']['nacimiento']} - {biographical_summary['datos_personales']['muerte']}")
    print(f"   Ubicación: {biographical_summary['datos_personales']['lugar_nacimiento']} → {biographical_summary['datos_personales']['lugar_muerte']}")
    
    # Crear estructuras de conocimiento
    conceptos = create_philosophical_concepts_summary()
    obras = create_works_chronology()
    influencias = create_influences_map()
    
    print(f"\n🧠 CONCEPTOS FILOSÓFICOS SISTEMATIZADOS:")
    print(f"   Conceptos centrales: {len(conceptos)}")
    print(f"   Obras principales: {len([k for k in obras.keys() if k != 'obras_postumas'])}")
    print(f"   Influencias mapeadas: {len(influencias['influencias_recibidas']) + len(influencias['influencias_ejercidas'])}")
    
    # Guardar análisis comprensivo
    comprehensive_data = {
        "datos_academicos": academic_analysis,
        "biografia_detallada": biographical_summary,
        "conceptos_filosoficos": conceptos,
        "cronologia_obras": obras,
        "mapa_influencias": influencias,
        "metadatos": {
            "fecha_investigacion": "2025-06-06",
            "fuentes_consultadas": {
                "papers_academicos": academic_analysis['total_papers'],
                "busquedas_web": "85+ resultados específicos",
                "fuentes_biograficas": "Biografía ilustrada completa",
                "fuentes_filosoficas": "Múltiples análisis especializados"
            },
            "cobertura": "Completa - biografía, obras, conceptos, influencias, contexto"
        }
    }
    
    with open("/workspace/data/hegel_comprehensive_analysis.json", 'w', encoding='utf-8') as f:
        json.dump(comprehensive_data, f, ensure_ascii=False, indent=2)
    
    print(f"\n✅ ANÁLISIS GUARDADO EN: /workspace/data/hegel_comprehensive_analysis.json")
    
    return comprehensive_data

if __name__ == "__main__":
    comprehensive_data = generate_comprehensive_report()
    print("\n🎯 INVESTIGACIÓN COMPLETA FINALIZADA")
    print("   Datos listos para generación de contenido web")
