import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Inventario } from '../../services/inventario';
import { ProductoFormulario } from './producto-formulario';

describe('ProductoFormulario', () => {
  let component: ProductoFormulario;
  let fixture: ComponentFixture<ProductoFormulario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoFormulario],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductoFormulario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  afterEach(() => {
    localStorage.clear();
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe ser invalido cuando los campos obligatorios estan vacios', () => {
    const formulario = component['formulario'];
    formulario.setValue({
      codigo: '',
      nombre: '',
      categoria: '',
      precioCompra: 0,
      precioVenta: 0,
      existencias: 0,
      stockMinimo: 1,
      proveedor: '',
      fechaIngreso: '',
      descripcion: '',
      activo: true,
    });
    expect(formulario.invalid).toBe(true);
    expect(formulario.get('codigo')?.hasError('required')).toBe(true);
    expect(formulario.get('nombre')?.hasError('required')).toBe(true);
  });

  it('debe ser valido con todos los campos correctos', () => {
    const formulario = component['formulario'];
    formulario.setValue({
      codigo: 'P-001',
      nombre: 'Arroz',
      categoria: 'Alimentos',
      precioCompra: 10,
      precioVenta: 15,
      existencias: 50,
      stockMinimo: 5,
      proveedor: 'Distribuidora A',
      fechaIngreso: '2026-08-28',
      descripcion: 'Paquete de arroz',
      activo: true,
    });
    expect(formulario.valid).toBe(true);
  });

  it('debe fallar la validacion cruzada cuando precioVenta <= precioCompra', () => {
    const formulario = component['formulario'];
    formulario.patchValue({
      precioCompra: 20,
      precioVenta: 15,
    });
    expect(formulario.hasError('precioVentaMayorQueCompra')).toBe(true);
  });

  it('debe pasar la validacion cruzada cuando precioVenta > precioCompra', () => {
    const formulario = component['formulario'];
    formulario.patchValue({
      precioCompra: 10,
      precioVenta: 15,
    });
    expect(formulario.hasError('precioVentaMayorQueCompra')).toBe(false);
  });

  it('mostrarError devuelve true solo cuando el campo esta touched e invalido', () => {
    const formulario = component['formulario'];
    formulario.setValue({
      codigo: '',
      nombre: 'Arroz',
      categoria: 'Alimentos',
      precioCompra: 10,
      precioVenta: 15,
      existencias: 50,
      stockMinimo: 5,
      proveedor: 'Distribuidora A',
      fechaIngreso: '2026-08-28',
      descripcion: 'Paquete de arroz',
      activo: true,
    });
    formulario.markAllAsTouched();
    expect(component['mostrarError']('codigo', 'required')).toBe(true);
    expect(component['mostrarError']('nombre', 'required')).toBe(false);
    formulario.get('codigo')?.markAsUntouched();
    expect(component['mostrarError']('codigo', 'required')).toBe(false);
  });

  it('mostrarErrorCruzado requiere que el formulario este touched', () => {
    const formulario = component['formulario'];
    formulario.patchValue({
      precioCompra: 20,
      precioVenta: 15,
    });
    expect(component['mostrarErrorCruzado']()).toBe(false);
    formulario.markAllAsTouched();
    expect(component['mostrarErrorCruzado']()).toBe(true);
  });

  it('onSubmit guarda el producto en el inventario', () => {
    const formulario = component['formulario'];
    formulario.setValue({
      codigo: 'P-001',
      nombre: 'Arroz',
      categoria: 'Alimentos',
      precioCompra: 10,
      precioVenta: 15,
      existencias: 50,
      stockMinimo: 5,
      proveedor: 'Distribuidora A',
      fechaIngreso: '2026-08-28',
      descripcion: 'Paquete de arroz',
      activo: true,
    });

    component.onSubmit();

    const inventario = TestBed.inject(Inventario);
    expect(inventario.obtenerTodos()).toEqual([
      {
        codigo: 'P-001',
        nombre: 'Arroz',
        categoria: 'Alimentos',
        precioCompra: 10,
        precioVenta: 15,
        existencias: 50,
        stockMinimo: 5,
        proveedor: 'Distribuidora A',
        fechaIngreso: '2026-08-28',
        descripcion: 'Paquete de arroz',
        activo: true,
      },
    ]);
  });

  it('onSubmit resetea el formulario a su estado inicial', () => {
    const formulario = component['formulario'];
    formulario.setValue({
      codigo: 'P-001',
      nombre: 'Arroz',
      categoria: 'Alimentos',
      precioCompra: 10,
      precioVenta: 15,
      existencias: 50,
      stockMinimo: 5,
      proveedor: 'Distribuidora A',
      fechaIngreso: '2026-08-28',
      descripcion: 'Paquete de arroz',
      activo: true,
    });

    component.onSubmit();

    expect(formulario.get('codigo')?.value).toBe('');
    expect(formulario.get('nombre')?.value).toBe('');
    expect(formulario.get('precioCompra')?.value).toBe(0);
    expect(formulario.get('precioVenta')?.value).toBe(0);
    expect(formulario.get('existencias')?.value).toBe(0);
    expect(formulario.get('stockMinimo')?.value).toBe(1);
    expect(formulario.get('activo')?.value).toBe(true);
  });

  it('onSubmit no guarda cuando el formulario es invalido', () => {
    const formulario = component['formulario'];
    formulario.get('codigo')?.setValue('');
    const inventario = TestBed.inject(Inventario);

    component.onSubmit();

    expect(inventario.obtenerTodos()).toEqual([]);
    expect(formulario.get('codigo')?.touched).toBe(true);
  });
});
