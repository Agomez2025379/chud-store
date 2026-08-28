import { Routes } from '@angular/router';

import { ProductoFormulario } from './components/producto-formulario/producto-formulario';
import { ProductoListado } from './components/producto-listado/producto-listado';

export const routes: Routes = [
  { path: '', component: ProductoFormulario },
  { path: 'listado', component: ProductoListado },
];
