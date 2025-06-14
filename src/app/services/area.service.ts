import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Area {
  codigo: number;
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  private apiUrl = 'http://localhost:8080/api/areas';

  constructor(private http: HttpClient) {}

  getAreas(): Observable<Area[]> {
    const token = localStorage.getItem('token'); // ⚠️ asegúrate de que existe

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Area[]>(this.apiUrl, { headers });
  }
}
