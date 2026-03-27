require('dotenv').config();
const axios = require('axios');

const N8N_BASE_URL = process.env.N8N_BASE_URL || 'http://localhost:5678';
const API_KEY = process.env.N8N_API_KEY;

if (!API_KEY) {
  console.error('Error: N8N_API_KEY not set in .env file');
  process.exit(1);
}

async function listWorkflows() {
  try {
    const response = await axios.get(`${N8N_BASE_URL}/api/v1/workflows`, {
      headers: {
        'X-N8N-API-KEY': API_KEY
      }
    });
    
    console.log('Workflows en n8n:');
    response.data.data.forEach(workflow => {
      console.log(`- ID: ${workflow.id}, Name: ${workflow.name}, Active: ${workflow.active}`);
    });
  } catch (error) {
    console.error('Error al listar workflows:', error.response ? error.response.data : error.message);
    process.exit(1);
  }
}

listWorkflows();
