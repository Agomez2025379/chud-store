import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Producto } from '../../models/producto.model';
import { Inventario } from '../../services/inventario';
import { ProductoListado } from './producto-listado';

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

describe('ProductoListado', () => {
  let component: ProductoListado;
  let fixture: ComponentFixture<ProductoListado>;
  let inventario: Inventario;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [ProductoListado],
    }).compileComponents();

    inventario = TestBed.inject(Inventario);
    fixture = TestBed.createComponent(ProductoListado);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('muestra un mensaje cuando no hay productos', () => {
    fixture.detectChanges();

    const elemento: HTMLElement = fixture.nativeElement;
    expect(elemento.textContent).toContain('Aún no hay productos registrados');
  });

  it('lista los productos registrados en el inventario', () => {
    inventario.agregar(productoEjemplo());

    fixture = TestBed.createComponent(ProductoListado);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const elemento: HTMLElement = fixture.nativeElement;
    expect(component['productos']).toEqual([productoEjemplo()]);
    expect(elemento.textContent).toContain('Galletas de chocolate');
    expect(elemento.textContent).toContain('P-001');
  });
});
