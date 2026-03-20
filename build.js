/**
 * SST Content Workflow Builder
 * 
 * Lee todos los nodos de /nodes/ en orden y genera workflow.json
 * 
 * Conexiones especiales en connections.json:
 * - _main: array con el orden del flujo principal
 * - otros nodos: conexiones no-sequenciales (sub-nodos, etc)
 * 
 * Uso: node build.js
 */

const fs = require('fs');
const path = require('path');

const NODES_DIR = path.join(__dirname, 'nodes');
const CONNECTIONS_FILE = path.join(__dirname, 'connections.json');
const OUTPUT_FILE = path.join(__dirname, 'workflow.json');

// Obtener todos los archivos .json en /nodes/ ordenados
function getNodeFiles() {
  return fs.readdirSync(NODES_DIR)
    .filter(f => f.endsWith('.json'))
    .sort();
}

// Cargar nodos
function loadNodes() {
  const nodeFiles = getNodeFiles();
  return nodeFiles.map(file => {
    const nodeData = JSON.parse(fs.readFileSync(path.join(NODES_DIR, file), 'utf8'));
    return nodeData;
  });
}

// Cargar conexiones especiales
function loadSpecialConnections() {
  if (fs.existsSync(CONNECTIONS_FILE)) {
    return JSON.parse(fs.readFileSync(CONNECTIONS_FILE, 'utf8'));
  }
  return {};
}

// Construir conexiones
function buildConnections(nodes, specialConnections) {
  const connections = {};
  
  // Extraer el flujo principal
  const mainFlow = specialConnections._main || [];
  
  // Construir conexiones del flujo principal
  for (let i = 0; i < mainFlow.length; i++) {
    const nodeName = mainFlow[i];
    if (i < mainFlow.length - 1) {
      connections[nodeName] = {
        main: [
          [
            {
              node: mainFlow[i + 1],
              type: 'main',
              index: 0
            }
          ]
        ]
      };
    } else {
      // Último nodo - sin salida
      connections[nodeName] = {
        main: [
          []
        ]
      };
    }
  }
  
  // Agregar conexiones especiales (sub-nodos)
  for (const [sourceName, outputs] of Object.entries(specialConnections)) {
    if (sourceName === '_main') continue; // Skip el array de flujo
    connections[sourceName] = outputs;
  }
  
  return connections;
}

// Construir el workflow completo
function buildWorkflow() {
  const nodes = loadNodes();
  const specialConnections = loadSpecialConnections();
  
  console.log(`📦 Encontrados ${nodes.length} nodos:`);
  nodes.forEach(n => console.log(`   - ${n.name}`));
  
  const mainFlow = specialConnections._main || [];
  if (mainFlow.length > 0) {
    console.log(`\n🔗 Flujo principal:`);
    mainFlow.forEach((name, i) => {
      if (i < mainFlow.length - 1) {
        console.log(`   ${name} → ${mainFlow[i + 1]}`);
      }
    });
  }
  
  // Mostrar conexiones especiales
  const specialCount = Object.keys(specialConnections).length - (mainFlow.length > 0 ? 1 : 0);
  if (specialCount > 0) {
    console.log(`\n🔗 Conexiones especiales:`);
    for (const [source, outputs] of Object.entries(specialConnections)) {
      if (source === '_main') continue;
      const outputTypes = Object.keys(outputs);
      console.log(`   - ${source} → [${outputTypes.join(', ')}]`);
    }
  }
  
  const connections = buildConnections(nodes, specialConnections);
  
  // Workflow completo
  const workflow = {
    name: "SST Content",
    nodes,
    connections,
    active: false,
    settings: {
      executionOrder: "v1"
    },
    meta: {
      templateCredsSetupCompleted: true,
      instanceId: "fab9f3ff2b7568fc6571b1133cdeedbc6f1cec20202daf1c2e3e5f0a179f140a"
    },
    versionId: Date.now().toString(),
    id: "sst-content-modular"
  };
  
  // Guardar
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(workflow, null, 2));
  console.log(`\n✅ Workflow generado: ${OUTPUT_FILE}`);
  console.log(`📝 ${nodes.length} nodos | ${Object.keys(connections).length} conexiones`);
}

// Ejecutar
buildWorkflow();
