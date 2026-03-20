/**
 * SST Content Workflow Builder
 * 
 * Lee todos los nodos de /nodes/ en orden y genera workflow.json
 * Soporta conexiones especiales definidas en /connections.json
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

// Cargar conexiones especiales (las que NO son cadena simple)
function loadSpecialConnections() {
  if (fs.existsSync(CONNECTIONS_FILE)) {
    return JSON.parse(fs.readFileSync(CONNECTIONS_FILE, 'utf8'));
  }
  return {};
}

// Construir conexiones
function buildConnections(nodes, specialConnections) {
  const connections = {};
  
  // Ordenar nodos por posición X para determinar el flujo principal
  const sortedNodes = [...nodes].sort((a, b) => a.position[0] - b.position[0]);
  
  // Aplicar conexiones especiales primero
  for (const [sourceName, specialOutputs] of Object.entries(specialConnections)) {
    connections[sourceName] = specialOutputs;
  }
  
  // Construir flujo principal secuencial para nodos sin conexión especial
  sortedNodes.forEach((node, index) => {
    if (connections[node.name]) {
      // Ya tiene conexión especial definida
      return;
    }
    
    if (index < sortedNodes.length - 1) {
      // Conectar al siguiente nodo en la secuencia
      connections[node.name] = {
        main: [
          [
            {
              node: sortedNodes[index + 1].name,
              type: 'main',
              index: 0
            }
          ]
        ]
      };
    } else {
      // Último nodo - sin salida
      connections[node.name] = {
        main: [
          []
        ]
      };
    }
  });
  
  return connections;
}

// Construir el workflow completo
function buildWorkflow() {
  const nodes = loadNodes();
  const specialConnections = loadSpecialConnections();
  
  console.log(`📦 Encontrados ${nodes.length} nodos:`);
  nodes.forEach(n => console.log(`   - ${n.name}`));
  
  if (Object.keys(specialConnections).length > 0) {
    console.log(`\n🔗 Conexiones especiales:`);
    for (const [source, outputs] of Object.entries(specialConnections)) {
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
