import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task';



@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = "http://192.168.1.58:8765/api/Taches";

  constructor(private http: HttpClient) { }

  // Create a new task
  createTask(task: Task, idProjet: number): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/${idProjet}`, task);
  }

  // Get all tasks
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  // Get a task by ID
  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  // Update a task by ID
  updateTask(id: number, updateData: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, updateData);
  }

  // Delete a task by ID
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Delete all tasks by project ID
  deleteTasksByProjectId(projectId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/projet/${projectId}`);
  }
}
