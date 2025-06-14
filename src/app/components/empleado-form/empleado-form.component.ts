import { Component, OnInit } from '@angular/core';
import { EmpleadoService, Empleado } from '../../services/empleado.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AreaService, Area } from '../../services/area.service'; // nuevo

@Component({
  selector: 'app-empleado-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './empleado-form.component.html',
  styleUrls: ['./empleado-form.css']
})
export class EmpleadoFormComponent implements OnInit {
  empleadoForm: FormGroup;
  idEmpleado: number | null = null;
  titulo: string = 'Nuevo Empleado';
  modoEdicion: boolean = false;
  errorMessage = '';
  areas: Area[] = []; // nuevo

  constructor(
    private fb: FormBuilder,
    private empleadoService: EmpleadoService,
    private areaService: AreaService, // nuevo
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.empleadoForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      celular: [''],
      telefono: [''],
      areaCodigo: ['', Validators.required] // clave para dropdown
    });
  }

  ngOnInit(): void {
    this.idEmpleado = this.route.snapshot.params['id'];

    // cargar lista de áreas
    this.areaService.getAreas().subscribe({
      next: (data) => this.areas = data,
      error: () => this.errorMessage = 'Error al cargar áreas'
    });

if (this.idEmpleado) {
  this.modoEdicion = true;
  this.titulo = 'Editar Empleado';
      this.empleadoService.getEmpleado(this.idEmpleado).subscribe({
        next: (empleado) => {
          this.empleadoForm.patchValue({
            nombre: empleado.nombre,
            correo: empleado.correo,
            celular: empleado.celular,
            telefono: empleado.telefono,
            areaCodigo: empleado.area?.codigo ?? '' // tomar solo el código
          });
        },
        error: () => this.errorMessage = 'Error al cargar empleado'
      });
    }
  }

guardarEmpleado(): void {
  if (this.empleadoForm.invalid) {
    return;
  }

  const formValue = this.empleadoForm.value;

  // 🟡 Construimos sin 'codigo' primero
  const empleadoData: Partial<Empleado> = {
    nombre: formValue.nombre,
    correo: formValue.correo,
    celular: formValue.celular,
    telefono: formValue.telefono,
    area: this.areas.find(a => a.codigo === +formValue.areaCodigo)!
  };

  if (this.idEmpleado) {
    // 🟢 Si es edición, añadimos 'codigo'
    (empleadoData as Empleado).codigo = this.idEmpleado;

    this.empleadoService.updateEmpleado(this.idEmpleado, empleadoData as Empleado).subscribe({
      next: () => this.router.navigate(['/empleados']),
      error: () => this.errorMessage = 'Error al actualizar empleado'
    });
  } else {
    // 🟥 Aquí NO mandamos 'codigo'
    this.empleadoService.createEmpleado(empleadoData as Empleado).subscribe({
      next: () => this.router.navigate(['/empleados']),
      error: () => this.errorMessage = 'Error al crear empleado'
    });
  }
}
  cancelar(): void {
    this.router.navigate(['/empleados']);
  }

  cerrarSesion(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
