# MCP Server Configuration

Este directorio contiene las configuraciones para los servidores MCP que conectan este proyecto con Figma.

> **NOTA**: Las opciones aquí NO requieren Figma Dev Mode (plan Professional/Enterprise).
> Solo necesitas una cuenta Figma gratuita y un Personal Access Token.

## Obtener Figma API Token (Gratis)

1. Ve a [Figma Settings](https://www.figma.com/settings)
2. Scroll a "Personal access tokens"
3. Click "Generate new token"
4. Copia y guarda el token de forma segura

## Servidores Disponibles

### 1. Framelink Figma MCP (Recomendado - Lectura)

Servidor optimizado para AI que simplifica las respuestas de la API de Figma.

**Ventajas:**
- No requiere Dev Mode
- Respuestas optimizadas para LLMs
- Fácil configuración

**Configuración en Cursor:**

```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": [
        "-y",
        "figma-developer-mcp",
        "--figma-api-key=YOUR_FIGMA_TOKEN",
        "--stdio"
      ]
    }
  }
}
```

**Configuración en Claude Code:**

Crear archivo `~/.claude/mcp.json`:
```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": [
        "-y",
        "figma-developer-mcp",
        "--figma-api-key=YOUR_FIGMA_TOKEN",
        "--stdio"
      ]
    }
  }
}
```

**Uso:**
1. Copia el link de un frame en Figma (Right click → Copy link)
2. En Cursor/Claude Code: "Implementa este diseño: [link]"

---

### 2. Talk to Figma MCP (Bidireccional - Lectura/Escritura)

Permite crear y modificar diseños en Figma directamente desde el IDE.

**Ventajas:**
- Bidireccional (leer Y escribir)
- No requiere Dev Mode
- Open source

**Instalación:**

```bash
# Clonar repositorio
git clone https://github.com/sonnylazuardi/cursor-talk-to-figma-mcp
cd cursor-talk-to-figma-mcp

# Instalar y build
npm install
npm run build
```

**Configuración:**

1. Instala el plugin de Figma: [Cursor Talk to Figma](https://www.figma.com/community/plugin/XXX)

2. Configura en Cursor/Claude Code:
```json
{
  "mcpServers": {
    "talk-to-figma": {
      "command": "node",
      "args": ["/path/to/cursor-talk-to-figma-mcp/dist/index.js"],
      "env": {
        "FIGMA_API_KEY": "YOUR_FIGMA_TOKEN"
      }
    }
  }
}
```

**Uso:**
```
# Leer diseño
"Analiza la estructura del frame en este link: [figma-link]"

# Crear componente en Figma
"Crea un botón primary con variantes hover y disabled en mi archivo de Figma"

# Modificar diseño
"Cambia el color del botón primary a #3B82F6"
```

---

### 3. Figma REST API (Sin MCP - Alternativa simple)

Si no quieres usar MCP, puedes usar la API de Figma directamente.

**Script de ejemplo:**

```javascript
// scripts/figma-fetch.js
const FIGMA_TOKEN = process.env.FIGMA_API_TOKEN;
const FILE_KEY = 'YOUR_FILE_KEY'; // De la URL del archivo

async function getFigmaFile() {
  const response = await fetch(
    `https://api.figma.com/v1/files/${FILE_KEY}`,
    {
      headers: {
        'X-Figma-Token': FIGMA_TOKEN
      }
    }
  );
  return response.json();
}

async function getVariables() {
  const response = await fetch(
    `https://api.figma.com/v1/files/${FILE_KEY}/variables/local`,
    {
      headers: {
        'X-Figma-Token': FIGMA_TOKEN
      }
    }
  );
  return response.json();
}
```

---

## Flujo Recomendado (Sin Dev Mode)

```
┌─────────────────────────────────────────────────────────────────┐
│                    FLUJO SIN DEV MODE                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   FIGMA (cuenta gratuita)                                       │
│     │                                                           │
│     ├──► Tokens Studio ──────► GitHub (sync automático)         │
│     │                              │                            │
│     │                              ▼                            │
│     │                         tokens/*.json                     │
│     │                              │                            │
│     │                              ▼                            │
│     │                      Style Dictionary                     │
│     │                              │                            │
│     │                              ▼                            │
│     │                    Tailwind + CSS Vars                    │
│     │                              │                            │
│     │                              ▼                            │
│     │                         Storybook                         │
│     │                                                           │
│     ├──► Framelink MCP ◄───── Claude Code (leer diseños)       │
│     │                                                           │
│     └──► Talk to Figma MCP ◄─ Claude Code (crear/modificar)    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Tokens Studio (Sincronización Figma ↔ GitHub)

Esta es la forma más robusta de sincronizar tokens sin Dev Mode.

### Configuración:

1. Instala [Tokens Studio](https://www.figma.com/community/plugin/843461159747178978) en Figma

2. En Tokens Studio → Settings → Sync:
   - Provider: GitHub
   - Repository: tu-usuario/design-system-pipeline
   - Branch: main
   - File path: tokens

3. Cada vez que guardes tokens en Figma, se sincronizarán a GitHub

4. GitHub Actions rebuildeará automáticamente los tokens

---

## Configuración para este Proyecto

### Archivo de configuración MCP local

Crear `.mcp/config.json`:

```json
{
  "servers": {
    "framelink": {
      "enabled": true,
      "command": "npx",
      "args": ["-y", "figma-developer-mcp", "--stdio"],
      "env": {
        "FIGMA_API_KEY": "${FIGMA_API_TOKEN}"
      }
    },
    "talk-to-figma": {
      "enabled": false,
      "command": "node",
      "args": ["./node_modules/cursor-talk-to-figma-mcp/dist/index.js"],
      "env": {
        "FIGMA_API_KEY": "${FIGMA_API_TOKEN}"
      }
    }
  }
}
```

### Variables de entorno

Crear `.env.local` (no commitear):

```bash
FIGMA_API_TOKEN=figd_xxxxxxxxxxxxxxxxxxxxx
```

---

## Prompts Útiles

### Leer y analizar diseño
```
Analiza el diseño en este link de Figma y describe:
- Estructura de componentes
- Colores utilizados
- Espaciados
[link-figma]
```

### Generar componente desde diseño
```
Genera un componente React con Tailwind basado en este diseño:
[link-figma]

Requisitos:
- Usa los tokens de nuestro design system
- Incluye variantes para los estados visibles
- Añade TypeScript types
```

### Crear en Figma (con Talk to Figma)
```
En mi archivo de Figma, crea un nuevo componente Card con:
- Padding de 24px
- Border radius de 8px
- Sombra sutil
- Variantes: default, elevated, outlined
```

### Actualizar tokens
```
Basándote en el nuevo color primary #6366F1 que veo en Figma:
1. Actualiza tokens/semantic/colors.json
2. Regenera los archivos de estilo
3. Verifica que el Button use el nuevo color
```

---

## Troubleshooting

### "API rate limit exceeded"
- Figma tiene límites de API. Espera unos minutos.
- Considera cachear respuestas frecuentes.

### "Invalid token"
- Verifica que el token no haya expirado
- Regenera un nuevo token en Figma Settings

### "File not found"
- Verifica que el file key sea correcto
- Asegúrate de tener acceso al archivo en Figma

### "MCP connection failed"
- Verifica que npx funciona: `npx -y figma-developer-mcp --help`
- Reinicia Cursor/Claude Code después de cambiar config
