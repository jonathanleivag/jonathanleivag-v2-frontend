# Jonathanleivag-v2-frontend
## Descripción
Frontend de la versión 2 del sitio web personal utilizando Astro y React con TypeScript. Este proyecto implementa un sitio web moderno con funcionalidades de blog y portfolio.
## Tecnologías Principales
- **Astro**: v5.7.4
- **React**: v19.0.0
- **TypeScript**
- **TailwindCSS**: v4.0.15
- **Framer Motion**: v12.5.0

## Requisitos
- Node.js (versión recomendada: 18.x o superior)
- npm

## Instalación
1. Clona el repositorio:

```shell
  git clone <url-del-repositorio>
  cd jonathanleivag-v2-frontend
```
2. Instala las dependencias:

```shell
  npm i
```

3. Configura las variables de entorno:
```shell
  cp .env.example .env
```

Edita el archivo con los valores correspondientes: `.env`
- : URL de la API principal `API_URL`
- : URL de la API del blog `API_URL_BLOG`
- : URL pública del blog `PUBLIC_BLOG_URL`
- : Configuración de idioma (ON | OFF) `PUBLIC_LANG`
- : URL del sitio web `PUBLIC_WEB`
- : Dirección de correo electrónico de contacto `PUBLIC_EMAIL`
- : Número de teléfono de contacto `PUBLIC_PHONE`

## Scripts Disponibles
- **Desarrollo**: Inicia el servidor de desarrollo

```shell
      npm run dev
```

- **Construcción**: Genera los archivos de producción

```shell
      npm run build
```

- **Vista previa**: Inicia un servidor para previsualizar la versión construida

```shell
      npm run preview
```

- **Comandos de Astro**: Ejecuta comandos de Astro CLI

```shell
      npm run astro <comando>
```

## Características
- Sitio web basado en Astro con integración de React
- Estilos con TailwindCSS
- Animaciones con Framer Motion
- Gestión de estado con nanostores
- Formularios con react-hook-form
- Notificaciones con react-hot-toast
- Soporte para SEO y sitemap
- Soporte para impresión con react-to-print

## Estructura del Proyecto
La estructura del proyecto sigue las convenciones de Astro:

```
jonathanleivag-v2-frontend/
├── public/           # Archivos estáticos
├── src/
│   ├── components/   # Componentes React y Astro
│   ├── layouts/      # Layouts para las páginas
│   ├── pages/        # Páginas de la aplicación
│   ├── stores/       # Configuración de nanostores
│   └── styles/       # Estilos globales
├── .env              # Variables de entorno (no incluidas en el repositorio)
├── .env.example      # Ejemplo de variables de entorno
└── package.json      # Configuración del proyecto
```

## Linting y Formateo
Este proyecto utiliza:
- para linting de TypeScript **ts-standard**
- **prettier** con para formateo de código **prettier-plugin-astro**

## Licencia
MIT
## Contacto
 [@jonathanleivag](https://www.instagram.com/jonathanleivag/)
