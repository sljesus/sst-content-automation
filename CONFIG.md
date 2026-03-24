# SST Content Automation - Configuración

## Instagram Connection

### IDs de conexión (actualizado: 24/03/2026)

| Campo | Valor |
|-------|-------|
| Facebook Page ID | `570854946114514` |
| Instagram Account ID | `17841468671909344` |
| Business ID | `2499855483687723` |
| Instagram Username | `@sst.mexico` |

### Cómo obtener estos IDs

**Page ID (Facebook):**
1. Ir a [business.facebook.com](https://business.facebook.com) → Business Settings
2. All Pages → Click en "SST México"
3. Mirar la URL: `asset_id=XXXXXXXXX` → ese número es el Page ID

**Instagram Account ID:**
```
GET /{page-id}?fields=instagram_business_account
```
Reemplazar `{page-id}` con el Page ID de arriba.

### Permisos disponibles en System User

**Para publicar en Instagram + Facebook + Threads:**

```
instagram_basic              # Leer info de Instagram
instagram_content_publish    # PUBLICAR en Instagram (CRÍTICO)
instagram_manage_messages   # Responder mensajes
instagram_manage_comments   # Gestionar comentarios
instagram_manage_insights   # Ver estadísticas
pages_show_list             # Listar páginas
pages_read_engagement       # Leer engagement de páginas
pages_manage_posts          # Crear/editar publicaciones en FB
pages_manage_engagement     # Gestionar comentarios en FB
business_management         # Gestión del Business Manager
publish_video               # Publicar videos
threads_business_basic      # Threads (básico)
```

**Permisos mínimos para publicar solo en Instagram:**
- `instagram_basic`
- `instagram_content_publish`
- `pages_show_list`

**Permisos completos (FB + IG + Threads):**
- `instagram_basic`
- `instagram_content_publish`
- `instagram_manage_messages`
- `instagram_manage_comments`
- `instagram_manage_insights`
- `pages_show_list`
- `pages_read_engagement`
- `pages_manage_posts`
- `pages_manage_engagement`
- `business_management`
- `threads_business_basic`

### Cómo generar token desde System User

1. Business Settings → System Users → "Desarrollo AI Labs"
2. Click en "Generar token de acceso"
3. Seleccionar app: **n8n_SST_Publish**
4. Seleccionar página: **SST México**
5. Elegir permisos de arriba
6. Seleccionar expiración: **60 días** (recomendado)
7. Copiar el token

### Workflows n8n

| Workflow ID | Nombre | Estado |
|-------------|--------|--------|
| `5nYQQqoUnHvKlnL0` | SST Content | ✅ Activo |
| `Dknq0HhnWUyNl7TU` | SST Publish | 🔲 Pendiente setup |

### Notas
- El token expira frecuentemente → regenerar desde System User
- Para publicar, la cuenta de Instagram debe estar conectada a una Facebook Page
- SST México tiene la página conectada en el portfolio del Business Manager
- El System User "Desarrollo AI Labs" tiene acceso total a la página y a la cuenta de Instagram