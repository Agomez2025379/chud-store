# [FormBuilder e Inyección de Dependencias en Angular]

- **Fecha:** 2026-08-28
- **Estado:**En revisión

## Objetivo y contexto

<!-- ¿Por qué se investiga este tema? ¿Qué problema o duda se quiere resolver? -->
Investigar el uso del servicio inyectable `FormBuilder` como una alternativa sintáctica más limpia y rápida frente al enfoque manual con `new FormGroup` y `new FormControl`, reduciendo el código repetitivo en la creación de formularios del proyecto.

## Hallazgos

<!-- Qué se descubrió durante la investigación. Hechos, comparativas, opciones consideradas. -->
- **Inyección de Dependencias:** `FormBuilder` es un servicio inyectable de `@angular/forms`. 
Se inyecta mediante el constructor (`constructor(private fb: FormBuilder) {}`) o usando la función `inject(FormBuilder)`.
- **Sintaxis Simplificada:** Evita la instanciación manual repetitiva.
  - *Tradicional:* `miForm = new FormGroup({ email: new FormControl('', [Validators.required]) });`
  - *Con FormBuilder:* `miForm = this.fb.group({ email: ['', [Validators.required]] });`
- **Soporte de Estructuras:** Facilita la creación de `group()`, `control()` y `array()` con validaciones integradas en menos líneas de código.

## Decisiones y conclusiones

<!-- Conclusión a la que se llegó y decisión tomada (si aplica). Esta sección es la base para decisiones futuras del proyecto. -->}
Adoptar `FormBuilder` como el estándar único del proyecto para construir formularios reactivos, simplificando la legibilidad y acelerando el desarrollo en equipo.

## Repercusiones en el código

<!-- Qué partes del código o arquitectura se ven afectadas por esta investigación/decisión (si aplica). -->
- Importación obligatoria de `ReactiveFormsModule` en los componentes o módulos correspondientes.
- Inyección del servicio `FormBuilder` en los componentes que gestionen formularios.

## Fuentes y enlaces

<!-- Documentación oficial, artículos, referencias. -->
- [Documentación Oficial de Angular - FormBuilder](https://angular.dev/api/forms/FormBuilder)