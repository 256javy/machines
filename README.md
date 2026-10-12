# Machines

Explicaciones visuales de cómo funcionan las cosas. Primera entrega: un procesador de cuatro bits y el papel de los semiconductores, en español.

## Abrir

Requiere Node.js 20.10+ y Python 3; sin dependencias npm.

```sh
npm run build
npm test
npm start
```

Visita http://localhost:8000. Usa los botones para recorrer la suma y aplicar tensión al transistor. Los controles funcionan con teclado. El recorrido automático solo se inicia al pulsarlo y se detiene al salir de pantalla.

`model.mjs` contiene el estado de la instrucción y el sumador. `content.html`, `live.js` y `style.css` son las fuentes de la página; `index.html` se genera con `build.mjs`. La maqueta y sus límites están en `docs/concepto.md`.

Geometría SVG basada en Anatomy (wheresryan22/anatomy), licencia MIT conservada en `vendor/anatomy/LICENSE`. Las fuentes técnicas están enlazadas al pie de la página.
