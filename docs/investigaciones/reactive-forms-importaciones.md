# ReactiveFormsModule e importaciones globales en Angular

- **Fecha:** 2026-08-28
- **Estado:** Validado

## Objetivo y contexto

Determinar dónde debe importarse `ReactiveFormsModule` para que Angular reconozca las directivas de formularios reactivos, según la arquitectura del proyecto (NgModule clásico vs. standalone components) y qué errores provoca omitir esa importación.

## Hallazgos

- `ReactiveFormsModule` (paquete `@angular/forms`) provee las directivas que enlazan el formulario de la clase del componente con el HTML (p. ej. `formGroup`, `formControlName`). Sin él, esos atributos no se reconocen aunque la lógica del componente esté correcta.
- **Arquitectura NgModule:** se importa una vez en el módulo principal o del módulo de la funcionalidad. Todos los componentes declarados en ese módulo lo heredan, pero **no** se propaga a otros módulos: cada módulo que lo necesite debe declararlo.
- **Standalone components:** no hay módulo central; cada componente que use formularios reactivos debe importar `ReactiveFormsModule` en su propio decorador (`imports`). Es una responsabilidad local, no global.
- `ReactiveFormsModule` no debe confundirse con `FormsModule` (template-driven): ambos vienen del mismo paquete pero son independientes y mezclarlos sin cuidado causa comportamientos inesperados.
- **Error típico al faltar la importación:** error de compilación tipo "no se puede enlazar el atributo X porque no es una propiedad conocida", sobre `formGroup` o sobre los campos de entrada. La sugerencia de suprimir el error con un `schemas` no es la solución recomendada.
- **Sin `formGroup` explícito:** con el módulo registrado, Angular exige enlazar cada formulario a una instancia de `FormGroup` en el HTML; si no se declara, genera un error en consola.
- **Error aparte (no por `ReactiveFormsModule`):** enlazar `formControlName` a un componente personalizado sin implementar `ControlValueAccessor` (o sin la directiva correspondiente) produce un error de valor de control; no se resuelve importando el módulo.

## Decisiones y conclusiones

- **Arquitectura NgModule:** importar `ReactiveFormsModule` en el módulo principal (uso global) o en el módulo de la funcionalidad (uso aislado).
- **Standalone:** declararlo en el `imports` de cada componente que use formularios reactivos.
- Ante un error de enlace no reconocido (`formGroup`, `formControlName`, etc.), la primera revisión debe ser confirmar que el módulo esté importado en el nivel correcto, no revisar la lógica del formulario.

## Repercusiones en el código

- **NgModule:** una sola línea de importación habilita las directivas en todos los componentes del módulo; menos repetición, pero hay que saber a qué módulo pertenece cada componente.
- **Standalone:** cada componente repite su propia importación en su decorador; más código repetido, pero dependencias explícitas y localizadas, lo que facilita detectar componentes nuevos que olvidaron la dependencia.
- **Depuración:** conocer esta diferencia permite identificar rápido el origen (falta de importación) y no perder tiempo en la lógica del componente. Es común que el error aparezca en una pantalla y no en otra por importaciones incompletas.

## Fuentes y enlaces

- Artículos de la comunidad (dev.to y Medium) sobre conversión NgModule → standalone y componentes independientes.
- Reporte de error en el repositorio oficial de Angular en GitHub sobre el enlace de `formGroup`.
- Artículo en Medium sobre el error de acceso al valor de un control en componentes personalizados y `ControlValueAccessor`.
- Lecciones de Educative sobre formularios y diseño de aplicaciones con Angular.
