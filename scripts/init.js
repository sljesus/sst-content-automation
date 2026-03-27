const fs = require('fs');
const path = require('path');

console.log('Inicializando proyecto n8n-workflow-sst-faqs...');

// Copiar .env.example a .env si no existe
const envExamplePath = path.join(__dirname, '..', '.env.example');
const envPath = path.join(__dirname, '..', '.env');

if (fs.existsSync(envExamplePath) && !fs.existsSync(envPath)) {
  fs.copyFileSync(envExamplePath, envPath);
  console.log('✓ Archivo .env creado desde .env.example');
  console.log('  Por favor, edita .env y agrega tus credenciales de n8n');
} else if (fs.existsSync(envPath)) {
  console.log('- Archivo .env ya existe');
} else {
  console.log('⚠ No se encontró .env.example');
}

// Asegurar que existe la carpeta workflows
const workflowsDir = path.join(__dirname, '..', 'workflows');
if (!fs.existsSync(workflowsDir)) {
  fs.mkdirSync(workflowsDir, { recursive: true });
  console.log('✓ Carpeta workflows creada');
}

// Asegurar que existe la carpeta docs
const docsDir = path.join(__dirname, '..', 'docs');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
  console.log('✓ Carpeta docs creada');
}

console.log('\nInicialización completada!');
console.log('\nPróximos pasos:');
console.log('1. Edita .env y agrega tu N8N_API_KEY');
console.log('2. Asegúrate de que n8n esté ejecutándose en http://localhost:5678');
console.log('3. Ejecuta "npm run workflow:list" para ver los workflows disponibles');
console.log('4. Ejecuta "npm run workflow:download" para descargar un workflow');
console.log('5. O crea el workflow "sst FAQs" en n8n y luego descargalo');
