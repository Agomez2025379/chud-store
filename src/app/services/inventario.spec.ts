import { TestBed } from '@angular/core/testing';

import { Producto } from '../models/producto.model';
import { Inventario } from './inventario';

const CLAVE_STORAGE = 'chud-store:productos';

function productoEjemplo(): Producto {
  return {
    codigo: 'P-001',
    nombre: 'Galletas de chocolate',
    categoria: 'Alimentos',
    precioCompra: 5,
    precioVenta: 7,
    existencias: 10,
    stockMinimo: 2,
    proveedor: 'Distribuidora XYZ',
    fechaIngreso: '2026-08-28',
    descripcion: 'Galletas de chocolate con relleno',
    activo: true,
  };
}

describe('Inventario', () => {
  let service: Inventario;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(Inventario);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('empieza sin productos cuando no hay datos guardados', () => {
    expect(service.obtenerTodos()).toEqual([]);
  });

  it('agrega un producto a la memoria y lo regresa al listar', () => {
    service.agregar(productoEjemplo());

    expect(service.obtenerTodos()).toEqual([productoEjemplo()]);
  });

  it('persiste los productos en localStorage al agregar', () => {
    service.agregar(productoEjemplo());

    const datos = localStorage.getItem(CLAVE_STORAGE);
    expect(datos).not.toBeNull();
    expect(JSON.parse(datos as string)).toEqual([productoEjemplo()]);
  });
});

describe('Inventario con datos previos', () => {
  it('carga los productos guardados en localStorage al crearse', () => {
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify([productoEjemplo()]));

    const service = new Inventario();

    expect(service.obtenerTodos()).toEqual([productoEjemplo()]);
  });

  it('tolera un JSON invalido en localStorage y devuelve lista vacia', () => {
    localStorage.setItem(CLAVE_STORAGE, 'no-es-json');

    const service = new Inventario();

    expect(service.obtenerTodos()).toEqual([]);
  });
});
