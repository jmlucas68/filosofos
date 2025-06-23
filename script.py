import json
from pathlib import Path

def load_philosophers_data(json_file_path="philosophers_data_complete.json"):
    """
    Carga los datos de filósofos desde un archivo JSON externo.
    
    Args:
        json_file_path (str): Ruta al archivo JSON con los datos de filósofos
        
    Returns:
        list: Lista de diccionarios con información de cada filósofo
    """
    try:
        # Verificar si el archivo existe
        if not Path(json_file_path).exists():
            raise FileNotFoundError(f"El archivo {json_file_path} no se encuentra")
        
        # Leer el archivo JSON
        with open(json_file_path, 'r', encoding='utf-8') as file:
            data = json.load(file)
        
        # Extraer la lista de filósofos
        philosophers = data.get('filosofos', [])
        
        if not philosophers:
            print("Advertencia: No se encontraron filósofos en el archivo JSON")
        
        return philosophers
        
    except json.JSONDecodeError as e:
        print(f"Error al leer el archivo JSON: {e}")
        return []
    except FileNotFoundError as e:
        print(f"Error: {e}")
        return []
    except Exception as e:
        print(f"Error inesperado: {e}")
        return []

def display_philosopher_info(philosopher):
    """
    Muestra la información de un filósofo de forma organizada.
    
    Args:
        philosopher (dict): Diccionario con información del filósofo
    """
    print("=" * 60)
    print(f"NOMBRE: {philosopher.get('nombre', 'N/A')}")
    print(f"PERÍODO: {philosopher.get('periodo', 'N/A')}")
    print(f"NACIONALIDAD: {philosopher.get('nacionalidad', 'N/A')}")
    print(f"CORRIENTE: {philosopher.get('corriente', 'N/A')}")
    
    print("\nOBRAS PRINCIPALES:")
    obras = philosopher.get('obras', [])
    for i, obra in enumerate(obras, 1):
        print(f"  {i}. {obra}")
    
    print("\nCITAS FAMOSAS:")
    citas = philosopher.get('citas', [])
    for i, cita in enumerate(citas, 1):
        print(f"  {i}. \"{cita}\"")
    
    print("\nIDEAS PRINCIPALES:")
    ideas = philosopher.get('ideas', [])
    for i, idea in enumerate(ideas, 1):
        print(f"  {i}. {idea}")
    
    print("=" * 60)

def search_philosopher_by_name(philosophers, name):
    """
    Busca un filósofo por nombre.
    
    Args:
        philosophers (list): Lista de filósofos
        name (str): Nombre del filósofo a buscar
        
    Returns:
        dict or None: Diccionario del filósofo encontrado o None
    """
    for philosopher in philosophers:
        if name.lower() in philosopher.get('nombre', '').lower():
            return philosopher
    return None

def filter_by_period(philosophers, period_keyword):
    """
    Filtra filósofos por período histórico.
    
    Args:
        philosophers (list): Lista de filósofos
        period_keyword (str): Palabra clave del período (ej: "a.C.", "d.C.")
        
    Returns:
        list: Lista de filósofos que coinciden con el período
    """
    filtered = []
    for philosopher in philosophers:
        if period_keyword.lower() in philosopher.get('periodo', '').lower():
            filtered.append(philosopher)
    return filtered

def filter_by_current(philosophers, current_keyword):
    """
    Filtra filósofos por corriente filosófica.
    
    Args:
        philosophers (list): Lista de filósofos
        current_keyword (str): Palabra clave de la corriente
        
    Returns:
        list: Lista de filósofos que coinciden con la corriente
    """
    filtered = []
    for philosopher in philosophers:
        if current_keyword.lower() in philosopher.get('corriente', '').lower():
            filtered.append(philosopher)
    return filtered

def get_random_philosopher(philosophers):
    """
    Obtiene un filósofo aleatorio de la lista.
    
    Args:
        philosophers (list): Lista de filósofos
        
    Returns:
        dict: Diccionario del filósofo seleccionado aleatoriamente
    """
    import random
    if philosophers:
        return random.choice(philosophers)
    return None

def export_to_txt(philosophers, filename="filosofos_export.txt"):
    """
    Exporta la información de los filósofos a un archivo de texto.
    
    Args:
        philosophers (list): Lista de filósofos
        filename (str): Nombre del archivo de salida
    """
    try:
        with open(filename, 'w', encoding='utf-8') as file:
            file.write("🏛️ GALERÍA DE FILÓSOFOS - EXPORTACIÓN\n")
            file.write("=" * 60 + "\n\n")
            
            for philosopher in philosophers:
                file.write(f"NOMBRE: {philosopher.get('nombre', 'N/A')}\n")
                file.write(f"PERÍODO: {philosopher.get('periodo', 'N/A')}\n")
                file.write(f"NACIONALIDAD: {philosopher.get('nacionalidad', 'N/A')}\n")
                file.write(f"CORRIENTE: {philosopher.get('corriente', 'N/A')}\n")
                
                file.write("\nOBRAS PRINCIPALES:\n")
                for i, obra in enumerate(philosopher.get('obras', []), 1):
                    file.write(f"  {i}. {obra}\n")
                
                file.write("\nCITAS FAMOSAS:\n")
                for i, cita in enumerate(philosopher.get('citas', []), 1):
                    file.write(f"  {i}. \"{cita}\"\n")
                
                file.write("\nIDEAS PRINCIPALES:\n")
                for i, idea in enumerate(philosopher.get('ideas', []), 1):
                    file.write(f"  {i}. {idea}\n")
                
                file.write("\n" + "=" * 60 + "\n\n")
        
        print(f"✅ Datos exportados exitosamente a: {filename}")
        
    except Exception as e:
        print(f"❌ Error al exportar: {e}")

def main():
    """
    Función principal del programa.
    """
    print("🏛️  SISTEMA DE GESTIÓN DE FILÓSOFOS  🏛️")
    print("=" * 60)
    
    # Cargar datos desde el archivo JSON
    philosophers = load_philosophers_data()
    
    if not philosophers:
        print("No se pudieron cargar los datos de filósofos. Programa terminado.")
        return
    
    print(f"✅ Se cargaron {len(philosophers)} filósofos exitosamente\n")
    
    while True:
        print("\n--- MENÚ PRINCIPAL ---")
        print("1. Mostrar todos los filósofos")
        print("2. Buscar filósofo por nombre")
        print("3. Filtrar por período histórico")
        print("4. Filtrar por corriente filosófica")
        print("5. Filósofo aleatorio")
        print("6. Mostrar estadísticas")
        print("7. Exportar a archivo de texto")
        print("8. Salir")
        
        choice = input("\nSeleccione una opción (1-8): ").strip()
        
        if choice == '1':
            print("\n📚 TODOS LOS FILÓSOFOS:")
            for philosopher in philosophers:
                display_philosopher_info(philosopher)
                
        elif choice == '2':
            name = input("\nIngrese el nombre del filósofo: ").strip()
            philosopher = search_philosopher_by_name(philosophers, name)
            if philosopher:
                print("\n🔍 FILÓSOFO ENCONTRADO:")
                display_philosopher_info(philosopher)
            else:
                print(f"❌ No se encontró ningún filósofo con el nombre '{name}'")
                
        elif choice == '3':
            period = input("\nIngrese período a filtrar (ej: 'a.C.', 'd.C.'): ").strip()
            filtered = filter_by_period(philosophers, period)
            if filtered:
                print(f"\n📅 FILÓSOFOS DEL PERÍODO '{period}':")
                for philosopher in filtered:
                    display_philosopher_info(philosopher)
            else:
                print(f"❌ No se encontraron filósofos del período '{period}'")
                
        elif choice == '4':
            current = input("\nIngrese corriente filosófica (ej: 'Presocrática', 'Clásica'): ").strip()
            filtered = filter_by_current(philosophers, current)
            if filtered:
                print(f"\n🏛️ FILÓSOFOS DE LA CORRIENTE '{current}':")
                for philosopher in filtered:
                    display_philosopher_info(philosopher)
            else:
                print(f"❌ No se encontraron filósofos de la corriente '{current}'")
                
        elif choice == '5':
            random_philosopher = get_random_philosopher(philosophers)
            if random_philosopher:
                print("\n🎲 FILÓSOFO ALEATORIO:")
                display_philosopher_info(random_philosopher)
            else:
                print("❌ No se pudo obtener un filósofo aleatorio")
                
        elif choice == '6':
            print("\n📊 ESTADÍSTICAS:")
            print(f"Total de filósofos: {len(philosophers)}")
            
            # Contar por corrientes
            corrientes = {}
            for philosopher in philosophers:
                corriente = philosopher.get('corriente', 'Sin clasificar')
                corrientes[corriente] = corrientes.get(corriente, 0) + 1
            
            print("\nPor corriente filosófica:")
            for corriente, count in sorted(corrientes.items()):
                print(f"  - {corriente}: {count}")
                
            # Contar por períodos
            periodos = {}
            for philosopher in philosophers:
                periodo = philosopher.get('periodo', 'Sin período')
                if 'a.C.' in periodo:
                    epoca = 'Antigüedad'
                elif any(x in periodo for x in ['d.C.', 'siglo']):
                    epoca = 'Era Cristiana'
                else:
                    epoca = 'Sin clasificar'
                periodos[epoca] = periodos.get(epoca, 0) + 1
            
            print("\nPor época:")
            for epoca, count in sorted(periodos.items()):
                print(f"  - {epoca}: {count}")
                
        elif choice == '7':
            filename = input("\nIngrese nombre del archivo (presione Enter para usar 'filosofos_export.txt'): ").strip()
            if not filename:
                filename = "filosofos_export.txt"
            export_to_txt(philosophers, filename)
            
        elif choice == '8':
            print("\n👋 ¡Hasta pronto!")
            break
            
        else:
            print("❌ Opción no válida. Intente nuevamente.")

if __name__ == "__main__":
    main()