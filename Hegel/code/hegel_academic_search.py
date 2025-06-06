#!/usr/bin/env python3
"""
Script para búsqueda académica sobre Georg Wilhelm Friedrich Hegel
"""
import asyncio
import concurrent.futures
import json
from external_api.data_sources.client import get_client

async def search_hegel_topic(client, query, description, num_results=20):
    """Buscar un tema específico sobre Hegel en Scholar"""
    print(f"Iniciando búsqueda académica: {description}")
    try:
        result = await client.scholar.search_scholar(
            query=query,
            num_results=num_results,
            start_year=1990,  # Limitar a estudios modernos para análisis actualizados
            end_year=2024
        )
        if result["success"]:
            print(f"✓ Búsqueda exitosa para '{description}': {len(result['data']['papers'])} papers encontrados")
            return {"topic": description, "query": query, "data": result["data"]}
        else:
            print(f"✗ Error en búsqueda '{description}': {result.get('error', 'Error desconocido')}")
            return {"topic": description, "query": query, "error": result.get('error')}
    except Exception as e:
        print(f"✗ Excepción en búsqueda '{description}': {str(e)}")
        return {"topic": description, "query": query, "error": str(e)}

async def comprehensive_hegel_search():
    """Realizar búsqueda académica completa sobre Hegel"""
    client = get_client()
    
    # Definir búsquedas específicas para cada aspecto
    search_queries = [
        # Biografía y contexto histórico
        ("Hegel biography intellectual development", "Biografía y desarrollo intelectual"),
        ("Hegel historical context German idealism", "Contexto histórico e idealismo alemán"),
        
        # Obras principales y análisis
        ("Hegel Phenomenology of Spirit analysis", "Análisis de Fenomenología del Espíritu"),
        ("Hegel Science of Logic dialectic", "Ciencia de la Lógica y dialéctica"),
        ("Hegel Philosophy of Right political theory", "Filosofía del Derecho y teoría política"),
        
        # Conceptos filosóficos centrales
        ("Hegel dialectic method absolute spirit", "Método dialéctico y espíritu absoluto"),
        ("Hegel master slave dialectic consciousness", "Dialéctica del amo y el esclavo"),
        ("Hegel absolute knowledge phenomenology", "Conocimiento absoluto y fenomenología"),
        
        # Influencias recibidas
        ("Hegel influence Kant Fichte Schelling", "Influencias de Kant, Fichte y Schelling"),
        ("Hegel reception Greek philosophy Aristotle", "Recepción de filosofía griega y Aristóteles"),
        
        # Influencias ejercidas
        ("Hegel influence Marx dialectical materialism", "Influencia en Marx y materialismo dialéctico"),
        ("Hegel influence Kierkegaard existentialism", "Influencia en Kierkegaard y existencialismo"),
        ("Hegel influence contemporary philosophy", "Influencia en filosofía contemporánea"),
        
        # Interpretaciones y estudios modernos
        ("Hegel interpretation 21st century scholarship", "Interpretaciones en estudios del siglo XXI"),
        ("Hegel primary sources textual analysis", "Fuentes primarias y análisis textual")
    ]
    
    # Ejecutar búsquedas concurrentemente
    search_tasks = [
        search_hegel_topic(client, query, description, 25)
        for query, description in search_queries
    ]
    
    print(f"Ejecutando {len(search_tasks)} búsquedas académicas simultáneas...")
    results = await asyncio.gather(*search_tasks)
    
    return results

def save_academic_results(results, filename):
    """Guardar resultados académicos en archivo JSON"""
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    print(f"Resultados guardados en: {filename}")

def analyze_search_results(results):
    """Analizar y resumir resultados de búsqueda"""
    total_papers = 0
    successful_searches = 0
    topics_summary = []
    
    for result in results:
        if "data" in result:
            successful_searches += 1
            papers_count = len(result["data"]["papers"])
            total_papers += papers_count
            topics_summary.append({
                "topic": result["topic"], 
                "papers_found": papers_count,
                "query": result["query"]
            })
        else:
            topics_summary.append({
                "topic": result["topic"], 
                "papers_found": 0,
                "error": result.get("error", "Error desconocido"),
                "query": result["query"]
            })
    
    print(f"\n=== RESUMEN DE BÚSQUEDA ACADÉMICA ===")
    print(f"Búsquedas exitosas: {successful_searches}/{len(results)}")
    print(f"Total de papers académicos encontrados: {total_papers}")
    print(f"\nDetalle por tema:")
    for summary in topics_summary:
        if summary["papers_found"] > 0:
            print(f"  ✓ {summary['topic']}: {summary['papers_found']} papers")
        else:
            print(f"  ✗ {summary['topic']}: Error - {summary.get('error', 'Sin papers')}")
    
    return topics_summary

def run_async_search():
    """Ejecutar búsqueda asíncrona usando ThreadPoolExecutor"""
    with concurrent.futures.ThreadPoolExecutor() as executor:
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        try:
            results = loop.run_until_complete(comprehensive_hegel_search())
            return results
        finally:
            loop.close()

if __name__ == "__main__":
    print("=== INVESTIGACIÓN ACADÉMICA: GEORG WILHELM FRIEDRICH HEGEL ===\n")
    
    # Ejecutar búsqueda académica
    academic_results = run_async_search()
    
    # Analizar resultados
    summary = analyze_search_results(academic_results)
    
    # Guardar resultados completos
    save_academic_results(academic_results, "/workspace/data/hegel_academic_search_results.json")
    
    # Guardar resumen
    save_academic_results(summary, "/workspace/data/hegel_search_summary.json")
    
    print(f"\n=== BÚSQUEDA ACADÉMICA COMPLETADA ===")
    print("Próximos pasos: Análisis de papers encontrados y extracción de contenido detallado")
