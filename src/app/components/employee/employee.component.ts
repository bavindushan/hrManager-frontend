import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './employee.component.html',
})
export class EmployeeComponent implements OnInit {
  employee: Employee = { name: '', email: '', department: 'HR' };
  employees: Employee[] = [];
  searchId: number = 0;
  searchName: string = '';
  isUpdating: boolean = false;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getAll().subscribe((data) => {
      this.employees = data;
    });
  }

  saveEmployee() {
    if (this.employee.name && this.employee.email && this.employee.department) {
      if (this.isUpdating) {

        this.employeeService.updateEmployee(this.employee).subscribe(() => {
          Swal.fire('Success', 'Employee updated successfully!', 'success');
          this.loadEmployees();
          this.resetForm();
        });
      } else {

        this.employeeService.addEmployee(this.employee).subscribe(() => {
          Swal.fire('Success', 'Employee added successfully!', 'success');
          this.loadEmployees();
          this.resetForm();
        });
      }
    } else {
      Swal.fire('Error', 'Please fill all fields!', 'error');
    }
  }

  editEmployee(emp: Employee) {
    this.employee = { ...emp };
    this.isUpdating = true;
  }

  deleteEmployee(id: number | undefined) {
    if (id !== undefined) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.employeeService.deleteEmployee(id).subscribe(() => {
            Swal.fire('Deleted!', 'Employee deleted!', 'success');
            this.loadEmployees();
          });
        }
      });
    }
  }

  searchEmployeeById() {
    if (this.searchId > 0) {
      this.employeeService.getById(this.searchId).subscribe((emp) => {
        this.employees = [emp];
      }, (error) => {
        Swal.fire('Error', 'Employee not found with ID: ' + this.searchId, 'error');
        this.loadEmployees();
      });
    }
  }

  searchEmployeeByName() {
    if (this.searchName.trim() !== '') {
      this.employeeService.getByName(this.searchName).subscribe((data) => {
        this.employees = data;
      }, (error) => {
        Swal.fire('Error', 'No employees found with Name: ' + this.searchName, 'error');
        this.loadEmployees();
      });
    }
  }

  resetForm() {
    this.employee = { name: '', email: '', department: 'HR' };
    this.isUpdating = false;
  }
}
