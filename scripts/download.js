require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const N8N_BASE_URL = process.env.N8N_BASE_URL || 'http://localhost:5678';
const API_KEY = process.env.N8N_API_KEY;
const WORKFLOW_ID = process.env.WORKFLOW_ID; // Optional: specific workflow ID to download

if (!API_KEY) {
  console.error('Error: N8N_API_KEY not set in .env file');
  process.exit(1);
}

// Create directories if they don't exist
const workflowsDir = path.join(__dirname, '..', 'workflows');
if (!fs.existsSync(workflowsDir)) {
  fs.mkdirSync(workflowsDir, { recursive: true });
}

async function downloadWorkflow(workflowId) {
  try {
    console.log(`Fetching workflow ${workflowId} from ${N8N_BASE_URL}/api/v1/workflows/${workflowId}`);
    const response = await axios.get(`${N8N_BASE_URL}/api/v1/workflows/${workflowId}`, {
      headers: {
        'X-N8N-API-KEY': API_KEY
      }
    });
    
    console.log('Response status:', response.status);
    console.log('Response data keys:', Object.keys(response.data));
    //console.log('Response data:', JSON.stringify(response.data, null, 2));
    
    if (!response.data || !response.data.data) {
      throw new Error('Invalid response format from n8n API: missing data');
    }
    
    const workflow = response.data.data;
    console.log(`Downloading workflow ID: ${workflow.id}, Name: ${workflow.name}`);
    const fileName = `workflow-${workflow.id}-${workflow.name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}.json`;
    const filePath = path.join(workflowsDir, fileName);
    
    fs.writeFileSync(filePath, JSON.stringify(workflow, null, 2));
    console.log(`Workflow descargado exitosamente: ${filePath}`);
    
    // Also save as workflow.json in root for easy access
    const rootPath = path.join(__dirname, '..', 'workflow.json');
    fs.writeFileSync(rootPath, JSON.stringify(workflow, null, 2));
    console.log(`También guardado como: ${rootPath}`);
    
  } catch (error) {
    console.error('Error al descargar workflow:', error.response ? error.response.data : error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      //console.error('Response data:', JSON.stringify(error.response.data, null, 2));
    }
    console.error('Error details:', error.message);
    process.exit(1);
  }
}

async function main() {
  if (WORKFLOW_ID) {
    await downloadWorkflow(WORKFLOW_ID);
  } else {
    // If no specific ID, list workflows and ask user to choose
    try {
       const response = await axios.get(`${N8N_BASE_URL}/api/v1/workflows`, {
         headers: {
           'X-N8N-API-KEY': API_KEY
         }
       });
       
       console.log('Workflows encontrados:', response.data.data.length);
      if (response.data.data.length === 0) {
        console.log('No se encontraron workflows');
        return;
      }
      
      console.log('Workflows disponibles:');
      response.data.data.forEach((w, index) => {
        console.log(`${index + 1}. ID: ${w.id}, Name: ${w.name}`);
      });
      
      // For automation, we'll just download the first one
      // In interactive mode, you'd prompt the user
      const firstWorkflow = response.data.data[0];
      console.log(`\nDescargando el primer workflow: ${firstWorkflow.name}`);
      await downloadWorkflow(firstWorkflow.id);
      
    } catch (error) {
      console.error('Error al listar workflows:', error.response ? error.response.data : error.message);
      process.exit(1);
    }
  }
}

main();
