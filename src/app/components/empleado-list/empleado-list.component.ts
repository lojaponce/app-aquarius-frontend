import { Component, OnInit } from '@angular/core';
import { EmpleadoService, Empleado } from '../../services/empleado.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-empleado-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './empleado-list.component.html',
  styleUrls: [
    './empleado-list.component.css',
    '../../../assets/css/bootstrap-table.css' // 👈 ESTA ES LA RUTA CORRECTA
  ]
})
export class EmpleadoListComponent implements OnInit {
  empleados: Empleado[] = [];
  empleadosPaginados: Empleado[] = [];
  errorMessage = '';

  // 🔽 Paginación
  paginaActual = 1;
  empleadosPorPagina = 5;
  totalPaginas = 1;

  constructor(private empleadoService: EmpleadoService, private router: Router) {}

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados(): void {
    this.empleadoService.getEmpleados().subscribe({
      next: (data) => {
        this.empleados = data;
        this.totalPaginas = Math.ceil(this.empleados.length / this.empleadosPorPagina);
        this.actualizarEmpleadosPaginados();
      },
      error: () => this.errorMessage = 'Error al cargar empleados'
    });
  }

  actualizarEmpleadosPaginados(): void {
    const inicio = (this.paginaActual - 1) * this.empleadosPorPagina;
    const fin = inicio + this.empleadosPorPagina;
    this.empleadosPaginados = this.empleados.slice(inicio, fin);
  }

  cambiarPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
      this.actualizarEmpleadosPaginados();
    }
  }

  eliminarEmpleado(codigo: number): void {
    if (confirm('¿Está seguro de eliminar al Empleado?')) {
      this.empleadoService.deleteEmpleado(codigo).subscribe({
        next: () => this.cargarEmpleados(),
        error: () => alert('Error al eliminar el empleado')
      });
    }
  }

  editarEmpleado(codigo: number): void {
    this.router.navigate(['/empleados/editar', codigo]);
  }

  nuevoEmpleado(): void {
    this.router.navigate(['/empleados/nuevo']);
  }

  cerrarSesion(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  // 🔽 ESTE ES EL GETTER QUE DEBES AGREGAR
  get totalPaginasArray(): number[] {
    return Array(this.totalPaginas)
      .fill(0)
      .map((_, i) => i + 1);
  }
}
