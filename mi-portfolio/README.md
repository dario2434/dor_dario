# Portfolio Web – Dario Acosta González

Portfolio web profesional desarrollado con **Vue 3 + Vite + TypeScript + Tailwind CSS**, diseñado para presentar perfil, experiencia profesional, proyectos y habilidades técnicas, con despliegue automático en **GitHub Pages**.

**Demo en producción**:  
https://dario2434.github.io/dor_dario/

---

## Tecnologías utilizadas

- Vue 3 (Composition API)
- Vite
- TypeScript
- Tailwind CSS
- Vue Router
- Node.js
- GitHub Actions
- GitHub Pages

---

## Descripción

Este portfolio muestra:

- Información personal y perfil profesional
- Experiencia laboral en formato timeline
- Proyectos destacados con tecnologías utilizadas
- Habilidades técnicas con iconos
- Formulario de contacto
- Descarga directa del CV en PDF

El proyecto está estructurado como una **SPA moderna**, optimizada para rendimiento y despliegue en GitHub Pages.

---

## Estructura del proyecto

```txt
mi-portfolio/
│
├── .github/workflows/     # CI/CD GitHub Actions
├── public/                # Archivos públicos (CV, imágenes)
├── src/
│   ├── components/        # Componentes reutilizables
│   ├── views/             # Vistas principales
│   ├── data/              # Datos del CV (JSON)
│   ├── router/            # Vue Router
│   ├── types/             # Tipos TypeScript
│   ├── assets/            # Recursos gráficos
│   ├── App.vue
│   ├── main.js
│   └── style.css
│
├── index.html
├── vite.config.js
├── package.json
└── tsconfig.json
```

---

## Scripts disponibles

```bash
npm run dev       # Servidor de desarrollo
npm run build     # Build de producción
npm run preview   # Preview del build
```

---

## Despliegue en GitHub Pages

El despliegue se realiza automáticamente con **GitHub Actions**.

Configuración clave en `vite.config.js`:

```js
base: command === "build" ? "/dor_dario/" : "/";
```

---

## CV

El CV se encuentra en:

```
public/DARIO-cv.pdf
```

Y es descargable desde la web.

---

## Ator

**Dario Acosta González**  
darioacostagonzalez1@gmail.com

---

## Licencia

Proyecto de uso personal y educativo.
