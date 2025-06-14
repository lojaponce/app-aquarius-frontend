import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Area {
  codigo: number;
  nombre: string;
}

export interface Empleado {
  codigo: number;
  nombre: string;
  correo: string;
  celular: string;
  telefono: string; // ✅ agrega esta línea
  area: Area;
}

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private apiUrl = 'http://localhost:8080/api/empleados';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }

  getEmpleado(codigo: number): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.apiUrl}/${codigo}`, {
      headers: this.getAuthHeaders()
    });
  }

  createEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(this.apiUrl, empleado, {
      headers: this.getAuthHeaders()
    });
  }

  updateEmpleado(codigo: number, empleado: Empleado): Observable<Empleado> {
    return this.http.put<Empleado>(`${this.apiUrl}/${codigo}`, empleado, {
      headers: this.getAuthHeaders()
    });
  }

  deleteEmpleado(codigo: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${codigo}`, {
      headers: this.getAuthHeaders()
    });
  }
}
