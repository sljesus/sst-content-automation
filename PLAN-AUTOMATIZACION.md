# Plan de Automatización de Generación de Demanda - SST México

## 🎯 Objetivo
Automatizar la generación de leads calificados para SST México mediante contenido de video con IA.

---

## 📊 Roadmap de Implementación

### Fase 1: Generación de Contenido (MES 1) ✅ EN DESARROLLO
- [ ] Configurar VEO3 (Google AI)
- [ ] Configurar Buffer (plan gratuito)
- [ ] Crear workflow básico de generación de scripts
- [ ] Publicación orgánica automática

### Fase 2: Clasificación de Leads (MES 2)
- [ ] Integrar WhatsApp Business Cloud
- [ ] Crear agente IA de calificación
- [ ] Notificaciones a Sergio
- [ ] Guardado en Supabase

### Fase 3: Pauta Automatizada (MES 3)
- [ ] Conectar Meta Business API
- [ ] Integrar Google Ads API
- [ ] IA para seleccionar qué pauta

### Fase 4: Optimización (MES 4+)
- [ ] Analytics y métricas
- [ ] A/B testing de contenido
- [ ] Scoring de leads optimizado
- [ ] Nurturing automatizado

---

## 🔧 Stack Tecnológico

### Actual
| Herramienta | Uso | Costo |
|------------|-----|-------|
| n8n | Orquestación de workflows | $0 (self-hosted) |
| VEO3 (Google AI) | Generación de videos | $0-20/mes |
| Buffer | Programación de posts | $0 (3 canales) |
| Telegram | Notificaciones | $0 |
| Supabase | Base de datos | $0 (tier gratuito) |

### Futuro
| Herramienta | Uso | Costo estimado |
|------------|-----|---------------|
| Meta Business API | Pauta automatizada | $0 + presupuesto ads |
| Google Ads API | Pauta Google | $0 + presupuesto ads |
| OpenAI GPT-4 | Agente IA avanzado | $20/mes |

---

## 📱 Workflows por Construir

### Workflow 1: Generación de Contenido (Básico)
```
Schedule/Manual Trigger
        ↓
Seleccionar tema aleatorio
        ↓
AI genera script (30-60s)
        ↓
[Modo REVIEW]
  → Enviar a Telegram
  → Aprobación
        ↓
VEO3 genera video
        ↓
Buffer API → Publicar
        ↓
Google Sheets (logging)
```

### Workflow 2: Clasificación de Leads
```
WhatsApp mensaje entrante
        ↓
AI Agent (preguntas discovery)
        ↓
Extraer datos
        ↓
Scoring (HOT/WARM/COLD)
        ↓
├── HOT → Cotizador + Notificar Sergio
├── WARM → Supabase + Nurturing
└── COLD → Guardar + Educar
```

### Workflow 3: Pauta Automatizada
```
Video publicado exitoso
        ↓
IA evalúa performance
        ↓
Sugiere: "Este video para pauta"
        ↓
Aprobación (Telegram)
        ↓
Meta Ads API → Crear campaña
        ↓
Reportar resultados
```

---

## 📋 Temas para Contenido (3 Pilares)

### Pilar 1: PROBLEMA (Genera consciencia)
- "Tu restaurant pierde clientes sin app"
- "Empleado quemado por WhatsApp 24/7"
- "Tu competencia ya digitalizó"
- "Procesos manuales que cuestan tiempo y dinero"

### Pilar 2: SOLUCIÓN (Genera interés)
- "Agente IA que trabaja 24/7 sin descanso"
- "Cómo digitalizar en 4 meses"
- "Automatizaciones que ahorran 70% de costos"
- "Apps que venden por ti"

### Pilar 3: PRUEBA SOCIAL (Genera urgencia)
- "Caso real: +180% ventas en 6 meses"
- "Ya tenemos 50+ apps publicadas"
- "Reseñas de clientes satisfechos"
- "Proceso transparente de desarrollo"

---

## 💰 Estimación de Costos

### Mínimo (Fase 1)
- Google AI Studio: $5-20/mes (según uso de VEO3)
- Buffer: $0 (gratis)
- n8n: $0 (self-hosted)
- **Total: $5-20/mes**

### Básico + WhatsApp (Fase 2)
- WhatsApp Business API: ~$0.05/mensaje (opcional)
- Supabase: $0 (gratis tier)
- **Total adicional: $0-50/mes**

### Completo con Pauta (Fase 3)
- Meta Ads: Lo que quieras gastar en publicidad
- Google Ads: Lo que quieras gastar
- **Total adicional: Variable según presupuesto**

---

## 📈 Métricas a Rastrear

### Contenido
- Videos generados/semana
- Alcance orgánico
- Engagement (likes, comentarios, shares)
- Clics al link (sstmexico.com)
- Conversiones a WhatsApp

### Leads
- Leads capturados/mes
- % HOT vs WARM vs COLD
- Tiempo promedio de respuesta
- Leads que llegan a cotización
- Tasa de cierre

### Pauta (Futuro)
- Costo por lead (CPL)
- Retorno sobre inversión publicitaria (ROAS)
- Video con mejor performance

---

## 👥 Equipo

| Rol | Persona | Responsabilidad |
|-----|---------|----------------|
| Desarrollo | Jesús Salazar | Workflows n8n, integraciones |
| Marketing | Sergio Salazar | Contenido, aprobación, seguimiento |
| CTO | Fernando Chavez | Arquitectura, decisiones técnicas |

---

## 📅 Checklist de Inicio

### Esta semana
- [ ] Obtener Google AI API Key
- [ ] Crear cuenta Buffer (plan gratuito)
- [ ] Configurar Telegram Bot
- [ ] Crear primer workflow básico

### Próxima semana
- [ ] Probar generación de 3 scripts
- [ ] Integrar VEO3
- [ ] Publicar primer video

### Mes 1
- [ ] 5-10 videos publicados
- [ ] Workflow de clasificación de leads
- [ ] Dashboard básico de métricas

---

## 🔗 Links Importantes

- n8n: http://localhost:5678
- API n8n: http://localhost:5678/api/v1
- SST México: https://sstmexico.com
- Cotizador: http://precioapp.sstmexico.com
- Google AI Studio: https://aistudio.google.com
- Buffer: https://buffer.com

---

*Documento creado: 2026-03-19*
*Última actualización: 2026-03-19*
