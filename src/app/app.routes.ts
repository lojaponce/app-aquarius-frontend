// app/app.routes.ts
import { Routes } from '@angular/router';
import { EmpleadoListComponent } from './components/empleado-list/empleado-list.component';
import { EmpleadoFormComponent } from './components/empleado-form/empleado-form.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'empleados', component: EmpleadoListComponent },
  { path: 'empleados/nuevo', component: EmpleadoFormComponent },
  { path: 'empleados/editar/:id', component: EmpleadoFormComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
