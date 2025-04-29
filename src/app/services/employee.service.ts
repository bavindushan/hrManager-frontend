import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = 'http://localhost:8080/employee';

  constructor(private http: HttpClient) { }

  // Fetch all employees
  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/get-all`);
  }

  // Add a new employee
  addEmployee(employee: Employee): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, employee);
  }

  // Update an existing employee
  updateEmployee(employee: Employee): Observable<any> {
    return this.http.put(`${this.baseUrl}/update`, employee);
  }

  // Delete employee by ID
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

  // Get employee by ID
  getById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/get-by-id/${id}`);
  }

  // Get employee by name (if you need this API)
  getByName(name: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/get-by-name/${name}`);
  }
}
