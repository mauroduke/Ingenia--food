# Ingenia Food

Sitio web y prototipo de plataforma educativa para Ingenia Food, empresa colombiana de consultoria, capacitacion y acompanamiento para el sector de alimentos.

## Contenido del repositorio

- `index.html`: version estatica lista para hosting. Puede abrirse directamente en un navegador y no requiere instalacion.
- `ingenia-food.html`: copia editable de la version estatica.
- `ingenia-food.jsx`: prototipo de la version React con navegacion, registro de usuarios, cursos, evaluaciones y certificados.
- `ingenia-food-logo.svg`: logotipo utilizado por las dos versiones.

## Ver la version estatica

1. Descarga o clona este repositorio.
2. Abre `index.html` en tu navegador.

La version estatica carga las tipografias desde Google Fonts y enlaza los formularios y redes sociales configurados en el HTML.

## Version React

El archivo JSX es codigo fuente para un proyecto React. Para ejecutarlo hace falta integrarlo en una aplicacion creada con Vite, Create React App u otra herramienta equivalente, e instalar como minimo:

```bash
npm install react react-dom lucide-react
```

El componente usa `window.storage`, una API de almacenamiento proporcionada por algunos entornos de prototipado. En una aplicacion React convencional debe reemplazarse por `localStorage` o por un backend antes de ponerlo en produccion.

## Publicar en GitHub Pages

Para publicar rapidamente la version estatica con GitHub Pages, sube `index.html`, `ingenia-food-logo.svg` y `CNAME` al repositorio. En GitHub, entra en **Settings > Pages**, selecciona la rama `main` y la carpeta raiz `/ (root)`. El archivo `CNAME` ya esta configurado para `ingeniafood.com`.

## Conectar ingeniafood.com

1. Compra `ingeniafood.com` en un registrador como Cloudflare Registrar, Namecheap o GoDaddy.
2. En el registrador, crea estos registros DNS para GitHub Pages:
	- `A` para `@` apuntando a `185.199.108.153`.
	- `A` para `@` apuntando a `185.199.109.153`.
	- `A` para `@` apuntando a `185.199.110.153`.
	- `A` para `@` apuntando a `185.199.111.153`.
	- `CNAME` para `www` apuntando a `TU_USUARIO.github.io`.
3. En GitHub Pages, agrega `ingeniafood.com` como dominio personalizado y activa **Enforce HTTPS** cuando aparezca disponible.

La compra del dominio, el acceso a GitHub y la confirmacion de pago deben hacerlos desde la cuenta del propietario; no se pueden completar de forma automatica desde este proyecto.

## Contacto

- Correo: ingeniafood.sac@gmail.com
- WhatsApp: [310 457 2080](https://wa.me/573104572080)
- Instagram: [@ingeniafood_](https://www.instagram.com/ingeniafood_/)

## Licencia

Este proyecto se distribuye bajo la licencia MIT. Consulta [LICENSE.md](LICENSE.md).
