# GitLab CI/CD Pipeline - Statamic Boilerplate

## Resumen

El proyecto utiliza un pipeline de GitLab CI/CD con **7 stages** que automatizan el proceso de auditoría, análisis, testing, compilación, despliegue y verificación del sitio.

---

## Stages

### 1. Audit - Auditoría de Seguridad

Verifica vulnerabilidades en las dependencias del proyecto.

| Job | Descripción | Branches |
|-----|-------------|----------|
| `audit-npm` | Ejecuta `npm audit` para detectar vulnerabilidades en paquetes npm (nivel high) | develop, preview, tags, update, renovate/* |
| `audit-composer` | Ejecuta `composer audit` para detectar vulnerabilidades en paquetes PHP | develop, preview, tags, update, renovate/* |

---

### 2. Static - Análisis Estático de Código

Analiza la calidad del código sin ejecutarlo. Solo se ejecuta en **merge requests**.

| Job | Herramienta | Descripción |
|-----|-------------|-------------|
| `static-eslint` | ESLint | Linter para archivos JavaScript y Vue.js |
| `static-phpcs` | PHP CodeSniffer | Verifica estándares de estilo de código PHP |
| `static-phpmd` | PHP Mess Detector | Detecta código problemático, complejidad excesiva, variables no usadas |
| `static-phpstan` | PHPStan | Análisis estático avanzado de PHP (errores de tipos, bugs potenciales) |

---

### 3. Test - Tests Automatizados

Ejecuta los tests del proyecto.

| Job | Descripción | Branches |
|-----|-------------|----------|
| `test-phpunit` | Ejecuta tests unitarios con PHPUnit. Genera reporte de cobertura de código en formato Cobertura | master, develop, preview, update, renovate/*, merge_requests |

---

### 4. Build - Compilación de Assets

Compila los assets frontend del proyecto.

| Job | Descripción | Branches |
|-----|-------------|----------|
| `build-npm` | Ejecuta `npm run production` para compilar CSS/JS. Los artefactos se guardan por 10 minutos | develop, preview, tags, update, renovate/* |

**Artefactos generados:**
- `public/build/`
- `public/vendor/`
- `public/build/manifest.json`

---

### 5. Deploy - Despliegue

Despliega el proyecto a diferentes entornos según la rama o tag.

| Job | Branch/Tag | Entorno | Descripción |
|-----|------------|---------|-------------|
| `deploy-develop` | develop | staging | Despliegue al servidor de staging |
| `deploy-preview` | preview | preview | Despliegue al servidor de preview |
| `deploy-update` | update, renovate/* | update | Despliegue para actualizaciones de dependencias |
| `deploy-production` | tags | production | Despliegue a producción (solo con tags) |

---

### 6. Accessibility

Stage reservado para tests de accesibilidad. Actualmente sin jobs específicos asignados a este stage.

---

### 7. Health - Verificaciones Post-Deploy

Verifica que el sitio funciona correctamente después del despliegue.

#### Health Checks
| Job | Descripción |
|-----|-------------|
| `health-check-develop` | Verifica que el sitio de staging responde |
| `health-check-preview` | Verifica que el sitio de preview responde |
| `health-check-update` | Verifica que el sitio de update responde |
| `health-check-production` | Verifica que el sitio de producción responde |

#### Pa11y - Tests de Accesibilidad
| Job | Descripción |
|-----|-------------|
| `pa11y-check-*` | Ejecuta tests de accesibilidad WCAG usando el sitemap del sitio |

#### Lighthouse - Auditoría de Rendimiento
| Job | Descripción |
|-----|-------------|
| `lighthouse-performance` | Audita rendimiento, accesibilidad, mejores prácticas, SEO y PWA. Reporta a servidor Lighthouse |

#### Cookie Analysis
| Job | Descripción |
|-----|-------------|
| `cookie-analysis` | Analiza las cookies del sitio y reporta a Mattermost |

---

## Flujo del Pipeline

```
┌─────────┐   ┌────────┐   ┌──────┐   ┌───────┐   ┌────────┐   ┌────────┐
│  Audit  │ → │ Static │ → │ Test │ → │ Build │ → │ Deploy │ → │ Health │
└─────────┘   └────────┘   └──────┘   └───────┘   └────────┘   └────────┘
```

---

## Variables Requeridas

Para que el pipeline funcione correctamente, se necesitan las siguientes variables en GitLab CI/CD:

| Variable | Descripción |
|----------|-------------|
| `LAB_DEPLOY_USER` | Usuario SSH para despliegue |
| `LAB_DEPLOY_KEY` | Clave privada de despliegue |
| `LAB_DEPLOY_ROOT` | Directorio raíz de despliegue |
| `LAB_PHP_VERSION` | Versión de PHP del servidor |
| `GITLAB_ACCESS_TOKEN` | Token para acceder a repositorios privados |
| `LHCI_TOKEN` | Token para Lighthouse CI |
| `MATTERMOST_WEBHOOK_URL` | Webhook para notificaciones |

---

## Entornos

| Entorno | Descripción |
|---------|-------------|
| staging | Servidor de desarrollo/staging |
| preview | Servidor de preview para clientes |
| update | Servidor para probar actualizaciones |
| production | Servidor de producción |
