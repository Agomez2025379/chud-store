# formcontrolname y directivas de enlace
- Fecha: 28/08/26
- Estado: En revisión

## Objetivo y contexto

Esta investigacion es para que el agente de ia entienda como construir las plantillas html de chudstore
El objetivo es enlazar la logica de typescript con las etiquetas input del html de forma reactiva
Se busca aplicar la directiva [formgroup] en el form principal y formcontrolname en los campos

## Hallazgos

En angular typescript es la fuente de verdad y el html solo refleja los datos
La directiva [formgroup] funciona como el contenedor principal y agrupa los controles
La directiva formcontrolname es el puente que enlaza cada input con el codigo
El enlace bidireccional es implicito y sincroniza el html con typescript al instante sin usar ngmodel

## Decisiones y conclusiones

El agente de ia debe colocar [formgroup]="formulario" en la etiqueta form
El agente debe asignar formcontrolname a cada etiqueta input para conectarla con typescript
Los nombres que el agente debe usar son codigo nombre categoria preciocompra precioventa existencias stockminimo proveedor fechaingreso descripcion y activo
El html dependera de que el codigo en typescript tenga exactamente esos mismos nombres

## Repercusiones en el codigo

El agente de ia construira el html de producto-formulario usando estos hallazgos
El modulo reactiveformsmodule debera estar importado en el proyecto para que angular reconozca las directivas
La plantilla quedara lista para que la logica de envio y validaciones funcione correctamente

## Fuentes y enlaces

Documentacion oficial de formularios reactivos https://angular.dev/guide/forms/reactive-forms
Guia oficial para agrupar controles https://angular.dev/guide/forms/reactive-forms#grouping-form-controls
