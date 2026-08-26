# 🚀 Cómo Iniciar FinanBlue

## Requisitos Previos

Asegúrate de tener instalado:
- **Node.js** 18+ (recomendado 20 LTS)
- **npm** (viene con Node.js)

Para verificar:
```bash
node --version
npm --version
```

## Pasos para Ejecutar

### 1. Instalar Dependencias

```bash
npm install
```

Esto instalará todas las dependencias necesarias en la carpeta `node_modules/`.

### 2. Iniciar Servidor de Desarrollo

```bash
npm run dev
```

Verás algo como:
```
  VITE v8.2.2  ready in XXX ms
  ➜  Local:   http://localhost:5173/
```

Abre tu navegador en: **http://localhost:5173/**

### 3. Usar la Aplicación

La app cargará con datos de ejemplo:
- 6 ingresos y gastos anteriores
- 6 presupuestos
- 4 metas de ahorro
- 14 categorías predefinidas

**Prueba lo siguiente:**
1. Registra un nuevo movimiento (Dashboard → Nuevo movimiento)
2. Crea un presupuesto (Presupuestos → Nuevo presupuesto)
3. Añade una meta (Metas → Nueva meta)
4. Analiza los gráficos (Estadísticas)
5. Explora todas las secciones

## Compilar para Producción

Para crear una versión optimizada para desplegar:

```bash
npm run build
```

Esto generará:
- Archivos optimizados en carpeta `dist/`
- JavaScript minificado
- CSS compilado
- Assets optimizadas

Puedes previsualizar el build:
```bash
npm run preview
```

## Estructura de Carpetas

```
finanblue/
├── src/
│   ├── components/        # Componentes React
│   ├── pages/            # Páginas (Dashboard, Transacciones, etc.)
│   ├── context/          # AppContext (estado global)
│   ├── services/         # Servicios (localStorage)
│   ├── utils/            # Funciones auxiliares
│   ├── types/            # Tipos TypeScript
│   ├── data/             # Datos mock
│   ├── App.tsx           # Componente principal
│   └── main.tsx          # Punto de entrada
├── index.html            # HTML principal
├── tailwind.config.js    # Configuración Tailwind
├── tsconfig.json         # Configuración TypeScript
├── vite.config.ts        # Configuración Vite
└── package.json          # Dependencias
```

## Datos Locales

Todos tus datos se guardan en el navegador:
- Abre las DevTools (F12)
- Ve a Storage → LocalStorage → http://localhost:5173
- Verás las claves: `finanblue_transactions`, `finanblue_budgets`, etc.

**Para limpiar datos:** Borra LocalStorage en DevTools

## Características Principales

### Dashboard
- Resumen de finanzas
- Gráficos interactivos
- Últimos movimientos
- Metas de ahorro

### Movimientos
- Crear ingreso/gasto
- Editar movimientos
- Eliminar movimientos
- Buscar y filtrar

### Estadísticas
- Gráficos de ingresos vs gastos
- Gastos por categoría
- Análisis de métodos de pago
- Histórico de 3/6/12 meses

### Presupuestos
- Crear presupuestos
- Monitorear progreso
- Alertas automáticas
- Editar/eliminar

### Metas
- Crear metas de ahorro
- Seguimiento visual
- Alertas de plazo
- Cálculo automático

### Categorías
- Ver todas las categorías
- Clasificadas por tipo
- 14 categorías predefinidas

### Perfil
- Información personal
- Objetivos mensuales
- Información de privacidad

## Navegación

**Desktop:**
- Sidebar izquierdo con menú completo

**Mobile:**
- Menú inferior (Bottom Navigation)
- Botón + destacado para nuevo movimiento
- Navegación intuitiva

## Moneda

Toda la aplicación utiliza: **Soles Peruanos (S/)**

Formato: `S/ 1,234.56`

## Solución de Problemas

### Puerto 5173 en uso
Si el puerto 5173 está ocupado:
```bash
npm run dev -- --port 3000
```

### Cache problemático
Limpia el caché:
```bash
rm -r node_modules
npm install
npm run dev
```

### Build fallido
Verifica TypeScript:
```bash
npm run lint
```

## Notas Importantes

1. **100% Privacidad**: Todos los datos se guardan localmente
2. **Sin Conexión**: Funciona completamente offline
3. **Sin Registro**: No necesitas crear cuenta
4. **Sin Publicidad**: Experiencia limpia
5. **Open Source**: Código disponible

## Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor dev

# Producción
npm run build        # Compila para producción
npm run preview      # Previsualiza build

# Linting
npm run lint         # Verifica errores de código
```

## Próximos Pasos

1. Explora todas las secciones
2. Registra tus propios movimientos
3. Crea presupuestos reales
4. Define tus metas
5. Analiza tus patrones de gasto

## Soporte

Para dudas o reportar bugs:
- 📧 Email: contacto@finanblue.com
- 🐙 GitHub: github.com/finanblue

---

**¡Disfrutá de FinanBlue!** 💰✨
