/**
 * SST Content Workflow Builder
 * 
 * Genera workflow.json copiando la estructura EXACTA de SST Content.json
 * y reemplazando solo los nodos y conexiones con los valores actuales.
 * 
 * Esto asegura que el output sea byte-for-byte idéntico al original
 * (excepto por los campos que deben cambiar como versionId, id, etc)
 * 
 * Uso: node build.js
 */

const fs = require('fs');
const path = require('path');

const NODES_DIR = path.join(__dirname, 'nodes');
const CONNECTIONS_FILE = path.join(__dirname, 'connections.json');
const OUTPUT_FILE = path.join(__dirname, 'workflow.json');
const ORIGINAL_FILE = path.join(__dirname, 'SST Content.json');

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
    return JSON.parse(fs.readFileSync(path.join(NODES_DIR, file), 'utf8'));
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
  
  // Construir mapa de nodos por nombre
  const nodeMap = {};
  nodes.forEach(n => nodeMap[n.name] = n);
  
  // Construir conexiones del flujo principal
  for (let i = 0; i < mainFlow.length; i++) {
    const nodeName = mainFlow[i];
    if (nodeMap[nodeName]) {
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
      }
      // Si es el último nodo, NO agregar entrada en connections (como en el original)
    }
  }
  
  // Agregar conexiones especiales (sub-nodos)
  for (const [sourceName, outputs] of Object.entries(specialConnections)) {
    if (sourceName === '_main') continue;
    connections[sourceName] = outputs;
  }
  
  return connections;
}

// Construir el workflow copiando estructura del original
function buildWorkflow() {
  // Cargar template original
  const original = JSON.parse(fs.readFileSync(ORIGINAL_FILE, 'utf8'));
  
  // Cargar nodos y conexiones
  const nodes = loadNodes();
  const specialConnections = loadSpecialConnections();
  const connections = buildConnections(nodes, specialConnections);
  
  console.log(`📦 Encontrados ${nodes.length} nodos:`);
  nodes.forEach(n => console.log(`   - ${n.name}`));
  
  // Crear mapa de nodos originales por nombre
  const originalNodesMap = {};
  original.nodes.forEach(n => originalNodesMap[n.name] = n);
  
  // Reemplazar nodos preservando el orden y estructura original
  const newNodes = [];
  nodes.forEach(newNode => {
    const orig = originalNodesMap[newNode.name];
    if (orig) {
      // Copiar el nodo original pero con los parameters actualizados
      newNodes.push({
        ...orig,
        parameters: newNode.parameters,
        credentials: newNode.credentials
      });
    }
  });
  
  // Reconstruir conexiones preservando estructura original
  // Obtener las keys originales y el orden
  const originalConnKeys = Object.keys(original.connections);
  const finalConnections = {};
  
  originalConnKeys.forEach(key => {
    if (connections[key]) {
      finalConnections[key] = connections[key];
    }
  });
  
  // Agregar cualquier conexión extra
  Object.keys(connections).forEach(key => {
    if (!finalConnections[key]) {
      finalConnections[key] = connections[key];
    }
  });
  
  // Copiar estructura exacta del original
  const workflow = {
    ...original,
    nodes: newNodes,
    connections: finalConnections,
    versionId: Date.now().toString(),
    id: "sst-content-modular"
  };
  
  // Guardar
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(workflow, null, 2));
  console.log(`\n✅ Workflow generado: ${OUTPUT_FILE}`);
  console.log(`📝 ${newNodes.length} nodos | ${Object.keys(finalConnections).length} conexiones`);
}

// Ejecutar
buildWorkflow();
