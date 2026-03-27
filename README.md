# N8N Workflows - SST México

Colección de workflows n8n para automatización de contenido y soporte.

## Workflows

### 1. SST Content (`workflows/sst-content.json`)
Generación automática de contenido para redes sociales con investigación web real.

```
Trigger Cron (11:20)
    ↓
Seleccionar Nicho (10 nichos rotativos)
    ↓
🔍 Search Google (investigación real via SearchAPI)
    ↓
AI Agent (GPT-5-mini + datos de búsqueda)
    ↓
Generate Image (Gemini 2.5 Flash)
    ↓
📱 Telegram (chat personal + grupo)
```

**Nichos:** restaurantes, gimnasios, abogados, contadores, clínicas, agencias marketing, tiendas online, bienes raíces, consultorios dentales, autolavados.

**ID en n8n:** `5nYQQqoUnHvKlnL0`

### 2. FAQ's (`workflows/faqs.json`)
Chatbot de soporte via WhatsApp para cotizaciones y atención al cliente.

```
WhatsApp Trigger
    ↓
AI Agent (SST México Support)
    ↓
Window Buffer Memory
    ↓
WhatsApp Send Message
```

**ID en n8n:** `llUinMjQxIejMY8S`

## Comandos

```bash
npm install              # Instalar dependencias
npm run workflow:list    # Lista workflows en n8n
npm run workflow:download # Descarga workflow específico
```

## Estructura

```
n8n-workflows/
├── workflows/
│   ├── sst-content.json   # Workflow de contenido
│   └── faqs.json           # Workflow de FAQs
├── scripts/
│   ├── list.js             # Lista workflows
│   ├── download.js         # Descarga workflow
│   └── init.js             # Inicialización
├── .env.example            # Variables de entorno
├── package.json
└── README.md
```

## Configuración

1. Copia `.env.example` a `.env`
2. Configura las variables:
   - `N8N_API_KEY`: API key de n8n
   - `N8N_BASE_URL`: URL de n8n (ej: https://tu-ngrok.ngrok-free.app)

### Obtener API Key de n8n

1. Ve a **Settings** → **API**
2. Genera una nueva API Key
3. Usa el header `X-N8N-API-KEY` para autenticación

## Credenciales n8n

| Servicio | Propósito |
|----------|-----------|
| OpenAI | AI Agent |
| SearchAPI | Búsquedas web |
| Google Gemini | Generación de imágenes |
| WhatsApp Business | Envío de mensajes |
| Telegram | Notificaciones |

## Sincronización con n8n

| Workflow | ID Remoto | Local |
|----------|-----------|-------|
| SST Content | `5nYQQqoUnHvKlnL0` | `workflows/sst-content.json` |
| FAQ's | `llUinMjQxIejMY8S` | `workflows/faqs.json` |

---

**Autor:** SST México  
**Licencia:** MIT
