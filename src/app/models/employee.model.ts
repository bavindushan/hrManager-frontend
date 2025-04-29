export interface Employee{
    id? : number;
    name: string;
    email: string;
    department: 'HR' | 'IT' | 'FINANCE' | 'OPERATION';
}