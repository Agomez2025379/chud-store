# ngSubmit-preventDefault()-value

- **Fecha:** 2026-08-28
- **Estado:** Validado

## Objetivo y contexto

Esta investigación es para que el agente de ia pueda comprender la importancia de capturar el evento ngSubmit en un ciclo
de envió de información de un formulario, además el como extraer los datos validados y limpiar el estado de los campos.

## Hallazgos

- **ngSubmit:** Permite vincular expresiones AngularJS a eventos onsubmission. Además, evita la acción predeterminada
  (que para el formulario significa enviar la solicitud a la servidor y recargando la página actual),
- **onSubmit:** El evento onsubmit de HTML se activa cuando un formulario se va a enviar. Este evento es comúnmente
  utilizado para validar la información introducida por el usuario antes de enviarla al servidor.
- **preventDefault():** El método preventDefault() cancela el evento si es cancelable, es decir, que la acción
  predeterminada que pertenece al evento no ocurra. (Por ejemplo, esto puede ser útil cuando: Al hacer clic en un
  botón de "Enviar", evita que envíe un formulario y Al hacer clic en un enlace, evita que el enlace siga la URL).
- **ReactiveFormsModule:** Exporta la infraestructura y las directrices necesarias para las formas reactivas, poniéndolos
  a disposición para la importación por parte de NgModules que importan este módulo.

## Decisiones y conclusiones

El agente de ia debe procesar el método en TypeScript para que el proceso echo con ngSubmit empiece, después deberá extraer
el .value para obtener los valores del usuario que debió ingresar con anterioridad en los campos de entrada, por ultimo
deberá ser capaz de que una vez que se procesaran los datos del usuario con éxito, se resetee el formulario su estado
inicial para que el usuario pueda escribir de nuevo, si así quisiera.

## Repercusiones en el código

Se deberán tomar obligatoriamente en cuenta el ngSubmit y el onSubmit, si es que se desea que la pagina no se tenga que
recargar al momento de modificar los datos, además de tener en cuenta el ReactiveFormsModule y el .value para lograr validar
los datos enviados por el usuario.

## Implementación en ChudStore

- `producto-formulario.ts`: `onSubmit()` valida con `formulario.invalid` (si es inválido llama `markAllAsTouched()` y no
  continúa), extrae los valores con `this.formulario.value as Producto`, guarda el producto con
  `inventario.agregar(producto)` y reinicia el formulario con `reset()` usando los valores iniciales de referencia
  (precios, existencias, stock mínimo y `activo`).
- `producto-listado.ts` / `producto-listado.html`: el listado inyecta `Inventario` y expone `productos` desde
  `obtenerTodos()`, mostrando una tabla con todos los campos del producto y un mensaje cuando la lista está vacía.
- Conclusión: `ngSubmit` reemplaza al envio HTML clásico (evita recargar la página), la extracción se hace con `.value`
  tipado como `Producto` y la "limpieza" del estado inicial del formulario se logra con `reset()` tras guardar.

## Fuentes y enlaces

- **Información recopilada sobre ngSubmit de:** https://docs.angularjs.org/api/ng/directive/ngSubmit
- **Información recopilada sobre onSubmit de:** https://www.w3api.com/HTML/onsubmit/
- **Información recopilada sobre preventDefault() de:** https://www.w3schools.com/jsref/event_preventdefault.asp
- **Información recopilada sobre ReactiveFormsModule de:** https://angular.dev/api/forms/ReactiveFormsModule
