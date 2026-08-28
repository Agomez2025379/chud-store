import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { Producto } from '../../models/producto.model';
import { Inventario } from '../../services/inventario';

@Component({
  imports: [CommonModule],
  selector: 'app-producto-listado',
  styleUrl: './producto-listado.css',
  templateUrl: './producto-listado.html',
})
export class ProductoListado {
  protected readonly productos: Producto[];

  constructor(private readonly inventario: Inventario) {
    this.productos = this.inventario.obtenerTodos();
  }
}
