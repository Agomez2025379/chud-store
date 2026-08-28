import { Injectable } from '@angular/core';

import { Producto } from '../models/producto.model';

const STORAGE_KEY = 'chud-store:productos';

@Injectable({ providedIn: 'root' })
export class Inventario {
  private readonly productos: Producto[] = [];

  constructor() {
    this.productos = this.cargarDeStorage();
  }

  obtenerTodos(): Producto[] {
    return [...this.productos];
  }

  agregar(producto: Producto): void {
    this.productos.push(producto);
    this.guardarEnStorage();
  }

  private cargarDeStorage(): Producto[] {
    if (typeof localStorage === 'undefined') {
      return [];
    }
    const datos = localStorage.getItem(STORAGE_KEY);
    if (datos === null) {
      return [];
    }
    try {
      return JSON.parse(datos) as Producto[];
    } catch {
      return [];
    }
  }

  private guardarEnStorage(): void {
    if (typeof localStorage === 'undefined') {
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.productos));
    } catch {
      return;
    }
  }
}
