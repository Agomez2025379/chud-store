import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-producto-formulario',
  styleUrl: './producto-formulario.css',
  templateUrl: './producto-formulario.html',
})
export class ProductoFormulario {
  protected readonly formulario = new FormGroup({
    codigo: new FormControl(''),
    nombre: new FormControl(''),
    categoria: new FormControl(''),
    precioCompra: new FormControl(0),
    precioVenta: new FormControl(0),
    existencias: new FormControl(0),
    stockMinimo: new FormControl(1),
    proveedor: new FormControl(''),
    fechaIngreso: new FormControl(''),
    descripcion: new FormControl(''),
    activo: new FormControl(true),
  });
}
