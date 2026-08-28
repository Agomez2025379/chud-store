import { ComponentFixture, TestBed } from '@angular/core/testing';
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
