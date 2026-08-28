import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-producto-formulario',
  styleUrl: './producto-formulario.css',
  templateUrl: './producto-formulario.html',
})
export class ProductoFormulario {
  protected readonly formulario: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.formulario = this.fb.group(
      {
        codigo: ['', Validators.required],
        nombre: ['', Validators.required],
        categoria: ['', Validators.required],
        precioCompra: [0, [Validators.required, Validators.min(0)]],
        precioVenta: [0, [Validators.required, Validators.min(0)]],
        existencias: [0, [Validators.required, Validators.min(0)]],
        stockMinimo: [1, [Validators.required, Validators.min(1)]],
        proveedor: ['', Validators.required],
        fechaIngreso: ['', Validators.required],
        descripcion: ['', [Validators.required, Validators.maxLength(200)]],
        activo: [true],
      },
      { validators: this.precioVentaMayorQueCompra },
    );
  }

  onSubmit(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.formulario.reset({
      precioCompra: 0,
      precioVenta: 0,
      existencias: 0,
      stockMinimo: 1,
      activo: true,
    });
  }

  private precioVentaMayorQueCompra(grupo: FormGroup) {
    const precioCompra = grupo.get('precioCompra')?.value as number;
    const precioVenta = grupo.get('precioVenta')?.value as number;
    if (precioVenta === 0 || precioCompra === 0) {
      return null;
    }
    if (precioVenta <= precioCompra) {
      return { precioVentaMayorQueCompra: true };
    }
    return null;
  }
}
