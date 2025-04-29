import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = 'http://localhost:8080/employee'

  constructor(private http: HttpClient) { }
   getAll(): Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.baseUrl}/get-all`)
   }
   // ✅ Add a new employee
  addEmployee(employee: Employee): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, employee);
  }

  // ✅ Update an existing employee
  updateEmployee(employee: Employee): Observable<any> {
    return this.http.put(`${this.baseUrl}/update`, employee);
  }

  // ✅ Delete employee by ID
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

  // ✅ Search employee by ID
  getById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/get/${id}`);
  }

  // ✅ Search employees by name
  getByName(name: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/get-by-name/${name}`);
  }
}
