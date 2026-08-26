# FinanBlue - Gestión de Finanzas Personales 💰

Una aplicación web moderna, responsiva y completamente funcional para gestionar tus finanzas personales. **100% Frontend - Sin backend, sin servidores, sin APIs externas.**

## ✨ Características

### 📊 Dashboard Interactivo
- Resumen de ingresos y gastos
- Gráficos de gastos por categoría
- Estado de presupuestos
- Últimos movimientos
- Metas de ahorro
- Insights financieros automáticos

### 💳 Gestión de Movimientos
- Registra ingresos y gastos
- Edita y elimina movimientos
- Filtra por tipo, categoría, método de pago
- Búsqueda de movimientos
- Historial completo ordenado por fecha

### 📈 Estadísticas Detalladas
- Tendencia de ingresos vs gastos
- Gastos por categoría (gráfico donut)
- Gastos por método de pago
- Análisis de períodos (3, 6, 12 meses)
- Tasa de ahorro
- Comparativas mensuales

### 💰 Presupuestos
- Crea presupuestos por categoría
- Visualiza el progreso vs límite
- Alertas automáticas (50%, 75%, 90%, 100%)
- Edita y elimina presupuestos

### 🎯 Metas de Ahorro
- Define objetivos financieros
- Personaliza con iconos y colores
- Sigue el progreso
- Alertas de plazo
- Cálculo automático de faltante

### 🏷️ Categorías Organizadas
- Categorías predefinidas de gastos e ingresos
- Visualización de todas las categorías
- Identificadores visuales con emojis

### 👤 Perfil de Usuario
- Información personal
- Objetivos mensuales de ingreso y ahorro
- Información de privacidad
- Datos almacenados localmente

## 🛠️ Stack Tecnológico

- **React** 19.2.8 - Librería de UI
- **TypeScript** - Tipado estático
- **Vite** 8.2.2 - Empaquetador y bundler
- **Tailwind CSS** 3.4.1 - Estilos responsivos
- **React Router** 7 - Enrutamiento
- **Recharts** 3.10.1 - Gráficos interactivos
- **Lucide React** 1.34.0 - Iconos
- **date-fns** 4.4.0 - Manipulación de fechas
- **LocalStorage** - Persistencia de datos

## 📱 Diseño Responsivo

La aplicación está optimizada para todos los tamaños de pantalla:

- **Desktop (1440px, 1280px, 1024px)**: Sidebar lateral, multi-columnas
- **Tablet (768px, 820px)**: Adaptación de componentes
- **Mobile (430px, 414px, 390px, 375px)**: Navegación inferior, layout vertical

## 💾 Almacenamiento

Todos los datos se almacenan localmente en el navegador usando **LocalStorage**:

```
finanblue_transactions   - Movimientos
finanblue_budgets        - Presupuestos
finanblue_goals          - Metas
finanblue_categories     - Categorías
finanblue_payment_methods- Métodos de pago
finanblue_profile        - Perfil de usuario
```

**Ventajas:**
- ✅ 100% privacidad - Tus datos nunca salen del navegador
- ✅ Funciona sin conexión a internet
- ✅ Sin dependencia de servidores
- ✅ Sin publicidad
- ✅ Sin registro necesario

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js 18+ (recomendado 20+)
- npm o yarn

### Instalación

```bash
# Clonar o descargar el proyecto
cd finanblue

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El servidor estará disponible en `http://localhost:5173/`

### Build Producción

```bash
npm run build
npm run preview
```

Los archivos optimizados estarán en el directorio `dist/`

## 📊 Datos Mock

La aplicación incluye datos ficticios realistas para demostración:

- **Ingresos**: Sueldo, freelance, inversiones
- **Gastos**: Alimentación, transporte, entretenimiento, etc.
- **Categorías**: 14 categorías predefinidas
- **Métodos de pago**: Efectivo, tarjetas, Yape, Plin, transferencias
- **Presupuestos**: 6 presupuestos iniciales
- **Metas**: 4 metas de ejemplo

Todos los datos pueden ser modificados, editados o eliminados.

## 💡 Insights Inteligentes

La aplicación calcula automáticamente:

- Alertas de presupuesto (50%, 75%, 90%, 100%)
- Tendencias de gasto (comparación mensual)
- Progreso de metas
- Categoría de mayor gasto
- Tasa de ahorro
- Análisis de variación mensual

## 🎨 Identidad Visual

**Paleta de colores azul:**
- Azul principal: #2563EB
- Azul oscuro: #1E3A8A
- Azul claro: #DBEAFE
- Éxito: #16A34A
- Peligro: #DC2626
- Advertencia: #F59E0B

**Diseño minimalista:**
- Cards redondeadas
- Bordes suaves
- Sombras ligeras
- Mucho espacio visual
- Iconos modernosno

## 📱 Navegación

### Desktop
Sidebar lateral fijo con acceso a todas las secciones:
- Dashboard
- Movimientos
- Estadísticas
- Presupuestos
- Metas
- Categorías
- Perfil

### Mobile
Navegación inferior con 5 opciones principales:
- Inicio
- Movimientos
- Nuevo (botón flotante)
- Estadísticas
- Perfil

## 🔄 CRUD Completo

### Movimientos (Transactions)
- ✅ Crear ingreso o gasto
- ✅ Leer historial completo
- ✅ Actualizar movimiento existente
- ✅ Eliminar movimiento

### Presupuestos (Budgets)
- ✅ Crear presupuesto por categoría
- ✅ Ver progreso vs límite
- ✅ Actualizar monto límite
- ✅ Eliminar presupuesto

### Metas (Goals)
- ✅ Crear meta con objetivo
- ✅ Ver progreso
- ✅ Actualizar cantidad ahorrada
- ✅ Eliminar meta

### Categorías (Categories)
- ✅ Visualizar todas las categorías
- Categorías predefinidas no editables (futuras versiones)

## 🎯 Casos de Uso

1. **Tracking de Gastos Diarios**: Registra tus movimientos y ve el resumen en tiempo real
2. **Presupuestación Mensual**: Establece límites de gasto y recibe alertas
3. **Análisis Financiero**: Comprende en qué gastas tu dinero
4. **Metas de Ahorro**: Define objetivos y monitorea el progreso
5. **Comparativas Mensuales**: Analiza tendencias a lo largo del tiempo

## 🔐 Privacidad y Seguridad

- ✅ Todos los datos se almacenan localmente
- ✅ No hay envío de datos a servidores
- ✅ No hay cookies de rastreo
- ✅ No hay publicidad
- ✅ Sin registro de usuario necesario
- ✅ Código abierto y transparente

## 📝 Estructura del Proyecto

```
src/
├── components/
│   ├── layout/          # Sidebar, BottomNav, TopBar
│   ├── shared/          # Componentes reutilizables
│   └── transactions/    # Formulario de movimientos
├── pages/               # Páginas principales
├── context/             # AppContext para estado global
├── services/            # Servicios de LocalStorage
├── utils/               # Utilidades (formatters, insights)
├── types/               # Tipos TypeScript
├── data/                # Datos mock
└── assets/              # Imágenes y recursos
```

## 🚀 Mejoras Futuras

- [ ] Sincronización en la nube (opcional)
- [ ] Autenticación de usuario
- [ ] Exportación de datos (CSV, PDF)
- [ ] Categorías personalizadas
- [ ] Más gráficos y reportes
- [ ] Notificaciones push
- [ ] App móvil nativa

## 📞 Soporte

Para más información o sugerencias:
- 📧 Email: contacto@finanblue.com
- 🐙 GitHub: github.com/finanblue
- 💻 Sitio web: finanblue.com

## 📄 Licencia

MIT - Libre para uso personal y comercial

## 👨‍💻 Desarrollado con ❤️

FinanBlue - La forma simple de gestionar tus finanzas personales sin complicaciones.

---

**Versión**: 1.0.0  
**Última actualización**: Agosto 2026  
**Estado**: Producción
