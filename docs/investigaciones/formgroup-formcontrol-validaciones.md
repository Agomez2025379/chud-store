# FormGroup, FormControl y validaciones individuales y cruzadas

- **Fecha:** 28/08/26
- **Estado:** En revisión

## Objetivo y contexto

Esta investigacion es para que el agente de ia entienda como construir la logica de formularios reactivos en Angular. El objetivo es definir que es un FormGroup, que es un FormControl y como aplicar validaciones individuales por campo y validaciones cruzadas entre campos. Se busca que el agente sepa crear formularios con reglas de negocio como que el precio de venta sea mayor al precio de compra.

## Hallazgos

Un FormControl es la unidad minima de un formulario reactivo. Cada input del html se representa como un FormControl en typescript. Un FormGroup es un conjunto de FormControl agrupados bajo un solo objeto. El FormGroup permite acceder a todos los valores, validadores y estado del formulario completo. Para crear un FormGroup se usa el constructor de FormBuilder o la clase FormGroup directamente.

Las validaciones individuales se aplican en cada FormControl usando Validators. Angular ofrece Validators.required, Validators.minLength, Validators.maxLength, Validators.pattern, Validators.min, Validators.max. Estos se pasan como segundo argumento al FormControl o al FormBuilder.group. Cuando la validacion falla el FormControl se marca como invalid y touched. El html puede usar las clases css ng-invalid y ng-touched para mostrar errores al usuario.

Las validaciones cruzadas se aplican a nivel de FormGroup usando el parametro crossFieldValidators o validadores personalizados. Una validacion cruzada compara el valor de dos o mas FormControl dentro del mismo grupo. Para precio venta mayor a compra se crea una funcion validadora que recibe el FormGroup y compara precioventa con preciocompra. Si precioventa es menor o igual a preciocompra la validacion falla y se marca el formulario como invalido. El error se puede mostrar en el html usando formGroup.errors.

## Decisiones y conclusiones

El agente de ia debe crear un FormGroup usando FormBuilder.group con todos los campos del formulario. Cada campo debe tener su FormControl con las validaciones individuales correspondientes. Los campos precioventa y preciocompra deben tener Validators.required para asegurar que no esten vacios. Se debe crear una funcion validadora separada que compare precioventa con preciocompra y retornar un objeto de error si la validacion falla. El agente debe aplicar esta validacion cruzada al nivel del FormGroup usando el parametro validators. El html debe mostrar mensajes de error condicionales usando *ngIf con las propiedades invalid y errors del FormControl y del FormGroup.

## Repercusiones en el codigo

El agente de ia construira la logica de formularios reactivos en el componente de producto-formulario usando estos hallazgos. El modulo ReactiveFormsmodule debe estar importado en el proyecto para que Angular reconozca las directivas. La funcion validadora de precio se creara como una funcion estatica o privada dentro del componente. El html quedara con mensajes de error que se muestran cuando los campos no cumplen las validaciones individuales o cruzadas.

## Fuentes y enlaces

Documentacion oficial de formularios reactivos: https://angular.dev/guide/forms/reactive-forms
Validadores built-in de Angular: https://angular.dev/api/forms/Validators
Validaciones cruzadas con FormGroup: https://angular.dev/guide/forms/reactive-forms#adding-cross-field-validation
