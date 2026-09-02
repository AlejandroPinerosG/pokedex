# Pokédex 🎮

Una aplicación web interactiva de Pokédex desarrollada con Vue 3, TypeScript y Vite. Explora información detallada sobre Pokémon, gestiona tus favoritos y filtra por tipos.

![Vue 3](https://img.shields.io/badge/Vue-3.5.13-4FC08D?style=flat-square&logo=vue.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.4.3-646CFF?style=flat-square&logo=vite)
![License](https://img.shields.io/badge/license-ISC-green?style=flat-square)

## ✨ Características

- **Catálogo Pokémon**: Explora una lista paginada de todos los Pokémon
- **Detalles Completos**: Visualiza información detallada de cada Pokémon (stats, tipo, debilidades, habilidades)
- **Sistema de Favoritos**: Marca tus Pokémon favoritos y accede a ellos fácilmente
- **Filtrado por Tipos**: Filtra Pokémon por tipo (Fuego, Agua, Planta, etc.)
- **Diseño Responsivo**: Interfaz optimizada para desktop, tablet y móvil
- **Temas por Tipo**: Colores específicos para cada tipo de Pokémon
- **API Real**: Conectado con la PokéAPI para datos actualizados

## 📋 Requisitos Previos

- **Node.js**: v18.0.0 o superior
- **npm**: v9.0.0 o superior

## 🚀 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/CCAPITAL-APPS/pokedex.git
   cd pokedex
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   # Crear archivo .env con la URL de la API
   echo "VITE_POKEDEX_API=https://pokeapi.co/api/v2" > .env
   ```

4. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```

## 📦 Scripts Disponibles

### Desarrollo
```bash
npm run dev              # Inicia servidor de desarrollo con HMR
npm run build           # Compila TypeScript y construye para producción
npm run preview         # Muestra vista previa de la compilación
```

### Entornos
```bash
npm run serve:dev       # Servidor de desarrollo
npm run serve:qa        # Servidor QA
npm run serve:prod      # Servidor producción
npm run serve-mfe       # Sirve como Micro Frontend en puerto 3000
```

### Testing
```bash
npm run test            # Ejecuta pruebas unitarias (Vitest)
npm run test:watch      # Modo watch para pruebas
npm run test:coverage   # Reporte de cobertura
npm run test:ui         # Interfaz visual de Vitest
```

### Calidad de Código
```bash
npm run lint            # Ejecuta ESLint y corrige problemas automáticamente
```

## 📁 Estructura del Proyecto

```
pokedex/
├── src/
│   ├── assets/                 # Imágenes y estilos globales
│   │   ├── images/
│   │   └── styles/
│   ├── components/             # Componentes Vue reutilizables
│   │   ├── pokemonCard/
│   │   ├── PokemonFilter/
│   │   ├── ErrorHandler/
│   │   ├── PokeballLoader/
│   │   └── menu/
│   ├── composables/            # Composables reutilizables
│   │   └── useDevice.ts        # Detección de dispositivo (mobile/desktop)
│   ├── clients/                # Configuración de API clients
│   │   └── pokedex.ts
│   ├── services/               # Lógica de negocio
│   │   ├── pokemonService.ts   # Servicios de Pokémon
│   │   └── types/
│   ├── stores/                 # Store de Pinia
│   │   └── favoritesStore.ts   # Gestión de favoritos
│   ├── utils/                  # Utilidades
│   │   ├── formatPokemonId.ts
│   │   ├── pokemonTypes.ts
│   │   └── pokemonWeakness.ts
│   ├── views/                  # Páginas/Vistas
│   │   ├── pokedex/
│   │   ├── pokemonDetail/
│   │   ├── favorites/
│   │   ├── regions/
│   │   └── Onboarding/
│   ├── router/                 # Configuración de rutas
│   │   └── index.ts
│   ├── App.vue                 # Componente raíz
│   └── main.ts                 # Punto de entrada
├── src/__tests__/              # Pruebas unitarias
│   ├── utils/
│   ├── services/
│   ├── stores/
│   ├── composables/
│   └── components/
├── vite.config.ts              # Configuración de Vite
├── vitest.config.ts            # Configuración de Vitest
├── tsconfig.json               # Configuración de TypeScript
├── eslint.config.mts           # Configuración de ESLint
├── .prettierrc                 # Configuración de Prettier
└── package.json
```

## 🧪 Testing

El proyecto incluye pruebas unitarias para:

- **Utilidades** (`formatPokemonId`, `pokemonTypes`, `pokemonWeakness`)
- **Servicios** (API de Pokémon)
- **Store de Pinia** (Favoritos)
- **Composables** (useDevice)
- **Componentes** (Tarjetas y filtros)

### Ejecutar Pruebas

```bash
# Pruebas de una sola ejecución
npm run test

# Modo watch (re-ejecuta en cambios)
npm run test:watch

# Reporte de cobertura
npm run test:coverage

# UI Interactiva
npm run test:ui
```

## 🛠️ Tecnologías

### Frontend
- **Vue 3** - Framework progresivo de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Vue Router** - Enrutamiento
- **Pinia** - State management
- **Bootstrap 5** - Framework CSS
- **FontAwesome** - Iconografía

### Desarrollo
- **Vitest** - Testing framework
- **ESLint** - Linting
- **Prettier** - Formato de código
- **Husky** - Git hooks
- **Sass** - Preprocesador CSS

### API
- **PokéAPI** - API pública de Pokémon
- **Axios** - Cliente HTTP

## 📊 API Reference

El proyecto se conecta con la [PokéAPI](https://pokeapi.co/docs/v2) para obtener:

- Lista de Pokémon paginada
- Detalles completos de cada Pokémon
- Información de tipos y debilidades
- Datos de especies y habilidades

## 🎯 Flujo de Trabajo

1. **Visualización**: El usuario ve una lista paginada de Pokémon
2. **Filtrado**: Puede filtrar por tipo mediante el componente `PokemonFilter`
3. **Detalles**: Al hacer clic en una tarjeta, navega a la página de detalles
4. **Favoritos**: Puede marcar Pokémon como favoritos (persistidos en el store)
5. **Sección de Favoritos**: Acceso rápido a sus Pokémon favoritos

## 🚦 Estado del Proyecto

- ✅ Funcionalidad principal completa
- ✅ Pruebas unitarias implementadas
- ✅ Lint y formateo de código
- ✅ Documentación actualizada
- ⏳ E2E tests (por implementar)
- ⏳ PWA (por implementar)

## 👤 Autor

**Alejandro Pineros G**
- GitHub: [@CCAPITAL-APPS](https://github.com/CCAPITAL-APPS)
- Email: contacto@alejandropineros.com

## 📝 Licencia

Este proyecto está bajo la licencia **ISC**.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Si tienes preguntas o encuentras problemas, por favor abre un issue en el repositorio.

---

**Hecho con ❤️ usando Vue 3 + TypeScript**