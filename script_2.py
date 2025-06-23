# Crear la estructura de carpetas
import os
import shutil
import requests

# Crear carpeta estudio si no existe
if not os.path.exists('estudio'):
    os.makedirs('estudio')

# Descargar los archivos de la aplicación
def download_file(url, local_path):
    response = requests.get(url)
    with open(local_path, 'wb') as f:
        f.write(response.content)
    return f"✅ Archivo descargado: {local_path}"

# URLs de los archivos generados
app_files = [
    {
        "url": "https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/6e6f57ef0563c6e56692445c2ef98887/03549d49-9b08-4057-bf74-818ab598f7a9/index.html",
        "local_path": "estudio/estudio.html"  # Renombrar a estudio.html como solicitado
    },
    {
        "url": "https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/6e6f57ef0563c6e56692445c2ef98887/03549d49-9b08-4057-bf74-818ab598f7a9/style.css",
        "local_path": "estudio/style.css"
    },
    {
        "url": "https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/6e6f57ef0563c6e56692445c2ef98887/03549d49-9b08-4057-bf74-818ab598f7a9/app.js",
        "local_path": "estudio/app.js"
    }
]

# Descargar cada archivo
for file in app_files:
    print(download_file(file["url"], file["local_path"]))

# Mover el archivo JSON a la carpeta estudio
if os.path.exists('philosophers_data.json'):
    shutil.move('philosophers_data.json', 'estudio/philosophers_data.json')
    print("✅ JSON movido a la carpeta estudio")

# Verificar la estructura final
print("\n🔍 Estructura final de archivos:")
print("├── index.html (Aplicación principal modificada)")
print("└── estudio/")
print("    ├── estudio.html (Aplicación de quiz)")
print("    ├── style.css")
print("    ├── app.js")
print("    └── philosophers_data.json")

# Verificar que el botón de "Volver a Galería Principal" en estudio.html apunte correctamente a ../index.html
with open('estudio/estudio.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Verificar si necesitamos modificar el enlace de regreso
if "../index.html" not in content:
    # Reemplazar cualquier enlace existente con el correcto
    content = content.replace('index.html', '../index.html')
    
    # Si no hay un enlace de regreso, agregar uno
    if "Volver a Galería" not in content:
        # Encontrar el lugar adecuado para insertar el botón (justo después del header)
        header_end = content.find('</header>')
        if header_end > 0:
            insert_position = header_end
            button_html = '''
            <div class="back-button-container">
                <a href="../index.html" class="btn btn--outline back-btn">
                    ← Volver a Galería Principal
                </a>
            </div>
            '''
            content = content[:insert_position] + button_html + content[insert_position:]
    
    # Guardar el archivo modificado
    with open('estudio/estudio.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("✅ Enlace de regreso modificado en estudio.html")
else:
    print("✅ Enlace de regreso ya está configurado correctamente")

print("\n🎉 Instalación completada con éxito!")